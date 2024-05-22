# Forest

## Time

iniaccess = 1H
privesc = 1H 30min


## 教訓
- DCSyncを成功させる条件について
- Kerberos preauthenticationについて
- Generic AllとAccount Operatorsグループ、それとEXCHANGE Windows Permissionsグループ


## 手順
1. とりまrustscanとnmapする。ターゲットのマシンがDCマシンぽいことが、開いてるポートやらから分かる。
2. DCっぽいのでenum4linuxとnmapのldap* bruteでチェックする。ドメイン名とユーザ名がこの時点で分かる。
3. ユーザ名のリストが作成できたので、Kerberos preauthenticationが有効になっているかが次に気になるところ。preauthenticationが有効になっていない場合、AS-REQメッセージを送らないので、DCがユーザのチェックを行わずにユーザのTGTを返してくれる。
4. 上記のpreauthenticationのチェックを、GetNPUsers.pyで行う。そうするととあるユーザのハッシュが手に入るので、これをjohnでクラックするとパスワードの平文が手に入る。
5. 取得したクレデンシャルを使ってevil-winrmでつなぐ。こっから権限昇格。
6. お決まりのsharphoundアップロードしてからのローカルのbloodhoundで解析。
7. この解析がムズイ。とりあえず、Find Shortest Paths to Domain Adminsをやってみると、今のユーザとかが見つかるので、今取得してるユーザでMark user as Ownedをクリックする。
8. 次にShortest Path from Owned Principalsをする。これで、侵害したユーザからの最短の権限昇格っぽいのが見える。
9. 見てみると侵害しているユーザは、SERVICE ACCOUNTSグループのメンバになってる。そしてこのSERVICE ACCOUNTSはPRIVILESED IT ACCOUNTSのメンバで、さらにこれはACCOUNT OPERATORSのメンバ。
10. つまり、現在侵害しているユーザは間接的にACCOUNT OPERATORSグループの権限を持つことになる。ちなみにこのAccount OperatorsグループはAD環境にデフォで存在するグループっぽい。
11. つまり現在侵害しているユーザは任意のユーザを作成できる状態。更に見ていると、このAccount Operatorsグループは、EXCHANGE WINDOWS PERMISSIONSという別のグループに対してGENERIC ALLの権限を持つ。つまり、ACCOUNT OPERATORSのメンバは、EXCHANGE WINDOWS PERMISSIONSグループにユーザの追加や削除を含めた、グループの変更に関するすべてのことを行えるということになる。
12. そしてEXCHANGE WINDOWS PERMISSIONSは、HTB.LOCALドメイン上のDACLを変更できる権限を持っている。なので、任意のユーザにDcSyncの権限を割り当てることができるはず。
13. ここまでで、ドメイン掌握のシナリオは以下のように考えられる。  
現在侵害しているACCOUNT OPERATORSグループの権限を持つユーザで、net userを使ってドメイン内にユーザを追加する => 作成したユーザをEXCHANGE WINDOWS PERMSISIONSグループに追加する => EXCHANGE WINDOWS PERMISSIONSグループに追加した任意のユーザにDcSyncの権限を割り振る(DACLの変更) => 権限を割り振ったEXCHANGE WINDOWS PERMISSIONSグループ内のユーザを使って、kali上からDcSyncをDCに対して実行し、全ユーザのパスワードハッシュを取得する。
14. 上記のシナリオに基づいて具体的なコマンドを入力すること自体はそこまで難しくない。あとはコマンド調べながらやるだけ。

## 総括
- めっちゃ勉強になる良いマシン。Easy判定されてるけど今の僕にとっては全然Easyじゃないです。
- ADの権限と権限の継承みたいなところに気付かないとムズイ。慣れ。