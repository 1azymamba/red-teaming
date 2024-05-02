# Nmap
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

-p
-p 1-5000みたいな感じで1から5000ポートを指定できたりする。

-A  
OSの検出とサービスのバージョン特定を有効にする。

nmap script engineのヘルプを見れる。実行するとドキュメントのあるURLを表示してくれる。今回の場合だとhttp-headersっていうNSEのURLを表示してくれる。
```
nmap --script-help http-headers
```

--script=http-enumによるWebサーバの深堀り
80ポートなどをスキャンしてApache等のWebサーバが動いていた場合、以下のコマンドで/login.phpや/db/, /images/などの、攻撃の足掛かりとなる可能性があるディレクトリ等を列挙してくれる。
```
sudo nmap -p80 --script=http-enum <target IP>
```

ldapがターゲットで走ってる時の詳細調査
```
nmap -n -sV --script "ldap* and not brute" -p 389 <target IP>
```

## NSEによる脆弱性スキャンについて

Nmap機能の一つであるNSEにおいて、脆弱性をスキャンする機能がある。
これはNessus等の代替にもなる。

脆弱性をスキャンするためのNSEのパスはKaliでは以下に.nseの形式で置かれている。

**/usr/share/nmap/scripts/**

以下のコマンドでリストを表示
```
cd /usr/share/nmap/scripts/
cat script.db | grep "\"vuln\""
```

特定のNSEスクリプトのヘルプ情報を表示する
```
nmap --script-help=clamav-exec.nse
```

NSEスクリプトの中でExploitだけをgrepして探す
```
grep Exploits /usr/share/nmap/scripts/*.nse
```

> [!NOTE]
> NSEによる脆弱性スキャンは**safe**,**vuln**,**intrusive**に分かれる。このうちintrusiveについてはターゲットのシステムを破壊することがある可能性に注意。そのNSEの影響とロジックを把握してから実行すること。

以下のコマンドでvulnカテゴリの全てのNSEを実行
```
sudo nmap -sV -p 443 --script "vuln" <target IP>
```

## 新しいNSEの登録について
最新の脆弱性が特定するかを調査するためのNSEは、Google等で「CVE ID + nse」の形式で検索し、GitHub等からスクリプトをダウンロードし、**/usr/share/nmap/scripts/**に自身でファイルを作成してスクリプトを置く必要がある。また、スクリプトを置いた後は以下のコマンドでnmapのdbを更新する必要がある。

```
sudo nmap --script-updatedb
```

この手順で登録したNSEによって、特定の脆弱性に関する情報をnmapコマンドからターゲットに対して行い、スキャンができる。

> [!NOTE]
> NSEはもちろん有益な情報を与えてくれるが、GitHub等からスクリプトを落とす際はそのスクリプトがバックドアとして機能しないかなど、コードを読んで安全であることを確かめてから落とすこと。

## コマンド集
1. LDAPのポートを狙って詳細スキャンする
```
sudo nmap -n -sV --script "ldap* and not brute" -p 389 <targetIP> > ldapenum.txt
```

2. FTPにおける匿名ログインの有無をチェックする
```
sudo nmap 192.168.219.143 --script=ftp-anon.nse -p 21
```