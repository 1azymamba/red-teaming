# Windows Privilege Escalation

- 通常、ターゲットで初期侵入を成功させた後はMimikatzでのハッシュの抽出や機密情報の窃取を行うために権限昇格して管理者権限を取得する必要がある

## SID
- SID(Security Identifier)は、エンティティを識別するために使われる
- SIDはそれぞれのエンティティもしくはプリンシパル、つまりユーザやグループごとに対して一意に割り当てられる
- SIDはLSA(Local Security Authority)から生成される
- ユーザもしくはグループが生成されたときにSIDが生成・割り当てされ、一度作られたSIDは変更することができない
- Windows OSはSIDを使ってアクセス制御を行い、ユーザ名は気にしない
- SIDの文字列は「-」で区切られ、以下の構造で表される。
例：  
```
S-R-X-Y
```
```
S-1-5-21-1336799502-1441772794-948155058-1001
```
Sはリテラルであり、文字列がSIDであることを示す。  
RはSIDのバージョンを表し、常に**1**に固定される。  
Xは識別子の権限を表す。例えば「5」は最も一般的な識別子権限の値。これはNT権限を指定して、ローカルまたはドメインのユーザおよびグループに使用される。  
Yは識別子権限の会権限を表す。

## Windows Enumeration

Windowsへの初期侵入が完了したら、必ず以下Enumerationすること。
```
- Username and hostname
- Group memberships of the current user
- Existing users and groups
- Operating system, version and architecture
- Network information
- Installed applications
- Running processes
```

**ポイント**  
- バックアップ系のユーザ、グループはアクセス許可のあるファイルが広範な可能性があるので要チェック  
- Remote Desktop Usersのグループに入ってるメンバーもかなり重要。GUIアクセスができるようになると、できることの幅が広がるため。
- PowerShellのコマンドとGet-Processで、インストールされているアプリケーションや実行中のプロセスは確認できるが、実際にはインストールに失敗しているものなどもあるため、C:\Program Filesを目視で確認したほうが良い


## PowerShellのログ調査

- PowerShellのコマンド実行履歴は、認証情報などを取得するための貴重なリソースとなる可能性がある
- PowerShellにはスクリプトブロックログと呼ばれる、コードブロックをイベントとして記録する機能がある
- また、トランスクリプトファイルがあり、ここにコマンドレットの実行履歴が格納される
- PowerShellにおける重要なログメカニズムは、**PowerShell Transcription**と**PowerShell Script Block Logging**。
- TranscriptionはPowerShellコマンドからPublic\などにファイルが保存されているかを確認できるのでそれを閲覧する。
- スクリプトブロックログはGUIでイベントビューアから確認できる。

## 自動列挙
上記ではこれまで、手動での権限昇格のための情報収集手順を列挙したが、実際には**WinPEAS**や**LinPEAS**を使うことが多い。  
  
ただし自動化のツールは誤検出もある。  
例えばWindows OSを11と10でバージョンを間違えたり、手動列挙で行ったトランスクリプトファイルやスクリプトブロックログ等を見落とすこともある。  
  
なので自動化ツールは便利だが、その限界を理解して手動での列挙も行うこと。


## サービスバイナリハイジャック
- Windowsサービスにはそれぞれ、関連付けられたバイナリファイルがある。
- これらのバイナリは、サービスが開始されるか、実行状態に移行するときに実行される。
- アプリケーションをWindowsサービスとしてインストールする際に、プログラムのアクセス許可を開発者が保護せず、Usersグループの全てのメンバーに読み取り権限と書き込み権限が割り当てられていたとすると、そのバイナリを悪意のあるものに置き換えてサービスの再起動等を行えば任意のファイル実行につながる。
- サービスに紐づいたバイナリを置き換えるには、バイナリのパスと権限を確認し、同じ名前で置き換えて、その後net stopコマンド等でサービスを再起動する必要がある。
- ただし、基本的にはサービスの停止には管理者権限が必要なので上記は失敗する。
- 実際の攻撃では、サービスの起動方法をPowerShellなどで確認し、whoami /privで自分の権限でシャットダウンと再起動の権限があれば、再起動等でサービスを動かせる

## サービスDLLハイジャック
- サービスに紐づいたバイナリファイルを書き換えるのは、権限昇格においては有効。
- ただし、実際には書き換え権限が無いことの方が多い。
- service dll hijackで行うことは、書き換えの対象をバイナリファイルそのものではなく、DLLにするだけ。
- ただ、DLLを書き換えるとサービスが動かなくなったりするのでちょい難しい。
- もう一つのテクニックとして、DLLの検索順序を悪用したservice dll hijackもある。
- Windowsは、このDLLの検索順序を悪用したservice dll hijackへの対策として、**Safe DLL search mode**というのを実装している。
- 攻撃の流れは、サービスを列挙する=>サービスへの権限をicaclsで確認する=>サービスのバイナリをローカルに落として、管理者権限でprocessMonitorを使ってロードするDLLを確認する=>DLLの権限を確認し、書き換えが可能かをチェック=>DLLが見つからない場合は、DLLの検索順序を利用して自分が作ったDLLを置くのもOK
- 以下の検索順序のパスに、不正なDLLを配置すれば成立する。
  

現在のWindowsにおいて、DLLは以下のように検索される。
```
1. The directory from which the application loaded.
2. The system directory.
3. The 16-bit system directory.
4. The Windows directory. 
5. The current directory.
6. The directories that are listed in the PATH environment variable.
```

## Unquoted Service Path

- サービスにマップされている実行可能なファイルへのパスに1つ以上のスペースがあり、かつダブルクオーテーションで囲まれていない場合に、権限昇格のための攻撃ベクトルになる可能性がある。
- ファイルパスにスペースが含まれていてクオーテーションで囲まれていない場合、ファイル名がどこで終わって引数がどこで始まるかを、プロセス生成と気のCreateProcessとIpApplicationNameが認識できない。
**具体例**  
例えば以下がサービスだとする。  
そしてC:\Program Files\Enterprise Appsに対して書き込み権限があるとする。  
そうすると、~Apps\にCurrent.exeというファイルを配置することで攻撃が成功する可能性がある。
```
C:\Program Files\Enterprise Apps\Current Version\GammaServ.exe
```

## タスク実行からの権限昇格
- タスクがNT AUTHORITY|SYSTEMもしくは管理者ユーザとして実行されていれば、権限昇格につながる可能性がある
- タスクのトリガーを確認する必要がある。
- もちろん、タスク実行されるバイナリかDLLを書き換える権限は必要。


## Windows Exploit
- **名前付きパイプ**は、Windowsにおけるローカルまたはリモートプロセス間通信の1つの方法。
- 名前付きパイプによって、無関係な2つのプロセスが相互にデータを共有・転送する機能を提供する。
- クライアントが名前付きパイプに接続 => サーバが接続プロセスから認証を取得 => **SeImpersonatePrivilege**を利用してクライアントを偽造できる => これが脆弱性の悪用につながる

## よくある場所からパスワードを取得して権限昇格
- Windowsにおけるもっとも簡単な権限昇格の方法として、パスワードが置かれがちな場所をチェックして平文で認証情報取得、というのがある。
### Windowsにおけるインストールの自動化
- 多数のホストにWindowsをインストールする場合、管理者がWindowsの展開を自動で行うことがある。
以下のパスに注意。  
```
C:\Unattend.xml
C:\Windows\Panther\Unattend.xml
C:\Windows\Panther\Unattend\Unattend.xml
C:\Windows\system32\sysprep.inf
C:\Windows\system32\sysprep\sysprep.xml
```
### Powershellのhistoryから認証情報を取得
- Powershellを使ってコマンドを実行すると、そのコマンドは過去のコマンドとしてファイルに保存される。
- ユーザがパスワードを平文で含むようなコマンドを過去に実行していた場合、いかのコマンドでコマンドプロンプトからパスワードが取得できる。
```
type %userprofile%\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt
```
- 以下のコマンドで、Windows端末に保存された認証情報を一覧で取得できる。
```
cmdkey /list
```
- また、以下のコマンドでrunasから資格情報が分からなくてもそのまま使用できたりする。
```
runas /savecred /user:admin cmd.exe
```

### IISの構成から権限昇格
- IISのWebサイト構成は**web.config**というファイルに保存される。
- ここには、DBのパスワードや構成された認証メカニズムなどが保管できる。
- web.configはIISのバージョンによって以下のいずれかにある。
```
C:\inetpub\wwwroot\web.config
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\Config\web.config
```
- 以下のコマンドでweb.configにあるパスワードらしき文字列を検索できる。
```
type C:\Windows\Microsoft.NET\Framework64\v4.0.30319\Config\web.config | findstr connectionString
```

### PuTTYから認証情報を取得して権限昇格
- PuTTYは、Windowsで一般的にみられるSSHクライアント。
- PuTTYには、クリアテキストの資格情報を含むプロキシ設定が保存される。
- 以下のコマンドで取得が可能。
```
reg query HKEY_CURRENT_USER\Software\SimonTatham\PuTTY\Sessions\ /f "Proxy" /s
```

## 危険な特権の乱用による権限昇格
- windowsには、ご存じ**SeBackup**等のDACLベースのアクセス制御が存在する。
- これらの権限を利用することで、権限昇格が可能になることがある。

### SeBackupとSeRestore
- **SeBackupおよびSeRestore権限が有効になっている場合、設定されているDACLを無視して、システム内の任意のファイルを読み取りおよび書き込みできるようになる。**
- 任意のファイル、とあるが、一例として**SAMおよびSYSTEMレジストリハイブ**をコピーしてローカル管理者のパスワードハッシュを抽出するといった手法が可能になる。

### SeTakeOwnershipの悪用
- **SeTakeOwnership**を使うと、ユーザはファイルやレジストリキーを含むシステム上のあらゆるオブジェクトの所有権を取得できる。
- なので、SeTakeOwnershipを使って特権昇格を行うシナリオも少なくない。
- シナリオとして、utilman.exeのバイナリをcmd.exeに書き換えてからロック画面でcmdをSYSTEM権限で実行する、というものがある。

### SeImpersonateとSeAssignPrimaryTokenの悪用
- これらのトークンを使うと、プロセスが他のユーザになりすまして、そのユーザに代わって動作するということが可能になる。
- 



## 脆弱なソフトウェアの悪用による権限昇格
### パッチが適用されてい以内ソフトウェア
- ターゲットシステム上のソフトウェアは、様々な権限昇格の問題を引き起こす可能性がある。
- ドライバ同様、ユーザはOSを更新するほど頻繁にドライバを更新しないのがあるある。
- 以下のwmicコマンドで、システムにインストールされているソフトウェアとそのバージョン一覧を取得できる。
```
wmic product get name,version,vendor
```

## Wuick Winの獲得
- スケジュールタスクの設定をミスっていた場合、どのユーザ権限によって実行されるか、また、どのようなタスクを実行するかによってバイナリを書き換えからの権限昇格ができることがある。
```
schtasks /query /tn vulntask /fo list /v
icacls C:\tasks\schtask.bat
C:\> schtasks /run /tn vulntask
# スケジュールタスクの確認 => タスクへの権限チェック => タスクの手動実行
```
- スケジュールタスクを確認して**Run as User**と**Task to Run**のパラメータをチェックするのが大事。
- batを制御とかできれば、コマンドプロンプトをRun as Userのユーザ権限で実行できる。

## Windowsサービスバイナリの設定ミスによる権限昇格
- Windowsサービスは、**Service Control Manager(SCM)**によって管理されている。
- Windowsにおける各サービスには、サービスが開始されるたびにSCMによって実行される**exeファイルが関連付けられている。**
- 各サービスは、サービスを実行するユーザアカウントも、スケジュールタスクの時のように紐づけられている。
- 以下のコマンドでサービスのチェックをしたときに、**BYNARY_PATH_NAME**のパラメータが、実際に実行されるコマンドになる。
```
sc qc apphostsvc # apphostsvcのサービス状態を確認する
icacls <apphostsvcバイナリのファイルパス> #これで変更権限があればシェルをとれるかも。
```

## ダブルクオーテーションで囲われていないサービス実行を利用した権限昇格
- Windowsにおいてサービスに紐づいたバイナリがダブルクオーテーションで囲われていない場合、権限昇格につながる可能性がある。
- サービスにバイナリを紐づけるとき、そのバイナリのパスに**空白が含まれていて、かつダブルクオーテーションで囲まれていないと実行と気にエラーが発生する。**
- 空白があってダブルクオーテーションで囲まれていない場合、空白以降はバイナリの引数として認識されてしまう。
- SCMは以下の順番で、サービスの実行が失敗してもパスを見つけようとする。
```
First, search for C:\\MyPrograms\\Disk.exe. If it exists, the service will run this executable.
If the latter doesn't exist, it will then search for C:\\MyPrograms\\Disk Sorter.exe. If it exists, the service will run this executable.
If the latter doesn't exist, it will then search for C:\\MyPrograms\\Disk Sorter Enterprise\\bin\\disksrs.exe. This option is expected to succeed and will typically be run in a default installation.
```
## WindowsサービスのACL設定ミスによる権限昇格
- 上述したサービスに紐づいたバイナリの書き換えに似ている。
- ここでは、サービスに紐づいたバイナリではなく、**サービスそのもののDACL**設定ミスによるサービスの再設定を試す。
- 例えばBuilt in UserグループがSERVICE_ALL_ACCESSの権限を持っていた場合、誰でもサービスの設定を変更できる。  
- 以下のコマンドで、サービスの設定を変えることができる。
```
sc config THMService binPath= "C:\Users\thm-unpriv\rev-svc3.exe" obj= LocalSystem
```

## 脆弱なソフトウェアの悪用

### パッチが適用されていないソフトウェア
- ドライバが更新されるほど頻繁にソフトウェアはアップデートされない傾向にある。
- 以下のコマンドでwindows上にインストールされているソフトウェアを列挙することが可能。
```
wmic product get name,version,vendor
```
- ただし上記のコマンドはすべてのインストールされているソフトウェアを返すわけではない点に注意。
- デスクトップ上のショートカットや利用可能なサービスなどを手動で列挙することももちろん重要。
- 脆弱なソフトウェアのバージョン情報を特定したら、exploit-db等で調べて昇格を行う。