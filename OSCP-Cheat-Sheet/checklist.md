# Labを解く際のチェックリスト

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
10. 



## 権限昇格
1. sudo -lで、パスワードなしでroot権限実行できるコマンドは無いか
2. idコマンドで、現在ログイン中のユーザはどこのグループに属しているか
3. 自分のユーザをAdminグループにaddできないか
4. nanoやviなどがpwなしroot権限で実行できないか、これでrootのプライベートキー等の任意のファイルを上書きできないか
5. Users\, Public\, Desktop\ その他ウェブ系ツールなどのフォルダ配下に、*.kdbg, *.txtといったパスワードが記載されてそうなファイルはないか
6. (Get-PSReadlineOption).HistorySavePathコマンドで、PSReadlineモジュールが記録したPowerShellのコマンド履歴に認証情報が置いてないか
7. Public\配下にtranscriptファイルが置かれていないか
8. GUIアクセスできる場合、イベントビューア > Application and Service Log > Microsoft > Windows > PowerShell > Operationalにスクリプトログが残されていないか、そこに認証情報が無いか