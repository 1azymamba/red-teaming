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