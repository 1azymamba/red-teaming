# Kiero

## Time
iniaccess = 1H 50min
privesc = 2H 23min

※ディスコヒントあり

## 教訓
- snmpwalkからユーザ名探すのには、homeやusr、userといった文字列を検索するのがいい。
- snmpwalkはとりま長く実行しておく。
- デフォルトクレデンシャルは全サービスに試す。
- chmodの使い方とid_rsaへの権限付与を見するとパスワード入力を求められるので注意。
- Executing Linux Exploit Suggesterにあるものは基本全部試す。probableもless probableも。
- Dirty Pipeムズイ。

## 手順
1. とりまいつものrustscanとnmapかます。21, 22, 80があいてた。80は渋すぎた。21はなんもない。早くも詰む。Attack Sufrace少なすぎ。
2. 一縷の希望をudpスキャンに託す。奇跡的にsnmpがあいてるぽかったので(ﾟ∀ﾟ)ｷﾀｺﾚ!!と思いつつsnmpwalkをぶっかます。色々出力が出てきたものの大事な情報を見落としてディスコに逃げる。snmpの中にユーザ名が含まれてるらしい。
3. 確かに/home/が見えててそこのユーザ名が見えた。こいつをつかってftpに行く。パスワードはデフォらしい？ので推測でftp入れる。(実際ここの推測むりげーでは？と思った。答えはkiero)
4. とりまftpすると秘密鍵がとれるので、それを使ってさっきのユーザ名でsshする。注意として、-i ./id_rsaするとき、秘密鍵の権限を400とか600に絞らないとパスワード求められる。rootだけが秘密鍵を読み取れる状態にchmodしておかないと、秘密鍵あるのにパスフレーズ分からねえよ！で無駄に時間を溶かすので注意。
5. なにはともあれsshつながったのでlinpeas。いつもながら出力が多すぎて何すればいいのか謎。SUIDでRESET_PASSWDとかいう怪しいのがあった。これのバイナリ書き換えいけるんちゃう？と思い、ローカルKaliでCのソース作ってscpでアップロード試す。write権限ないからバイナリを置き換えられず失敗。
6. straceでシステムコールを見てからの、SUIDついてるバイナリが読み込む.soをインジェクションするっていう手法があるらしいことをディぐって知る。試すも不発。
7. そろぼち仕事の時間や、と思いつつディスコに逃げる。linpeasでKernel Exploitを見とけとのこと。まじか。
8. 確かにその中にあるDirty Pipeとかいう難解なエクスプロイトを試すと、読み取り権限しかない/etc/passwdとかに書き込めたのでそのままrootになれた。
9. デフォルトパスワードの推測とかlinpeasのどこ見ればええねんとか、個人的に色々とむずかった。本番でこれ来たら捨て問。


## 総括
- 
- 
- 
- 
- 


## 参考情報
[はてぶ](https://knqyf263.hatenablog.com/entry/2022/03/11/105130)

## SSH接続テスト
wifi
```
└─$ ping 192.168.120.149
PING 192.168.120.149 (192.168.120.149) 56(84) bytes of data.
64 bytes from 192.168.120.149: icmp_seq=1 ttl=61 time=245 ms
64 bytes from 192.168.120.149: icmp_seq=2 ttl=61 time=246 ms
64 bytes from 192.168.120.149: icmp_seq=3 ttl=61 time=238 ms
64 bytes from 192.168.120.149: icmp_seq=4 ttl=61 time=245 ms
64 bytes from 192.168.120.149: icmp_seq=5 ttl=61 time=243 ms

--- 192.168.120.149 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4002ms
rtt min/avg/max/mdev = 238.120/243.690/246.415/2.939 ms
```
テザリング
```
└─$ ping 192.168.120.149
PING 192.168.120.149 (192.168.120.149) 56(84) bytes of data.
64 bytes from 192.168.120.149: icmp_seq=1 ttl=61 time=453 ms
64 bytes from 192.168.120.149: icmp_seq=2 ttl=61 time=405 ms
64 bytes from 192.168.120.149: icmp_seq=3 ttl=61 time=333 ms
64 bytes from 192.168.120.149: icmp_seq=4 ttl=61 time=646 ms
64 bytes from 192.168.120.149: icmp_seq=5 ttl=61 time=293 ms
```