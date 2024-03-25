# Leakage.md
[Leakage](https://www.youtube.com/watch?v=WeHYVYRjeg8&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=21)

1. 22, 80などがあいているのがnmapでわかる。まずは80を見ていく
2. GitLabのページに飛ばされるので、自分のアカウントからログインしてみる
3. CMSを見ると15のコミットがあって、ここでUpdate config.phpなどを見てみると、SQL_PWDがjonathanのユーザ名と紐づいて確認できる
4. SigninでGitLabにjonathanとSQL_PWDのパスワードで入る。
6. id_RSAがあり、これはjonathanのSSH秘密鍵と推測されるので、ローカルに落としてchmod 600やったあとにSSHポートにjonathanでアクセスを試みる
7. jonathanのid_rsaに対応するパスフレーズをクラックするため、ssh2johnした後にrockyou.txtを使ってJtRでクラック
8. scoobyのパスフレーズでクラックできたのでシェルを取る
9. scpでlinPEASをアップロードして実行すると、/bin/nanoがあるのが分かり、これをroot権限でパスワードなし実行できる
10. nanoをroot権限で実行できるということは、/etc/passwdなどのファイルをroot権限で上書きできる可能性があるということなので、/bin/nano /etc/passwdで上書きできるか試してみる
11. nanoで/root/.ssh/authorized_keysを編集できるので、これでjonathanの先ほど使った秘密鍵と同じものに書き換えておく
12. ssh -i id_rsaでjonathanの秘密鍵とパスフレーズを使ってrootのシェルを取って完了