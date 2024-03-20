# Outdated
[Outdated](https://www.youtube.com/watch?v=hjs-2X3CjAU&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=14)

1. nmapしてnfs、ssh, ftpが有効なのが分かる。ftpはanonymousログインが有効ではないので、とりあえずnfsをローカルにマウントできるか確認してみる
2. showmount -eでnfsのマウント可能なディレクトリが出てくる
3. danielというユーザのフォルダをローカルにマウントするが、特に面白いファイルなどは見つからず。
4. ftpのProftpを次に見てみる。searchsploitすると該当するExploitが見つかる
5. 任意のファイル読み取りができるぽいので、danielの.sshから秘密鍵の内容をローカルにもってくる
6. sshでdanielとしてログイン
7. linPEASを使うと、Linuxのバージョンが古いらしく、そのバージョンをsearchsploitするとカーネルエクスプロイトのコードが出てくる
8. カーネルエクスプロイトコードを使ってrootに権限昇格
