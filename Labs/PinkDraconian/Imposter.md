# Imposter
[Imposter](https://www.youtube.com/watch?v=cU6-l6AGF3Q&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=17)

1. rpcclientで-U '' -Nを指定することで認証情報なしでアクセスできるかを試すがだめ。
2. 445のSMBも空いているので、これも一応匿名でログインで見れないかはチェックしてみるが特になし
3. 8080でWing ftp proxyというのが動いていて、これが一番何かありそうと推測する
4. 認証画面が出てくるので、とりあえずadmin adminしてみるけどダメ
5. 調べるとこのサービスのデフォルトユーザ名がadminで、パスワードがpasswdっぽいことが出てくる
6. admin passwdでアクセスして、機能のコンソールをつかってシェルを取れるか試す
7. HackTricksでWindowsのリバースシェルを調べて実行する
8. whoami /privで権限を確認すると、Impersonate？というのが有効なのが分かる
9. impersonate_tokenというのが偽造できるかをチェックし、偽造&権限昇格を行う