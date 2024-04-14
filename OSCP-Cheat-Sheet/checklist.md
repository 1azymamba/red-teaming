# Labを解く際のチェックリスト

# Windows

## 初期侵入
1. rpcclientを使って匿名ログインができないか
2. SMB共有への匿名ログインができないか
3. FTPへの匿名ログインができないか
4. NFSを使っている場合、ターゲットのディレクトリをローカルにマウントできないか
5. ADのドメイン名はnmapのDCから確認できたか
6. Webアプリケーションへのログインで、デフォルトパスワードとadmin adminは試したか
7. WordPressを使っている場合、pluginの脆弱性はないか
8. WordPressを使っている場合、PHPファイルの書き換えからRCEにつなげられないか
9. パストラバーサルの脆弱性がある場合、SSHの秘密鍵をアップロードで書き換えられないか
10. nmapでldapスキャンをしてユーザ名を取得後、impacket-GetNPUsersでパスワードスプレーでAS-repできないか

## 権限昇格
1. sudo -lで、パスワードなしでroot権限実行できるコマンドは無いか
2. idコマンドで、現在ログイン中のユーザはどこのグループに属しているか
3. 自分のユーザをAdminグループにaddできないか
4. nanoやviなどがpwなしroot権限で実行できないか、これでrootのプライベートキー等の任意のファイルを上書きできないか
5. Users\, Public\, Desktop\ その他ウェブ系ツールなどのフォルダ配下に、*.kdbg, *.txtといったパスワードが記載されてそうなファイルはないか
6. (Get-PSReadlineOption).HistorySavePathコマンドで、PSReadlineモジュールが記録したPowerShellのコマンド履歴に認証情報が置いてないか
7. Public\配下にtranscriptファイルが置かれていないか
8. GUIアクセスできる場合、イベントビューア > Application and Service Log > Microsoft > Windows > PowerShell > Operationalにスクリプトログが残されていないか、そこに認証情報が無いか
9. Windowsサービスに紐づいたバイナリファイルに、全ユーザに対してのフルアクセス権限が割り当てられており、バイナリファイル、もしくはDLLを書き換えられないか
10. ダブルクオーテーションで囲まれていないサービスにリンクされたバイナリのファイルが存在し、そのバイナリが存在するパスへの書き込み権限はないか
11. SeImpersonatePrivilegeの権限が有効になっていないか
12. 自分がアクセスできるユーザが、SIDをコンバートしたときに、ドメイン内でGenericAllのような強力なユーザを持っていないか
13. ドメイン共有内の古いポリシーファイルの.xmlファイルに、GPP(Group Policy Preference)のパスワードがないか
14. Kerberos preauthenticationが無効になっているアカウントがドメイン内にないか。それがあれば、Rubeusやimpacket-GetNPUsersを使ってAS-REP Roasting攻撃を使ってユーザのパスワードをクラックできる可能性がある。

# Linux

## 権限昇格
1. /home/user配下に.bash_historyがないか、また、その中に認証情報等が平文で書かれていないか
2. /home/usr/.bashrc内にセットされている環境変数に、認証情報がは無いか
3. cronにスケジュールされいるファイルの中に、現在のユーザで書き込みができ、rootでcronの実行権限があるファイルはないか
3. /etc/passwdに書き込めれば、shadowよりも優先して認証に使われるため、任意のアカウントに任意のパスワードを設定できる。/etc/passwdに書き込み権限はないか
