# Web01

## 手順
1. まず、DC01をAdmin権限でシェル取る必要がある。DC01のAdministrator/Desktop上にあるcredentials.txtの情報を使って、Web01マシンにoffsecユーザとしてsshを行う。
2. sshがあいてることはrustscanで確認できる。feroxbusterしてもめぼしいサブディレクトリが見つからないためsshでのログイン試行に当たりをつける。
3. linpeasすると、sudoでoffsecユーザが全コマンドをパスワードなしで実行できる旨の記載がある。sudo -lして一応確認してから、sudo /bin/bashして権限昇格終わり。お疲れさまでした。