# ActiveDirectory Powershell Module
Windows組み込みのモジュールで、PowerShellからAD環境の情報取得や操作を行うための正規モジュール。  
組み込みなので他のツールをドロップして利用するよりもステルス性が高くなる傾向にある。

1. 使用可能なすべてのモジュール、バージョン、コマンド一覧を表示。
```
Get-Module
```

2. モジュールをインポートする。
```
Import-Module ActiveDirectory
```

3. ドメインの基本情報を収集する。
```
Get-ADDomain
```

4. ドメインユーザの情報を取得する。
```
Get-ADUser