# Hack Kerberos

## What's Mimikatz?
- 奇人**Benjamin Delpy**によって開発されたWindowsの認証情報をダンプできるツール
![alt text](image.png)
- もっと具体的に言うと、**NTLMハッシュの取得**、**Pass the Hash**攻撃、**Over the Pass**攻撃の実行といったことが可能！まさにスーパーはかあのスイス・アーミー・ナイフ。  

- ツールの実行はスタンドアローンのmimikatz.exeバイナリでも、カーネルモードで実行するmimidrv.sysでも、DLLのmimilib.dllでも、PowerShellから呼び出されるpowerkatz.dll出も可能。
- CTFならmimikatz.exeを使うことが多い。
- 実行するには**ローカル管理者権限**か**SYSTEM権限**、加えて**デバッグ権限**(SeDebugPrivilege)が必要。

## Syntacks of Mimikatz
文法を叩きこませる！  
```
例：
.\mimikatz.exe  # <=実行してmimikatzのセッションを開始
privilege::debug  # <=デバッグ権限へのエスカレーション
sekurlsa::logonpasswords # <=ユーザのNTLMハッシュなどをダンプして取得
exit
```
つまり...
```
<modulename>::<commandname> arguments...
```

## 次にAD関連の用語を叩きこむ！
### Active Directory一般用語
- **ログオンプロセス**
- **Local Security Authority(LSA)**  
=> ローカル環境でのユーザ認証(ログオン/サインイン)や権限のチェックを行う。アカウントの認証とアクセス制御の機能を担当するサービス。  
=> ユーザが認証情報を入力してサインインするときに、そのアカウントが正当なユーザによって所有されていることを確認したり。  
=> 複数のセキュリティポリシーを使って、システム管理者がACLを設定する際の機能も提供したり。  
=> Windowsが起動すると**Lsass.exe**が実行され、これによって**LSA**が有効になる。
=>ローカルコンピュータ上のユーザへのログインとAD環境に置けるドメインユーザへのログオンで挙動が異なる。
=>SAMに(Security Account Manager)に認証情報を保管している。  
=>
- **Domain Controller(DC)**  
=> DCはKDCにもなる。ドメインにおける認証全般を担当する。
- Key Distribution Center(KDC)  
=> Kerberosで使用され、**Ticket Granting Ticket**や**Ticket Service Ticket**を発行する。
- **Authentication Service(AS)**
- **Principal**  
=> ユーザやサービス等に割り当てられる識別名みたいなやつ。
- **SAMデータベース**  
=> Security Account Managerのこと。  
=> Windows NTを利用するユーザやグループのアカウント情報を格納しているDB。  
=> 実態はレジストリに存在している。
=>Security Account Managerに保存されている認証情報は**NTハッシュ**で保存されている。
- **SeDebugPrivilege権限**  
=> 本来はシステムのデバッグ目的で利用される権限レベル。  
=> ただしこの権限はマルウェアによる権限昇格でも使われることが多い。  
=> マルウェアがSeDebugPrivilege権限を取得するときは、OpenProcessTokenやLookupPrivilgeValueA、AdjustTokenPrivilegesといった3つの関数がマルウェアで使われることが多い。  
=> **whoami /priv**コマンドで現在のユーザに割り当てられている権限が分かる。  
=> トークン偽装攻撃等でもこのSeDebugPrivilege権限が必要になったりする。
- **LSASS.exeダンプ**  
=> **LSASS(Local Security Authority)**は、LSAから使用されたりする。  
=> ユーザの認証(ログオン/サインイン)のチェック等ができる。  
=> lsassを実行したときにメモリをダンプすると、ユーザ名やパスワードを取得できたりする。
=> 入力されたパスワードを**NTハッシュ化**して、Security Account Managerデータベース野中にある値と嫁ごうし、パスワードの検証を行う。
=>認証に成功すると、LSASS.exeはパスワードのNTハッシュをメモリに保存する。
=>メモリにNTハッシュを保存すると、ユーザは各リモートサービスに視覚情報を再入力する必要がなくなり、ファイルサーバなどのネットワークリソースにアクセスできるようになる。
- **ローカル管理者**  
=> **Administratorsグループに所属しているユーザ**のこと。  
=> 一台のコンピュータやサーバに対して権限を持つ。  
- **ドメイン管理者**  
=> **Domain Admins**というグループに所属しているユーザの事を指す。  
![alt text](image-2.png)
=> ローカルAdministratorと違い、文字通りドメイン内のすべてのコンピュータの管理ができる**最強にして最高の権限**。  
=> ネットワーク全体に対して管理者としての権限を持つ。
- SYSTEM権限
- Administratorsグループ  
=> コンピュータ一台ごとにAdministratorsというグループが初めから存在する。  
=> ビルトインユーザであるAdministratorはこのAdministratorsグループに所属している。  
=> Administratorsグループに所属しているユーザは**システム管理者権限を持つ**。  
=> **Administratorsグループに所属させれば、Administratorユーザ以外でもシステム管理者にすることができる**。  
![alt text](image-1.png)  
=> ややこしいが、Administratorユーザには、**ローカルAdministrator**と**ドメインAdministrator**がいるので注意。
- admin(Administrator)  
=> Windowsに初めから存在している**ビルトインユーザ**。  
=> 権限としては最も強力で、**アプリケーションのインストール**、**ユーザの作成**、**レジストリの変更**といったあらゆる操作が可能。  
=> adminは**Administratorsグループに所属している**。

### Kerberos認証関連
- ハッシュアルゴリズム
=>Windowsのパスワードは基本ハッシュ化されている。Windowsにおけるハッシュアルゴリズム名はややこしいので頑張って覚えよう。
- LMハッシュ
=>Windowsで使われるもっとも古いハッシュアルゴリズム。
=>昔はこの**LMハッシュ**でパスワードをハッシュ化していた。
=>しかし、**大文字と小文字を区別しない**、**14文字までしか入力できない**といった弱点がある。。。
=>そのためWindows Vista/Server 2008からはLMハッシュはデフォルトで使われなくなった。
- **NTハッシュ**
=>ややこしさの元凶。別名**NTLMハッシュ**。
=>Net-NTLMハッシュと同盟だが、実装と用途は異なる。
=>UTF-16にエンコードしてMD4でハッシュ化する。Saltはつかない。
- **Net-NTLMハッシュ**
=>Wndowsネットワークにおける**チャレンジ/レスポンスプロトコルであるNet-NTLM認証**でしようされるハッシュが**Net-NTLMハッシュ**
=>v1とv2があり、**NTLMv1/v2**と呼ばれるが、ここでは**Net-NTLMv1/v2**と呼ぶ。
=>NTハッシュとNet-NTLMハッシュは別も能登だけ認識しておく。
- Net-NTLMv1/v2
- Net-NTLMv1
- Net-NTLMv2
- Kerberos
- Ticket-Granting Tiket(TGT)
- krbtgt
- Ticket-Granting Service(TGS)
- Service Tiket
- Kerberos認証プロセス
- Golden Ticket
- Silver Ticket

### ADの攻撃手法
- Pass-the-Hash(PtH)
- Overpass-the-Hash
- Skelton Key Attack
- DCShadow
- Kerberoasting
