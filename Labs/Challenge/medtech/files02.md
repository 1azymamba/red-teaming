# files02
## Time
pivot = 2.5H

## 教訓
1. Mimikatzはなぜか最新バージョンが動かないので、kaliのデフォルトバイナリ使うのが吉
2. mimikatzで取得するクレデンシャルはSAMのものじゃない。lsassのメモリからぶんどってる。なのでnet userで出てくるやつらとは違う点に注意。mimikatzを使えば、セッションが切れてないクレデンシャルをぶんどれる。


## 手順
0. .121のWEB02でPrivEscしてから、mimikatzでjoeの平文パスワード(Flowers1)を取得。
1. その後、nxc smbでPwn3dできることがわかるので中に入る。
2. サービス権限しかないので権限昇格を狙う。今回はmetasploitでシェルをとっていたので、privescが自動的にできてもうた。
3. とりまsystemとってるのでmimikatzかます。けど最新バージョンでなぜかsekurlsa::logonpasswordsがこける。
4. kaliデフォルトで入ってるmimikatzのx64バイナリをぶっかましたら成功。
5. crackmapexecでパスワードスプレーしてからpwndしたやつをpsexecでアクセスしてはじめからsystemなのでこれでproofとっておわり。
6. ちなむと、mimikatzでとれるハッシュとSAMから取れるやつは違うぽいので注意。今回の学びこれ。lsassからダンプするのがlogonpasswords。あと、安定させるならpsexecよりevil-winrmで入った方がいい。47001でwinrmのポートもあいてるので。
7. 横展のために、Documents配下にあるfileMonitorBackup.logというファイルをローカルに落として中を確認すると、ユーザ名とNTLMハッシュのリストが手に入るのでメモしておく。