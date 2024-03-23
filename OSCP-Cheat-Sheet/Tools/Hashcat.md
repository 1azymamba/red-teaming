# Hashcat
[Documentation](https://hashcat.net/wiki/doku.php?id=hashcat)

## コマンド集
使用可能なルール関数のリストと例は[HashcatWiki](https://hashcat.net/wiki/doku.php?id=rule_based_attack)から。

ハッシュを解析せず、変更されたパスワードを表示する
```
hashcat -r demo.rule --stdout demo.txt
```

ルール関数を使用してルールファイルを作成する。その際、特殊文字$
を含めるために\を使ってエスケープする。
```
echo \$1 > demo.rule
```

- ハッシュキャットのルールファイルは、行でルールが区切られていると、別のルールとしてパスワードのリストにルールを適用する。  
- 1つの行にスペース区切りで別のルールが入っていれば、ルールをどちらとも適用する

各パスワードの末尾に1を追加し、パスワードの1文字目を大文字にし、末尾に!の特殊文字を追加するルールファイル
```
$1 c $!
```

ハッシュタイプを-m 0 でMD5に指定し、ターゲットのcrackmeをrockyouを使ってdemo3.ruleのルールを-rで適用し、--forceで警告を無視する
```
hashcat -m 0 crackme.txt rockyou.txt -r demo3.rule --force
```

ターゲットの情報が全くないときは、/usr/share/hashcat/rulesの既存ルールを使うとよい。  
特に**rockyou-30000.rule**はrockyou用に作られたルールらしいので有効らしい。あと、**/usr/share/hashcat/rules/best64.rule**っていうのも有効。
```
hashcat -m 0 crackme.txt rockyou.txt -r /usr/share/hashcat/rules --force
```

KeePassというパスワードマネージャで保存されるハッシュ形式をhashcatで解析するときの-mに渡す値を表示する
```
hashcat --help | grep -i "KeePass"
```