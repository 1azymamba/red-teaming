# Debian系Linuxのコマンド

## コマンド集

1. システムで使用されているカーネルに関する追加の詳細を取得する。
```
uname -a
```

2. Ubuntuの正確なバージョンを特定する。
```
cat /etc/issue
```

3. 現在のディレクトリでflag1.txtという名前のファイルを見つける。
```
find . -name flag1.txt
```

4. /homeディレクトリでflag1.txtというファイルを見つける。
```
find / -name flag1.txt
```

5. 100Mを超えるファイルを探す。
```
find / -size + 100M -type f 2>/dev/null
```

6. 誰でも書き込みが可能なフォルダを検索する。
```
find / -type d 2>/dev/null
```

7. システム全体のcapabilityを表示する。  
この時、出力にcap_setuid+epとあれば、それをGTFObinで調べてPrivEscにつなげられる可能性がある。
```
getcap -r / 2>/dev/null
```

8. ファイルのcapabilityを表示する。
```
getcap /usr/bin/ping
```

9. 現在のユーザで書き込み権限があるディレクトリをすべて表示する。
```
find / -writable -type d 2>/dev/null
```

10. PATH環境変数の先頭にパスを追加する。その後念のためPATHを確認する。
```
export PATH=/hoge:$PATH
echo $PATH
```

11. ターゲットマシン上で共有がONになっているNFSのファイルを列挙する。
```
showmount -e <target IP>
```

12. ファイルにSUIDフラグをセットする。
```
chmod +s hoge
```