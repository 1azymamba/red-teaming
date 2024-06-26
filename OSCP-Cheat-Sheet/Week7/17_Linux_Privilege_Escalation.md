# Linux Privilege Escalation

## Linux Enumeration

### Manual Enumeration
- 手動での列挙は手間がかかるが、自動列挙ツールでは見落とされる可能性のある構成等を把握できるため必須スキル。
- idコマンドでユーザの**UID**(User ID)を確認した時、rootは0から始まり、他のLinuxの通常ユーザは1000からカウントされる。
- **GID**(Group ID)はユーザの特定のグループIDを示す。
- ファイルに対する権限であるrwxとは別に、**setuid**と**setgid**という権限がある。
- setuidとsetgidは、所有者(setuid)または所有者のグループ(setgid)の権限でファイルを実行できるようになる。
- これらsetuidとsetgidの権限には、大文字か小文字で**s**が表示される。
- 実行可能ファイルを実行する際は通常、現在のユーザ権限で実行されるが、SUID権限が設定されている場合、バイナリはファイル所有者の権限で実行される。
- つまり、setuidによってrootがバイナリを所有している場合、ローカルユーザは誰でも、rootの権限でバイナリを実行できることになる。


### ユーザ実行履歴の確認
- Linuxにおいて、ファイル名の頭に.がつくものは、通常のfindなどから隠すための隠しファイルになっている。
- .bashrcもその一つで、.bashrcは新しくシェルのセッションが開始するたびに環境変数を読み取ってくれる。
- なので.bashrcはLinuxの管理者がシステムにおいて認証が必要なカスタムスクリプトを作るときに、平文でパスワードを書いている可能性がある。そのため.bashrcは権限昇格のフェーズで確認する価値がある。.bashrcは/home/usr/にある

### サービスフットプリントの探索
- Linuxには**システムデーモン**というものがあり、これはユーザによる操作を必要とせず、システムのブート時に生成されるLinuxサービス。SSH, Webサーバ, DB等が立ち上がる。
- ps -auxですべてのプロセスを表示できるが、この中に平文のパスワードが含まれていることがあり、そこからパスワードの漏洩につながることがある。
- また、tcpdumpを使えば生のパケットをキャプチャできる。tcpdumpはroot権限が無くては実行できないが、一応この方法でパケットから平文のパスワードを取得する方法もある。

### ファイルアクセス許可を利用した悪用手法
- この手法を利用するには、**書き込み権限に加えて実行権限も必要**
- 主にcronでスケジュールされているジョブがターゲットになる。
- root権限でスケジュール実行されていて、かつ現在のユーザにそのジョブファイルへの書き込み権限があれば、ファイルをechoで編集することによってリバースシェルからのroot獲得ができる。
- Cronジョブは、特定の時間にスクリプトまたはバイナリを実行するために使用される。
- デフォルトでは現在のユーザではなく、所有者の権限で実行される。
- 適切に設定されていれば大丈夫だが、設定ミスがあると脆弱になることがある。
- **権限昇格の条件は上述の通り、root権限で実行されるスケジュールタスクに対するスクリプトの変更権限がある場合。**
- cron jobの構成は、crontab(cron table)として保存されていて、このcrontabで、次回タスクが実行される日時を確認できる。
- crontabは各ユーザが持っている。crontabは/etc/crontabにあり、どのユーザでも閲覧できる。

### Linuxにおけるパスワード認証の悪用
- 周知のとおり、現代Linuxはパスワードハッシュを/etc/shadowに保存している。
- かつては/etc/passwdにハッシュを保存していたが、現在はxで隠されていて、しかもshadowはroot権限が無いと読み込むことができない。
- しかしpasswdとshadowの下位互換性のため、パスワードハッシュが/etc/passwdユーザレコードの2番目の列に存在する場合、それは認証に有効とみなされる。
- そしてこの/etc/passwdの2番目の列は、shadow寄りも優先して認証に使われる。
- つまり、/etc/passwdに書き込み権限があれば、任意のアカウントに任意のパスワードを設定することができるということになる。
- 要するに、以下の形式だとFdzt.eqJQ4s0gがハッシュだが、本来ならこれはxに変えられていて見えない。ただし書き込み権限があればxではなく自分が作ったハッシュをセットできるのでrootを取れる。  
root2:Fdzt.eqJQ4s0g:0:0:root:/root:/bin/bash


### SUIDを使った権限昇格
- SUIDは**Set User ID**のこと。**誰がそのファイルを実行しても、セットされたユーザで実行される。**という状態。
- 所有者がrootで、かつSUIDが指定されていると、どのユーザが実行してもroot権限で実行されたことになる。
- 例えばls -lで権限を確認したときの以下。sフラグがついていると、それはSUIDを示す。この時、**実行権限があるとs、実行権限が無いとS**になる。
-rwsr-xr-x
- ユーザパスワードは/etc/shadowにハッシュとして格納されていて、これはroot(uid=0)のみが閲覧、書き込みできる。
- 以下のコマンドで、SUIDビットが設定された(-perm -u=s)ファイル(-type f)を検索できる
```
find / -perm -u=s -type f 2>/dev/null
```


### sudoの悪用
- sudo(Superuser-Do)は/etc/sudoersファイル内にて権限を定義している。
- sudo -lで、現在のユーザがroot権限で実行できるコマンドを確認できる。
- この時、root権限で実行できるコマンドに現在のユーザが書き込み権限があれば、シェルをroot権限で起動することもできるということになる。


### kernel exploit
- kenerl exploitは複雑だが権限昇格に使える。
- 複雑ゆえに、ターゲットのカーネルバージョンが一致するかだけでなく、Debian, RHEL, Gentoo等のディストリビューションの種類も一致しているかが重要。
- /etc/issueでのLinuxバージョン確認、uname -rでのかねーるバージョンの確認、archによるアーキテクチャの確認が最低でも必須。
- 情報を収集したら、searchsploitでエクスプロイトを調べて使用する。
- コンパイルはターゲット上で行うのが良い。

### Capabilitiesを使った権限昇格
- Linuxには**Capability**というものがあるらしい。
- 低特権のユーザがSocketを開きたい場合、低特権ではそれが行えない。
- 管理者がユーザにSocket通信を許可しようとした場合、バイナリ個別に設定を変えるか、ユーザの権限を変えるかになる。
- Capabilityを検索するには以下のコマンドで可能。  
以下のコマンドで検索したときに、バイナリに**cap_setuid+ep**がついていたらそれをGTFObinで調べてprivescにつなげられる可能性がある。
```
getcap -r / 2>/dev/null
```
- ただし、CapabilityでひっかかるファイルはSUIDの検索では引っかからないので注意。SUIDと一緒にCapabilityの検索も必ずするべき。
- Capabilityがセットされていれば、低特権ユーザでもバイナリを特権で実行できる。

### 環境変数を悪用した権限昇格
- ユーザが書き込み権限を持つフォルダーが環境変数の**PATH**にあった場合、アプリケーションを乗っ取ってスクリプトを実行できる可能性がある。
- Linuxにおいて**PATH**は環境変数を指定していて、バイナリを実行するときのファイルパスを示す。
- 環境変数は以下のコマンドで確認できる。
```
echo $PATH
```

### NFSを悪用した権限昇格
- Linux権限昇格あるあるの一つ。NFS(network file system)。
- NFSの構成は/etc/exportsファイルで定義されている。通常は一般ユーザでも読み取りが可能。
- 