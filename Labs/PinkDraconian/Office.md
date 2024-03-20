# Office
[Office](https://www.youtube.com/watch?v=PcV3tOw7f_k&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=11)

1. nmapしてからhttpとhttpsのポートをそれぞれサブディレクトリ列挙
2. Webページのリンクにマウスカーソルを合わせると、office.cslの文字列が画面の左に見える。これがドメイン名である可能性がある
3. dirbusterでforumが引っかかるので、ここにアクセス
4. フォーラムでphp?file=が参照している.txtのファイルがある。ここにLFIの脆弱性がある
5. WFUZZを使ってLFIの部分にFuzzingする。ここで、dwightのハッシュが見つかる
6. johnでrockyou.txtを使ってdwightのハッシュを解読. cowboys1
7. sshでdwightにアクセスする
8. 最初のdirbusterの結果からwp-adminがあるのもわかるので、dwightで管理者としてログイン
9. WP File Managerが怪しいので、ここでphpのshellファイルを作成する
10. phpでシェルが作れるので、ここでpentestMonkeyとかを調べてpythonコマンドを実行してリバースシェルを取る
11. RSをとったらsudo -lで権限昇格できないかチェック
12. dwightがパスワードなしで/bin/bash実行できるのが分かる。いまは　www-data
13. dwightユーザに横展開
14. linpeasを使ってLinuxの脆弱性をチェック
15. webminがポート10000で動いているのが分かるので、sshでポートフォワードして攻撃マシンからブラウザでアクセス
16. あとはwebminが脆弱性あるのはsearchsploitとかで調べればわかるのでExploitする
17. root獲得