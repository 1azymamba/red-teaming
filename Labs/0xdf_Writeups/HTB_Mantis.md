# HTB: Mantis


## 手順

1. nmapすると多数のポートが開いていて、88のkerberosやldapが開いていることからも、ターゲットはDCぽいことが分かる。
2. smbとrpcへの匿名ログインは成功するが、共有フォルダは空で、rpcclientで実行したクエリもACCESS DENIEDされる。
3. kerberosのポートが開いているので、まずはここに対してkerbruteでドメインユーザ名の総当たりができる。
4. 3つのユーザ名を取得したが、Passwordが分からないのでひとまずはAS-REP Rosatingするもいずれのユーザでも無効。
5. 8080ポートも開いているので、そこからWebサイトにアクセスできる。README等を読むとこれは、Orchard CMSと推測できる。
6. CMSのサインインページを見つけて、先ほどのユーザ名やデフォルトぽい組み合わせを使うもうまくいかず。
7. このCMSに対してsearchsploitするもPublic Exploitは見つからず。
8. CMSへgobusterでディレクトリブルートフォースするも、これも失敗。
9. 1337ポートも開いているので、そこを見に行く。これはIISのポートだが。CTFではIISはターゲットになりがち。
10. gobusterで1337ポートを列挙すると、secure_notesというディレクトリが見つかる。
11. secure_notesを見ると、OrchardCMS認証情報がバイナリで取得できるのでこれを解析。
12. クレデンシャルを取得できるので、それを使ってadminユーザとしてOrchardの管理パネルに入る。しかしそこからRCEにはつなげられず。
13. dev_notesからSQLサーバのsaユーザパスワードがbase64された16進数で手に入る。それを解析するとsaユーザのパスワードを取得できる。
14. saユーザとして1433ポートへのアクセスを試みる。しかしsaユーザと先ほどのパスワードを使うとまさかの認証失敗。Orchardではadminというユーザ名を使っていたので、adminユーザでsqlサーバのパスワードを使うと認証が通ってsqlclientできる。
15. sqlclientで入ってみていると、DBのサイズがデカいのでGUIの方がよさそうという感じで。そのようなときは**dbeaver**というツールを使うとGUIで見れるらしく。
16. 中のテーブルを漁っていると、jamesユーザとパスワードがプレーンテキストで見つかる。
17. jamesのクレデンシャルを持っているので、これを使ってcrackmapexec(もしくはnxc)すると、共有フォルダへのREADアクセスがある。しかし中に面白いものは無く。
18. jamesでrpcclientにつなぐとドメインのユーザ名を一覧で表示できるがこれも面白くなく。
19. ドメインにおいて一つ以上の有効な資格情報を持っているので、これを使ってkerberoastingできる。しかしこれでもkerberoastingが有効なユーザはおらず。
20. Windows DCにおいてデカい脆弱性があるらしく、[詳細](https://wizard32.net/blog/knock-and-pass-kerberos-exploitation.html)にも記載があるが、このエクスプロイトを使うとDCをだまして低権限ユーザでもKerberosゴールデンチケットを生成できるらしい。**MS14-068**と呼ばれる脆弱性のよう。
21. MS14-068の攻撃において必要になるのは、有効なユーザアカウントとDCのIPのみであり、Windows 2003、Vista、2008、7、2008 R2、8、2012、8.1、2012 R2のバージョンのWindows Serverでこのエクスプロイトを実行できる。
22. 上記のMS14-068でjamesからSYSTEMに権限昇格しておわり。