# Active
## 手順
1. nmapする。大したものは開いてない
2. ldapsearch, kerbrute, ldapsearch, udpスキャン, enum4linux, nmap-ldap等思いつく限りのスキャンをしていく
3. smbclientで匿名ログインすると、policiesを取得できる。この中に、Group Policy Preference(GPP)が入っている
4. GPPは昔(2014)にAESで暗号化されたパスワードがSYSVOLに保存されるというものだったらしいが、AESのキーがMSから後悔されたらしい
5. なのでgpp-decryptというコマンドでsvc_tgsユーザのパスワードを復号できる
6. 取得した認証情報を使ってkerberoastingを行ってみるとadministratorのチケットが手に入るのでクラックして終わり