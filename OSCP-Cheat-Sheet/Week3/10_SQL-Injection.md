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

# SQLiによるAuthentication Bypass
まず、OR 1=1だが、これは常にtrueとして評価される。  
WHERE user_name 'hoge' OR 1=1となった場合、これはユーザレコードが存在するかどうかに関わらずDBに存在する最初のユーザIDを返すことになる。  
この時、**--** や //といった値によって、以降のSQLの値を無視できる。
```
' OR 1=1 in (SELECT password FROM users) -- //
```

## ブラインドでSQLiの脆弱性をExploitするアプローチ
1. 'やOR、"といったSQLクエリをぶん投げて、まずはSQL syntaxエラーなどを引き起こさないか確認する。
2. エラー文やWebアプリケーションの反応を見てSQLクエリを組み立てる

# UNIONベースのSQLペイロード
基本的には、**UNION SELECT**のような構文で使用する
- UNIONは、追加のSELECTステートメントの実行を可能にしてくれる。つまり、同じクエリで結果を提供し、2津のクエリを1募ステートメントに連結する。
- UNIONステートメントを使ったSQLiを機能させるためには、以下の2つの条件を満たす必要がある。  
    1. インジェクションされるUNIONクエリには、元のクエリと同じ数の列が含まれていること。
    2. データ型は各列間で互換性があること。

## UNIONを使ったSQLiのアプローチ
1. ターゲットのテーブルに存在する列の数を調べる


# ブラインドSQLi
ここまでのSQLiは、Webアプリケーションから何らかのレスポンスが返ってきた。  
これは**in-band**のSQLペイロードと呼ばれる。  
一方ブラインドSQLiは、文字通りWebアプリケーションからのレスポンスが全く存在しない、ということを意味する。  
返す情報はせいぜい、成功、失敗、もしくは応答の時間が長かったり短かったりといった程度。  

## boolean-based blind SQLi
これは、WebアプリケーションからSQLクエリの成否の応答を受けて、Exploitとして刺さるクエリを構築していく攻撃手法。  
  
ここで返されるbooleanというのは、DBから返されるのではなくWebアプリケーションから返される値のこと。例：ログイン成功or失敗 etc...
  
例としてboolean-basedは、以下のようなクエリを使う。

```
http://192.168.50.16/blindsqli.php?user=offsec' AND 1=1 -- //
```

## Time-base blind SQLi
これは、指定された時間待機するようにDBに指示することでクエリ結果を推測する攻撃手法。  
攻撃者はWebアプリケーションのレスポンスまでの時間に応じて、ステートメントがTrueかFalseかを判断できる。  
  
例としてTime-baseは、以下のようなクエリを使う。  
以下は、ユーザが存在しない場合のみFalseを返すクエリ。
```
http://192.168.50.16/blindsqli.php?user=offsec' AND IF (1=1, sleep(3),'false') -- //\
```

> [!NOTE]  
> これらのBlind SQLiは実際難易度が高いので、sqlmap等のツールを使って自動化することが多い。  
> ただしインジェクションできるsourceを正確に特定しないでsqlmapを使うと非効率なので、正確なsourceを見つけてからそのsourceに対して重点的にsqlmapを使うことが重要。
