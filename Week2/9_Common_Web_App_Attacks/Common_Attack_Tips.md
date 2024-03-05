# Path Traversal
Path TraversalもしくはDirectory Traversalと呼ばれる。

- 絶対パスはスラッシュ(/)から始まり、Linuxではルートファイルシステム(/)を指す。
- 一つ上のディレクトリを指定するには../を使用する。

## Webシステムに対するPath Traversalの適用
一般的なAttack Surfaceとして、ターゲットサーバがLinuxであり、かつPath Traversalの脆弱性が存在する場合、以下の流れがある。

**Path Traversalで/etc/passwdの内容を表示してユーザ一覧を取得 => ユーザの.ssh/id_rsaにある秘密鍵を取得 => SSHを使ってターゲットサーバにユーザとしてアクセス**

> [Tips]
> 上記のAttack SurfaceはLinuxに対しては機能する可能性が高いが、Windowsに対する上記の流れは一般的に困難。
> Windowsでは**C:\Windows\System32\drivers\etc\hosts**にローカルユーザの一覧が表示されているが、sshの秘密鍵のパスは別の場所にあることも多くターゲットごとに場所が異なる可能性が高いため、同じような攻撃の流れは通用しないことも多い。
> ただし、ターゲットのWebサーバの使用言語やインフラが分かれば、(例えばIIS等)そのパスをPath Traversalでアクセスしてみることができる。IISなら**C:\inetpub\wwwroot\web.config**とか。ここにはパスワードとユーザ名などの機密情報が含まれている可能性がある。
> また、Windowsのサーバは/ではなくバックスラッシュ(\)にのみ脆弱なこともあるので、両方をテストすることが重要。

- Webアプリケーションは通常、/var/www/html/をルートディレクトリとすることが多い
- なのでhttp://example.com/file.htmlにアクセスすると、それは/var/www/html/file.htmlにアクセスしていることになる
- Webアクセスする際、httpから始まるリンクにはファイル名以外の/var/www/htmlといったパスは表示されないため、絶対パスは推測するかEnumerationで特定する
- Webアプリケーションを調査する際は、ページ上の全てのボタンにマウスを置き、そのボタンが示すファイルパスを確認することが重要で、これによってファイルやサブディレクトリ、使われている言語といった情報を得ることができる。
- また、各ボタンなどが参照するパラメータ情報も確認することが重要。


# File Inclusion Vulnerabilities
# File Upload Attack Vjulnerabilities
# Command Injection