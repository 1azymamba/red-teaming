# Dictionary
[Dictionary](https://www.youtube.com/watch?v=yUtgruE664g&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=5)

1. nmapスキャンの結果から、ホスト名に-DCが入っているのでドメコンとわかる。ドメイン名はdictionary.csl
2. DCへの攻撃なのでまずはユーザ名の列挙を行う。
3. **kerbrute**でユーザ列挙を行い、ユーザリストを作成する
4. ユーザリストをもとに**impacket-GetNPUsers**を使ってhashを取得する。今回はisabelユーザが見つかる
5. **john**でrockyou.txtをワードリストに設定し、ハッシュをクラックする。Jun2023がパスワード。
6. isabelを使って**rdp**, **winrm**, **psexec**を試すが動かない。**rpcclient**だけ動くので、rpcにizabelで接続する
7. ドメイン内のユーザをezabelのアカウントで列挙する
8. 先ほどのezabelのパスワードから、会社全体で弱いグループポリシーが設定されていると推測されるので、月と日付でパスワードスプレーしていく
9. Backup-ezabelが使えるようになるので、これで**winrm**ログインして**winpeace**でスキャンする
10. スキャン結果からbrowser informationとしてFirefoxに残っている認証情報が見えるので、それを使って権限昇格