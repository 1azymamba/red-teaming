# Hashcat
[Documentation](https://hashcat.net/wiki/doku.php?id=hashcat)

## コマンド集
使用可能なルール関数のリストと例は[HashcatWiki](https://hashcat.net/wiki/doku.php?id=rule_based_attack)から。

1. ハッシュを解析せず、変更されたパスワードを表示する
```
hashcat -r demo.rule --stdout demo.txt
```

2. 
ルール関数を使用してルールファイルを作成する。その際、特殊文字$
を含めるために\を使ってエスケープする。
```
echo \$1 > demo.rule
```

3. 
- ハッシュキャットのルールファイルは、行でルールが区切られていると、別のルールとしてパスワードのリストにルールを適用する。  
- 1つの行にスペース区切りで別のルールが入っていれば、ルールをどちらとも適用する

各パスワードの末尾に1を追加し、パスワードの1文字目を大文字にし、末尾に!の特殊文字を追加するルールファイル
```
$1 c $!
```

4. 
ハッシュタイプを-m 0 でMD5に指定し、ターゲットのcrackmeをrockyouを使ってdemo3.ruleのルールを-rで適用し、--forceで警告を無視する
```
hashcat -m 0 crackme.txt rockyou.txt -r demo3.rule --force
```

5. 
ターゲットの情報が全くないときは、/usr/share/hashcat/rulesの既存ルールを使うとよい。  
特に**rockyou-30000.rule**はrockyou用に作られたルールらしいので有効らしい。あと、**/usr/share/hashcat/rules/best64.rule**っていうのも有効。
```
hashcat -m 0 crackme.txt rockyou.txt -r /usr/share/hashcat/rules/best64.rule --force
```


6. 
KeePassというパスワードマネージャで保存されるハッシュ形式をhashcatで解析するときの-mに渡す値を表示する
```
hashcat --help | grep -i "KeePass"
```

7. AS-REPする際など、Kerberos関連のハッシュ形式を調べる
```
sudo hashcat -m 18200 hashes.asreproast /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best64.rule --force
```

8. Kerberoasint可能な形式のハッシュをクラックするコマンド。
```
hashcat -m 13100 -o hash_cracked -a 0 ./sql_svc_tgs /usr/share/wordlists/rockyou.txt --force
```