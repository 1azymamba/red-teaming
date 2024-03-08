# SQL Injection 101

## 基礎的な理論
- SQLはデータのクエリ、挿入、変更、削除に利用でき、場合によってはOSのコマンドを実行することも可能
- フロントエンド=>バックエンドフレームワーク=>DBの流れでデータとやり取りをする
- SQLiで使える構文・コマンド・関数は、どのRDB向けに作成されたかによって異なる

## 一般的なDB
### MySQL
MariaDB2と並んで一般的に使われるDBの一つ。  
MySQLの基礎的な構文のCheat Sheetは[こちらから](OSCP-Cheat-Sheet\Tools\DB_Cheat_Sheet\MySQL_Cheat_Sheet.md)
### Microsoft SQL Server (MSSQL)
Windowsエコステムの中にネイティブに統合されているDBMS。  
**SQLCMD**という組み込みのコマンドラインツールを使用すると、Windowsのコマンドプロンプトを介して、もしくは別のリモートマシンからSQLクエリを実行できる。  
KaliからMSSQLにアクセスするときは、以下のコマンドで接続できる。
```
impacket-mssqlclient Administrator:Lab123@192.168.50.18 -windows-auth
```
Cheat Sheetは[こちらから](OSCP-Cheat-Sheet\Tools\DB_Cheat_Sheet\MSSQL_Cheat_Sheet.md)
### PostgreSQL
### Oracle DB

## 文法の例
- SELECT => ステートメント
- FROM => 指定したテーブル(今回はusersテーブル)
- "*" => 全てのレコード
- WHERE => 取得したusersテーブルから、user_nameエントリがleonのものだけフィルタ
```
SELECT * FROM users WHERE user_name='leon'
```  

PHPに埋め込まれたSQLクエリの例
以下では、usersテーブルから、user_nameエントリがunameであり、かつpasswordと一致するもののみをフィルタしている。  
実行結果は変数resultに格納される。
```.php
<?php
$uname = $_POST['uname'];
$passwd =$_POST['password'];

$sql_query = "SELECT * FROM users WHERE user_name= '$uname' AND password='$passwd'";
$result = mysqli_query($con, $sql_query);
?>
```

