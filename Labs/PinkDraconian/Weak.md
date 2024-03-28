# Weak
[Weak](https://www.youtube.com/watch?v=bVd_Z321Tw0&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=27)

1. 21, 80, , 445、そしてrpcが空いてる。21のFTPで匿名ログインが有効になっているので試す
2. IISサーバ用の.pngファイルなどがftpでマウントしたフォルダに入ってる。とりあえず適当な.htmlを置いてみるとうまくいくので、書き込み権限があることを確認できる。
3. WappalyzerでIISサーバをスキャンしてみると、PHPを使っているのが分かるので、PHPファイルをアップロードしてみると、PHPは禁止されているらしいことが分かる。アップロード失敗。
4. sharPyShell.aspxというものをアップロードすると、それはうまくうごくことがわかり、これでWebシェルが取れる
5. ターゲット内部を手動列挙していくと、。Developmentというフォルダがあるので、そこを見てみる。README.txtを見てみると、Administratorユーザのパスワードが平文で書いてある。
6. crackmapexecでsmbアクセスして、-u usersでPasswordというパスワードでスプレーを行う
7. adminユーザでPasswordのパスワードを使うとsmbアクセスできるのが分かったので、これでsshログインすれば権限昇格完了
