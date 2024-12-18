# Resolute
## 手順
1. rpcclientで匿名ログインする。もしくはenum4linuxをする。
2. ドメインユーザが見えるのでメモする。パスワードもenum4linuxのdescriptionに書いてあるのでメモ。
3. 認証セットですぷれーするとwinrmできる
4. melanieユーザでログイン
5. C:\でls -forceを行うと隠しフォルダが確認できる。この中にあるPowershellのtranscriptを確認すると、ryanというユーザの認証情報を平文で取得できる。
6. ryanでwinrmする
7. whoami /allすると、DNSadminsグループにryanが属していることが分かる
8. dnsadminだと、.dllをdnsサービスにインジェクションすることでSYSTEMにあがることができる。
9. ryanの所属するconstractorグループがdnsadminのグループに所属しており、shortest path to domainadminではそれに気づけない。
10. whoami /allをするかconstractorグループの詳細をbloodhoundで確認するかがミソ