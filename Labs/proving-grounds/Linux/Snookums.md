# Snookums
## 手順
1. nmapすると、80ポートが開いている
2. http-titleからターゲットシステムでPHP galleryのver0.8が動いていることが分かる
3. 0.8のexploitを調べるが動かない。逆に0.7のRCE PoCが動く。
4. linpeasするとPWNKITの脆弱性を使った権限昇格がヒットするのでそれを使うとrootになれる。
5. 他の解法として、/var/www/html/にdb.phpがあるのでそこから認証情報を取得する
6. mysqlのrootユーザの認証が手に入り、これによって複数のユーザの認証情報がb64で手に入る
7. b64デコードを行って取得したパスワードとユーザ名でsshする
8. linpeasを再度かけると、新しく入ったmichaelユーザが/etc/passwdに書き込み権限があるのが分かる
9. rootユーザのパスワードを変更して昇格。