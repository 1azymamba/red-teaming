# AuthBy
Difficulty = Intermediate

## Time
iniaccess = 40min
privesc = 2H 15min  
   
※iniaccessはノーヒント
※privescはwriteupあり


## 教訓
- とりまsysteminfo大事。
- SeimpersonateLinkがenabledでも刺さるわけではない。OS古いとなおさらむずめかも。


## 手順
1. いつものrustscan。21, 242, 3145, 3389があいてる。
2. 242は謎なので無視。珍しくWebが空いてない。3145もよくわからないので望みうすいがとりま21のftpにanonymousログオン。成功する。
3. anonymousだとgetができなかった。ただしファイルの閲覧権限があり、offsecとadminがユーザとしていそうだった。
4. adminでftpにアクセスしてみる。パスワードは謎だがとりまadmin adminしたら入れてしまった。ラッキー。今回はたまたまadminでいけたが、hydraをftpに使うのが良いらしい。
5. admin権限だとput使ったファイルのアップロードやgetができた。色々取ってくる。そうするとoffsecのハッシュがgetできた。ちなみにハッシュはMD5だった。
6. johnでoffsecのハッシュをクラック。成功。
7. ftpにoffsecで入ろうと思ったが無理だった。別のポートでoffsecユーザの認証情報使えないかチェック。
8. 242ポートにアクセスすると認証情報を求められたのでoffsecとさっきのパスワードを使ったら入れた。
9. この時、index.phpにアクセスするが、これがftpでも見えるファイルだった。Webのルートディレクトリが一緒ぽかったのでWebからphpにアクセスしてwebシェルを着火できそう。
10. ftpからputしてwebシェルあげて着火。iniaccessはここまでノーヒントでがんだクリア。
11. このあとのprivescで時間を食う。whoami /privしたらSeImpersonateLinkがenabledになってた。やったことないがこれがEnabledだと毎回privescできると思っていた。
12. 実際にはそれでも色々がんばるとpotatoファミリのどれかでprivescできるらしいが、王道ルートは別。
13. systeminfoすると古い2008 serverのパッチ未適用だとわかるので、それでexploitでぃぐってぶっささる。超簡単なprivescらしい。


## 総括
- iniaccess早かったのはナイス。
- Intermediateも、スタンドアロンなら割と通用しそう。残るはADという関門。あとWindowのエクスプロイトに慣れることとか。