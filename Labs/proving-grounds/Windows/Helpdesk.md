# Helpdesk
Difficulty = Easy

## Time
IniAccess = 1H 45min  
PrivEsc = 1H 45min  
※ノーヒント👏

## 教訓
- SQLiはレスポンスのエラーをよく見ること。
- なんか調べたらsmbと[2こめ](https://github.com/PeterSufliarsky/exploits/blob/master/CVE-2014-5301.py)のexploitが一番簡単な方法だったらしい。
- 誰も自分のと同じやり方の人いなかった。
- とりまrustscanやったあとはnmapもした方が良いかも。smbのvulnerabilityを表示してくれてた。

## 手順
1. とりまいつものrustscan。135,139,445,3389,8080があいてた。
2. 一旦135のrpcclientによる匿名ログインを試す。ログインは成功するもコマンドはACCESS DENIEDされて無理ぽ。
3. 次に139ポート and 445ポート。smbclientを使った匿名アクセス。失敗したので無視。
4. もちろん3389もダメそうなので無視。8080を見るしかない。
5. とりあえずffufを回しながらWappalizerとかでシステムの構成を漁る。ページにアクセスすると、ZOHO社のManageEngine ver 7.6が動いてた。Attack Vectorっぽい。
6. ログインページがあるのでSQLiじゃね？と思いつつ'やら"やら)やら、HTB academyで覚えたてのSQLiを試していく。BurpのIntruderぶん回しておいてとりまSQLiがログインページからできそうか、Responseから見てみる。この間にサービスの7.6でexploitをディぐる。
7. exploitがひっかかる。ちなみにIntruder見た感じこっからそのままSQLiはダメそう。ひっかかったexploitは以下。  
[1こめ](https://www.exploit-db.com/exploits/11793)  
[2こめ](https://github.com/PeterSufliarsky/exploits/blob/master/CVE-2014-5301.py)  
8. 2こめの方から試してみた。言われたとおりにexploit起動したけどなんか動かず。Exploit DBの方はexploitも検証済みになっててバージョンあってるのでこっちで試す。ちなみにサービスのログイン画面はデフォルトcredentialをディぐればすぐ出てくる。
9. 書いてある通りのクエリぶん投げたらエラー出たりする。MySQLやらMSSQLやら、OSとDBMSの組み合わせでクエリが違う点に注意。
10. エラー見ながらターゲットのDBMSが分かったので試すと、boot.iniはアクセス権？でダメだったけどuser()やcurrent_user()とかc:\\windows\\system.iniやらがdumpfileで指定したところにぶん投げられてるのを確認。とりま任意のファイル読み出しはいけそう。
11. user()で確認したらroot@localhostだったのでこのままAdministratorのDesktopからproof.txtぶんどれそうだったので指定したらrootフラグとれた。
12. 書き込みできるのか試したりlocal.txt確認したりがだるかったがとりまrootフラグ取れたのでクリア。ノーヒントでいけてよかった。
