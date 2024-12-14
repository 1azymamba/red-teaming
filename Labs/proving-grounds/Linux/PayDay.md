# PayDay
## 手順
1. nmapして80ポートにferoxbuster
2. するとC-Cartというシステムで動いていることが分かる
3. ログインでadmin adminすると入れてしまう
4. 管理者画面はadmin.phpにあるらしく、それは調べたら出てきた
5. 管理者画面にadmin adminでログイン
6. authenticated rceが調べると出てくるので試すと初期シェルが取れる
7. 