# Slort
## 手順
1. nmapしてxamppが動いていることを確認
2. xamppはPublic Exploitが無い。feroxbusterでbig.txtを使って:4000/sites/をディグる
3. sitesに入ると、PHPで動いているWebにアクセスできる
4. ポチポチしていると、page=hoge.phpとなっており、phpファイルを読み込んで表示していることがパラメータから分かる
5. RFIができないか試すため、kaliでhttp.serverを動かし、phpのリバースシェルをパラメータの値に渡してみるとシェルが取れる
6. C:\backup\にinfo.txtやtftp.exeというのがある。これをtypeで中を見ると、tftp.exeが5分おきに実行されていそうということが分かる
7. tftp.exeをリバースバイナリに置き換えて5分待ったらSYSTEMゲッツ