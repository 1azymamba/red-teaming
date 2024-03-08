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