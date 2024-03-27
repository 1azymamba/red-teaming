# Monitor
[Monitor](https://www.youtube.com/watch?v=mq8zNhUH7Jw&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=25)

1. 80, 139, 3380, 445があいてるので、とりあえず80のHTTPから見ていく
2. PRTGというネットワークモニターアプリケーションがあるので、デフォルトパスでログインできるか試す
3. 一旦smbにアクセスしてみる。適当なユーザ名でパスワードなしで入れた
4. sharesの読み取り権限があって.zipがあるのでローカルに落とす
5. sqlite3というファイルがあり、これが認証情報の取得につながりそう
6. djangoというユーザ名でパスワードも平文で書いてあった
7. PRTGに戻ってパスワードを試すと管理画面に入れた
8. PRTGのRCE脆弱性を調べるとヒットするので、エクスプロイトを実行する。これによってAuthenticated RCEが実行できる
9. このRCEでsystem権限が取れる