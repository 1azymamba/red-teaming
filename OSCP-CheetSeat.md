run HTTP server on your machine for downloading revershell etc...
```py
python -m SimpleHTTPServer
```

# nmap
nmap
スキャンしてRESETが返ってくる→ポートが閉じてる判断になる

スキャンして応答が返ってこない→FWでパケットをドロップしている判断ができる→セキュリティ向上の目的では、FWでRST返すようにするのもあり。攻撃者が情報収集しづらくなる。

FWでフィルタリングされていると判断した場合、以下が表示
```
Not shown: 995 filtered ports
```

RSTが返ってきてポートが閉じてる判断だと以下が表示

Not shown: 959 closed ports, 35

-sT
TCPスキャン。
シンアックでスリーウェイハンドシェイクできたらポートが空いてる判断。

-sS
SYNスキャン。別名ハーフオープンスキャン、ステルススキャン。
ターゲットにSYNを送る→SYN+ACKがかえる、→RSTを返して通信閉じる

# BloodHound
AD攻撃でめっちゃ使える。AD環境をスキャンして攻撃経路を特定するために使用するツール。


# smbmap
着眼点
- samba内のGroups.xmlで、ローカルアカウント内のグループポリシー設定を見れる
- smbでつないでrootパスワード分からないときはとりあえずAnonymous login
