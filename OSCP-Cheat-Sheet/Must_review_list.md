1. Chapter6.3.6 SNMP Enumeration
2. Chapter8.4.5 Privilege Escalation via XSS => Hello Dollyプラグインのhello.phpの書き換えからwebshell取得できるはずだが、something wrongのエラー出てしまうのでFTPのアップロード方法等調べて再度試す。
3. Chapter9.1.2 Identifying and Exploiting Directory Traversal => VM #1で、パストラバーサルによるsshキーの取得はできた。しかしそれを使ってport 2222にアクセスができない。サブドメイン乗っ取りらしきこともされてる可能性があり、フォーラムとかでも調べてから再度チャレンジ予定。
4. Chapter 9.2.1 => 9.1.2と同じ理由でPending
5. Chapter 9.3.1 => PowerShellのリバースシェルをb64するとなぜか動かないのでいったんpending
6. Chapter 9.3.2 => 公開鍵をアップロードする過程で、ファイルサイズのせいか分からないがアップロードがとまっちゃってうまくいかないのでpending
7. Chapter 9.4.1 => Lab1でPowershellのリバースシェルがなぜかうまくいかない, Lab3のCapstone Exerciseで、Werkzeugの脆弱性を突けばいいんだと思うけどなんか普通にExploitできない。