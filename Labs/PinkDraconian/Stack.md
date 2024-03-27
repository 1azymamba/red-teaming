# Stack
[Stack](https://www.youtube.com/watch?v=5GB080t8OU8&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=23)

1. 80, 135のRPC, SMBが空いていて、80が一番面白そう。見るとしたら次にRPC, SMBの順。
2. ブラウザからアクセスするとdjangoで作られたWebappだとわかる
3. /gitstackというのがあるのでアクセスして、admin adminで管理者権限で入れる
4. searchsploitでgitstackのRCEにつなげられるエクスプロイトがあるかを調べる
5. レポジトリにユーザを追加してシェルをアップロードする流れらしいので、とりあえずエクスプロイトに沿ってやってみると、PHPのバックドアでシェルが取れる
6. johnユーザのシェルを取ったので、ターゲット上でwinPEASを実行する
7. パスワードマネージャーのファイルである.kdbxがあるので、これをローカルにダウンロードする
8. keepass2johnで.kdbxをjohnで解析できる形にして、rockyou.txtのワードリストを使ってクラックすると、princessがパスワードらしいので、これをkdbxに入れると、adminとjohnのパスワードが見れる。
9. evil-winrmを使ってadministratorにアクセスできる(pinkdoraconianは、1回目はこれでうまくいったが2回目だったので、Invoke-Commandで権限昇格する方法を模索する)
10. HackTricksでsudoの権限昇格を調べる
11. nc.exeをアップロードする方法を試す
12. 権限昇格完了