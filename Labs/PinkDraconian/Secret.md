# Secret 
[Secret](https://www.youtube.com/watch?v=i4bc0N0dMx4&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=16)

1. nmapしてドメインがsecretであることを確認
2. smb共有に適当なユーザ名とパスワードなしでアクセスできる
3. smbで共有されているフォルダをローカルにマウントする
4. Default_Password.txtなるものが見つかる
5. また、ユーザ名も大量に見つかる
6. ユーザ名のリストをファイルに書き込むが、ADでよく使われる形式lee.frankのような形式があるので、それらの名前にフォーマットする
7. crackmapexec smbを使ってブルートフォースする
8. evil-winrm -iでそのユーザとパスワードを使ってアクセスする
9. 初期アクセスが取れたので、SharpHoundをアップロードしてWindows上で実行させる
10. 次に権限昇格を狙うため、ターゲットにwinPEASをアップロードして実行させる
11. winPEASでデフォルトパスワードが見えるので、その認証情報を使ってWindowsのオートログイン機能を使ってcrackmapexecを使ってアクセス
12. bdoverがデフォルトパスを使っていることが分かるので、bloodhoundでユーザの権限を見てみる
13. bdoverをAdminグループにnet userで追加する
14. mimikatzをアップロードしてAdministratorアカウントのNTLMを取得する
15. NTLMをとれたので、AdministratorでPtWして権限昇格