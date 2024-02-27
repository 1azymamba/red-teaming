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