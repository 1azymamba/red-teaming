# Shock
[Shock](https://www.youtube.com/watch?v=AWyS60GMZzs&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=28)

1. スキャン、ftp, ssh, apacheがあいてる。ftpはアノニマスログイン無効なのでブラウザからウェブサイトを見に行く

2. ウェブサイト見てる間に、gobusterでサブディレクトリをbig.txtで列挙しておく


3. cgi-binのディレクトリが見つかり、調べると.py, ,perlとかが動くらしい。


4. cgi-binのディレクトリ配下にもgobusterしておくと、cgiのファイルが見つかる。

5. searchsploitでapacheとcgiで調べると、shellshockの脆弱性にヒットする。これはbashの脆弱性。

6. （）で関数定義したあとに、その後ろで任意のコマンド実行できるぽいので、apacheへのリクエストでcookieヘッダに値をぶっこんでリクエストするエクスプロイトを動かしてwww-dataでシェルを取る

7. linpeasをアップロードして実行。sudoのバージョンが脆弱かも。

8. sudo -lもlinpeasでやれって言われるからやる。

9. sockフォルダらへんがパスワード無しでroot実行できるのでやる。

10.hacktrickでディグリながらシェリ取れておわり