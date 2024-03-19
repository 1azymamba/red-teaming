# Shares
[Shares](https://www.youtube.com/watch?v=XYu6okeIaog&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=10)

1. いつも通りNmapで全ポートスキャン。21のFTPと80、RPC, NFS当たりが面白い、また、SSHがデフォルトの22以外で空いてるのもある
2. 今回はNFSから見ていく。showmountコマンドで、NFSサーバでマウントできるパスが見える
3. /home/amirがマウントできるので、mount -t nfs <target IP:/home/amir> <local IP>でマウントする
4. lsコマンドで、amirのホームディレクトリの.sshが見える。RSAの秘密鍵が取れるトラッキー
5. 秘密鍵のバックアップがをcatで確認し、ssh -i id_rsa.bak amir@<targetIP> -p <targetPort>
6. SSHログインの時にパスフレーズが必要だがわからない。なのでjohnでrockyou.txtを使ってパスワードを抽出する
7. hello6がパスワード。amirにアクセスできる。
8. 次に権限昇格を狙う。
9. まず、sudo -lをしてみる。これで、現在のユーザでsudo権限を使えるものが分かる
10. Pythonをamirでもsudo権限で実行できるらしいので、sudo -u amy /usr/bin/python3 -c 'import os; os.system("/bin/bash");を試す
11. amirからamyにpythonで横展して、amyでは/bin/sshをsudo実行できるのがsudo -lで分かるので、GTFOBinでディグったsshコマンドを実行してシェルをぶんどる
12. これでrootとれる