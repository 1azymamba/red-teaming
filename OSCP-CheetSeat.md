run HTTP server on your machine for downloading revershell etc...
```py
python -m SimpleHTTPServer
```

# nmap

# BloodHound
AD攻撃でめっちゃ使える。AD環境をスキャンして攻撃経路を特定するために使用するツール。


# smbmap
着眼点
- samba内のGroups.xmlで、ローカルアカウント内のグループポリシー設定を見れる
- smbでつないでrootパスワード分からないときはとりあえずAnonymous login
