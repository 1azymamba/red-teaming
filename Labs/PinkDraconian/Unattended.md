# Unattended
[Unattended](https://www.youtube.com/watch?v=skbVwxga1OM&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=6&t=49s)

1. nmapの結果から、ポート80のhttpサーバがファイルサーバっぽいことが分かる。怪しいのでこれを見ていく
2. ブラウザからアクセスすると、HttpFileServer2.3ということが分かる
3. searchsploitで調べると**REJETTO**とあるが、ブラウザ経由で見ても、マウスカーソルをあわせると左下にrejettoのURLが出るのでそこでREJETTOと判別できる。
4. RCEの脆弱性があるようなので、metasploitでRCEのエクスプロイトがこのrejettoに刺さるか試す
5. エクスプロイトが刺さってシェルが取れる
6. winePEASを実行するとUnattend.xmlというファイルがあるのが見える。これはWindows環境で多数のマシンのセットアップやキッティングでインストールさせるものを定義したファイル。
7. Unattend.xmlをみるとAdministratorPasswordが見える
8. Adminのパスワードが平文なので、Adminユーザでこのパスワードを使用し、先ほどのNMAPでopenだった5589ポートにアクセスできる。
9. これで権限昇格も完了