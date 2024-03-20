# Debug
[Debug](https://www.youtube.com/watch?v=J8v2QQ9ILto&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=13)

1. nmapスキャンしてポート80にブラウザからアクセス
2. ディレクトリ列挙をbig.txtでやると、consoleというのが見えるのでそこにブラウザからアクセス
3. pythonコマンドを実行できるのでペンテストモンキーで調べたpythonのリバースシェルを実行してシェルを取る。この時rlwrapをncの前につけてシェルを取ると便利
4. meganユーザで入るので、ターゲットのLinux上でLinPEASを実行
5. SUIDのxxdというのがroot権限でmeganからも実行できるらしいので、これを使って/etc/passwdを見に行く
6. rootのハッシュが手に入るので、ローカルにハッシュを落としてjohnでrockyou.txtをつかって解析
7. rootのパスワードが分かるのでそれを使ってsu -で権限昇格