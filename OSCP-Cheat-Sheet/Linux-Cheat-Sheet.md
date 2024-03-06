# Netcat

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
