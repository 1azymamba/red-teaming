1. Chapter6.3.6 SNMP Enumeration
2. Chapter8.4.5 Privilege Escalation via XSS => Hello Dollyプラグインのhello.phpの書き換えからwebshell取得できるはずだが、something wrongのエラー出てしまうのでFTPのアップロード方法等調べて再度試す。
3. Chapter9.1.2 Identifying and Exploiting Directory Traversal => VM #1で、パストラバーサルによるsshキーの取得はできた。しかしそれを使ってport 2222にアクセスができない。サブドメイン乗っ取りらしきこともされてる可能性があり、フォーラムとかでも調べてから再度チャレンジ予定。
4. Chapter 9.2.1 => 9.1.2と同じ理由でPending
5. Chapter 9.3.1 => PowerShellのリバースシェルをb64するとなぜか動かないのでいったんpending
6. Chapter 9.3.2 => 公開鍵をアップロードする過程で、ファイルサイズのせいか分からないがアップロードがとまっちゃってうまくいかないのでpending
7. Chapter 9.4.1 => Lab1でPowershellのリバースシェルがなぜかうまくいかない, Lab3のCapstone Exerciseで、Werkzeugの脆弱性を突けばいいんだと思うけどなんか普通にExploitできない。
8. Chapter 11.2.2 => Lab1でRDP接続が上手くいかないので再度やり直す
9. Chapter 12.4.1 => smbmapを使てDownloadsフォルダを列挙する。わんちPath Traversalの脆弱性あるのでそれをつかってAdmin読み取りができないか。
10. Chapter 14 => Anti-virus evasionのLab全般とドキュメントもう一回読んだ方が良い
11. Chapter 15 => NTLMやハッシュの解析周りは重要度かなり高いので要復習。特にNTLM-v2
12. 15.2.5のLab1 daveの秘密鍵とってパスワードはUmbrella137!というのもわかってるけど、なぜかsshがあいてるのにアクセスできない
13. 15.3.4のNet-NTLMv2リレー攻撃がむずいので復習
14. 16.1.5、NW遅すぎるせいかWinPEASをattackerから落としてこれないので後回し
15. 16.2 同じくNW遅すぎてファイルアップロードができない
16. 17.1.2のLab1なぜかssh接続がjoeユーザでできないのでまたあとでやる
17. 17.4.1が難しいので要復習
18. 22.1.2のKerberosの仕組みがややこいのでもっかい確認