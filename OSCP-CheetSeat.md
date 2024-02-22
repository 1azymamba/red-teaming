# 心得
ツールを使う際、そのツールの背景や何をしているツールであるかを理解していなければ、それはツールに使われているのと同義。
ScriptKiddyになりたくなければ、ツールのドキュメントを読み、詳細を知り、可能であればソースコードを読むべし。

run HTTP server on your machine for downloading revershell etc...
```py
python -m SimpleHTTPServer
```

# nmap
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

# BloodHound
AD攻撃でめっちゃ使える。AD環境をスキャンして攻撃経路を特定するために使用するツール。


# smbmap
着眼点
- samba内のGroups.xmlで、ローカルアカウント内のグループポリシー設定を見れる。
- smbでつないでrootパスワード分からないときはとりあえずAnonymous login


# Mimikatz
コマンド実行からWidows内の情報を収集し、攻撃を展開する。
各アクションを実行するには、ローカル管理者権限もしくはSYSTEM権限が必要。
デバッグ権限(SeDebugPrivilege権限)も必要。

基本構文
```
<modulename>::<commandname> arguments...
```

具体例
```
sekurlsa::logonpasswords
```
上記だと、sekulsaモジュールのlogonpasswordsコマンドを実行していることになる。ちなみにこのコマンドで、NTハッシュを取得する。


## Mimikatzを使用する際の事前知識
Windowsでは、パスワードの検証やSSOの実現のため、**LMハッシュ**と**NTハッシュ**というハッシュアルゴリズムが利用されている。

**LMハッシュ**
-> Windowsで使用される最も古いハッシュアルゴリズム。大文字と小文字を区別しない、14文字までしか入力できないといった点から脆弱であるとされ、Windows Vista/Server 2008からデフォルトで利用されていない。

**NTハッシュ**
-> 別名NTLMハッシュ。後述のNet-NTLMハッシュと同名のアルゴリズムだが、実装と用途は異なる。与えられた文字列をUTF-16にエンコードし、MD4でハッシュ化する。Saltはしない。
-> 最新のWindows OSでは、入力されたパスワードはデフォルトでNTハッシュでハッシュ化して保存される。
-> 実際に認証情報が保存されるとき、NTハッシュをそのまま保存しているのではなく、暗号化して保存している。

**Net-NTLMハッシュ**
-> チャレンジ/レスポンスプロトコルNet-NTLM認証で使用されるハッシュ値を指す。NTハッシュとNet-NTLMハッシュは実装も用途も異なる点に注意。

**LSA (Local Security Authority)**
-> ユーザーを認証し、ローカルコンピューターにログオンするためのサブシステム。Windowsの認証をつかさどる。PCを開いてユーザー名とパスワードを入力してログインするとき、このLSAが作用している。
-> LSAの実装部分は、LSASS.exeプロセスがハンドルしている。LSASS.exeは、ログオン要求を行ったユーザーがローカルユーザーかドメインユーザーかによって、適切な資格検証ライブラリに認証情報を渡して検証する。

**Case1.**
-> ローカルコンピューター上のユーザへのログインの場合、LSAはローカルコンピュータ内に保存されている**Security Account Manager (SAM)**というデータベースで管理されている認証情報と比較して検証する。
**SAMデータベースには、ユーザのパスワードがNTハッシュ形式で保存されている。****LSASS.exeは入力されたパスワードをNTハッシュ化**し、**MSV認証パッケージ(msv1_0.dll)**に渡す。
MSV認証パッケージは、SAMデータベース内の値と突合し、パスワードの検証を行う。**認証に成功すると、LSASS.exeはパスワードのNTハッシュをメモリ内に保存する。**このNTハッシュを保存しておくことによって、ユーザは様々なリモートサービスに追加の資格を入力せずにアクセスできる。

**Case2.**
-> Active Directory環境におけるドメインユーザへのログオンの場合、LSAは、**Kerberos認証パッケージ(kerberos.dll)へアカウント名とNTハッシュ化したパスワードを渡し、Kerberose認証を使用して認証する。**
認証に成功すると、**Ticket-Granting Ticket**という認証が成功したことを示す証明書的なものがメモリにデータとして保存される。

**Windowsの認証プロトコル**
Windowsを利用するコンピュータネットワーク上で司代素あれる認証プロトコルには、**Net-NTLM**と**Kerberos**の2つが挙げられる。ここを理解しないと攻撃は難しい。

**Net-NTLMv1/v2**
Net-NTLMは、Windowsネットワークでユーザ認証に利用される**チャレンジ/レスポンスプロトコルである。** v1とv2のバージョンが存在する。なお、Net-NTLMv1/v2はMicrosoftから推奨されておらず、Windows2000以降のドメイン環境ではデフォルトのユーザ認証プロトコルとして
Kerberosが使用されている。**今日では、ほとんどの環境でKerberosが利用されている。**　しかし、何らかの理由でKerberosが利用できない場合はNet-NTLMv1/v2が使用される仕組みであるため、現代でもNet-NTLM/v1/v2の理解を深める意義は大いにある。**現代の技術は過去の技術の応用の上に成り立つ。**
v1/v2のいずれも、以下のプロセスで検証を行う。

1.クライアントがサーバにリクエストを送信
2.サーバがリクエストを受信すると、チャレンジを生成してクライアントに送り返す
3.チャレンジを受信した後、クライアントはログインしているユーザーのパスワードハッシュを使用してチャレンジを暗号化し、応答としてサーバに送信
4.サーバはクライアントが正しい結果を返したか検証

**Active Directory**
ネットワーク内のユーザアカウントやコンピュータアカウントを一元管理する。グループポリシーでリソースを管理。

**Domain Contoller**
ADのデータベースを保持するサーバ

**Key Distribution Center(KDC)**
Kerberosのチケットを発行するサービス。ADのDCはKDCとして動作する。通常、TGSとASと同一ホストで動作する。

**Authentication Service**
認証サーバ。クライアントからの認証要求を受け付ける。認証に成功すると、クライアントに対してTGTを発行する。ASは通常、KDCと同じホストで動作する。

**TGT**
クライアントの身分証。ASによって認証されたクライアントが、認証済みであることを証明する。

**krbtgt**
KDCのサービスアカウントとして機能する、ADｎローカルのデフォルトアカウント。

**Ticket-Granting Service (TGS)**

## Mimikatzのコマンド一覧
mimikatzで使用できるモジュールの一覧を表示する。-hがないので、以下で似たようなことができる。
```
::
```

各モジュールで使用できるコマンド一覧を表示する
```
<modulename>::
```
例
```
standard::
```

**standardモジュール**
実用で使用することはあまりない。standard::answerやstandard::coffeeがおもろい。

**privilegeモジュール**
Mimikatzuのプロセス権限を操作するためのモジュール。

privilegeモジュールでは一番使うコマンド。
実行プロセスに対してRtlAdjustPrivilege APIを使用してSeDebugPrivilege権限を有効にできる。**'20'OK**が返れば権限の有効化に成功。Errorが出た場合、SeDebugPrivilegeの有効化が許可されていない
ユーザでMimikatzが実行していると考えられる。この場合、権限昇格等による処理が別途必要。
```
privilege::debug
```
SeDebugPrivilege権限は一般にはシステムレベルのデバッグ目的で使われるが、デフォルトではローカルのAdminグループにSedebugPrivilegeが付与されている。
この権限があると、システムの任意のプロセスへのハンドルを取得できるため、ローカルの任意のリモートプロセス内のメモリ読み書きなどの操作が可能になる。

**sekurlsaモジュール**
LSASS.exeプロセスから様々な認証情報に関するデータを抽出するためのモジュール。
**Pass-the-Hash**や**Pass-the-Ticket**などの攻撃を実行する際に使用する。

使用可能なすべてのプロバイダーの資格情報をリストする。
```
sekurlsa::logonpasswords
```
アクティブなWindowsセッションを持つユーザの資格情報を表示する。システムプロセスであるLSASS.exeに対して操作を行うため、実行には**SeDebugPrivilege権限、もしくはローカルのSYSTEM権限が必要**

**Pass-the-Hash**という攻撃手法用のコマンド。実行にはSeDebugPrivilege権限、もしくはSYSTEM権限が必要。
```
sekurlsa::pth /user:foo /ntlm:****************** /domain: MicrosoftAccount
```

既存のLSASS.exeのプロセスダンプ(ミニダンプ)を開いて、実行コンテキストを切り替える。対象ユーザのLSASS.exeのプロセスダンプを何らかの方法で前もって取得できていれば、
Mimikatzのsekurlsaモジュールの機能をオフラインで実行できるようになる。感染環境で検知される可能性を低くできる。
LSASS.exeがWindowsローカルでの認証を司っており、このプロセスのダンプさえとれれば、Mimikatzは情報を窃取できる。
```
sekurlsa::minidump
```

ローカルコンピュータ内のメモリに保存されている、最近認証されたすべてのユーザの利用可能なkerberosチケット(Ticket-Granting Ticket)を一覧を表示する。
実行にはSeDebugPrivilege権限、もしくはローカルのSYSTEM権限が必要。
```
sekurlsa::tickets
```

Kerberos認証で使用する暗号鍵を一覧表示する。
```
sekurlsa::ekeys
```
RC4やAESなど複数のアルゴリズムを、けｒべろｓ認証の暗号カギとして使用するパスワードのハッシュアルゴリズムとしてサポートする。sekurlsa::ekeysによって、
複数のアルゴリズムでハッシュ化されたパスワードを確認でき、後述の**Overpass-the-Hash**で、より気づかれにくい攻撃を行うことができる。

**lsadumpモジュール**
LSAを操作するための各種コマンドを提供。このモジュールのコマンド実行には、ほとんどの場合、SeDebugPrivilege権限、もしくはローカルのSYSTEM権限が必要。

ローカルコンピュータ内に保存されているパスワードのNTハッシュもしくはLMハッシュを取得する。
```
lsadump::sam
```
sekurlsa::logonpasswordsと機能が似ているが、lsadump::samはレジストリから、sekurlsa::logonpasswordsはLSASS.exeプロセスメモリからハッシュを取得するという点で異なる。

後述の**DCSync攻撃**を実行するためのコマンド。
```
lsadump::dcsync
```
このコマンドを実行するには、Administrators, Domain Admins, enterprise Admins, Domain Controllersグループに属しているアカウントが必要。

ドメインコントローラに成りすまして、**MS-DRSR**を悪用して、正当なDCに対してレプリケーション内容の変更を通知することで、ADで管理されている情報を改ざんする。
```
lsadump::dcshadow
```

**Kerberosモジュール**



# Whois
基本的なwhois検索
```
whois <ターゲットドメイン名> -h <使用するDNSサーバ>
whois example.com -h 192.168.50.251
```

IPアドレスが分かっている場合、より詳細を逆引きで調べられる。
```
whois <ターゲットIP> -h <使用するDNSサーバ>
whois 1.1.1.1 -h <192.168.50.3>
```

# Nikto
実際にブラックボックスのEnumeratioんで使ったコマンド
```
nikto -Cgidirs all -Display 3 -Format htm -mutate 3 -o nikto_result.htm -port 443 -ssl -url https://hogehoge.com/ -usecookies -useproxy http://127.0.0.1:8080/
```


