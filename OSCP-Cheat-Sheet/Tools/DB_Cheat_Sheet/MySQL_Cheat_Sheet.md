> [!TIPS]  
> MySQLは大文字と小文字を区別しない  
> [超初心者向け](https://qiita.com/FumiyaShibusawa/items/2e3b30ceedeafff0bce2)  
> [MySQL基礎構文](https://qiita.com/Fendo181/items/2be9a0f28fb0805794b0#%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB%E4%B8%80%E8%A6%A7%E3%82%92%E8%A6%8B%E3%82%8B)


## 用語説明

行:レコード(Record/Row)  
データ  
横  
列:フィールド(Fields/Column)  
属性値  
縦  
カラム  
SQL(Structured Query Language)  
Database や Table、 Field や Record を扱う言語を SQL （ Structured Query Language ）と呼ぶ  
KaliからMySQLインスタンスに接続する    

## Cheat Sheet
```.sql
mysql -u root -p'root' -h <Instance IP> -P 3306
```
  
実行中のSQLインスタンスのバージョンを取得する
```.sql
select version();
```

実行中のセッションの、現在のDBユーザを確認する。  
この関数は、MySQL接続の現在のユーザ名とホスト名を返す。
```.sql
select sytem_user();
```

MySQLセッションで実行されているすべてのDBのリストを表示する。
```.sql
show databases;
```

MySQLDB内で、userとauthentication_stringテーブルをSELECTステートメントで指定。その結果の中からWHEREステートメントで、offsecというユーザにマッチするもののみを取得する。
```
SELECT user, authentication_string FROM mysql.user WHERE user = 'offsec';
```

超基礎的なSELECTの構文
```
SELECT [抽出したい情報] FROM [テーブル名] [オプション条件|WHERE, ORDER BY, LIMIT,etc];
```

テーブルの一覧を表示する(DBを選択してからじゃないと使えないよ)
```
SHOW TABLES;
```

特定のテーブルからレコードを抽出する
```
DESCRIBE user;
```

データベースを選択する
```
USER <DB NAME>;
```

