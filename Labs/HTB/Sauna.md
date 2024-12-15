# Sauna
## 手順
1. nmapとldapsearch, enum4linuxする。
2. ldapsearchの結果からドメインユーザらしきものが一つ見えるがそれは使わない。
3. Webを見に行き、about usからユーザ名をいくつか取得する
4. pythonスクリプトで、何通りかあり得そうなユーザ名を生成する
5. kerbruteで有効なドメインユーザ名を確認すると、2つヒットする
6. 有効な2つのドメインユーザでAS-REP roastingするとハッシュが取れるのでクラックする
7. 認証情報が1セット手に入るのでそれを使ってbloodhoundしてevil-winrm。この時点でfsmithを侵害。
8. bloodhoundの結果からsvc_loanmanagerがDCSyncできることを確認
9. winpeasでautologonのクリアテキストパスワードを取得してsvc_loanmanagerでevil-winrm
10. svc_managerでDCSync