# Runas
[Runas](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/cc771525(v=ws.11))


## 概要
現在ログオン中のユーザ権限とは異なる権限で特定のツールやプログラムを実行できるようにするためのWindows組み込みのツール。  
コマンドラインから**runas**とすることで呼び出せる。ただし、対話形式でパスワードを要求されるため、GUIアクセスができないと呼び出すことはできない。

## コマンド集
  
1. backupadminユーザの権限でコマンドプロンプトを起動する
```
runas /user:backupadmin cmd
```