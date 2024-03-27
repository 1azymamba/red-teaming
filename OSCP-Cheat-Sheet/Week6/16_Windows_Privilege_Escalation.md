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
