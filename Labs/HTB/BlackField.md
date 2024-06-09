# BlackField

## Time
first creds... 2H 5min  
foothold 2H  
privesc 1H 20min

## 教訓
- AD環境ではsam/systemだけがハッシュ取得の方法じゃない。ローカルユーザが使えないときはntds.ditもみるべき。
- smbアクセスでパス指定の仕方をミスって無駄に時間を食った。-Lはディレクトリの列挙だけなので、ログオン目当ての時は抜く。
- footholdの段階で、DCと通信できるならシェルを取ってなくてもKaliからpython × bloodhoundを使えるので使う。
- bloodhoundで、侵害したアカウントのOUTBOUND OBJECT CONTROLLを見るのが結構大事だった。こいつが他のオブジェクトに対して何ができるかを教えてくれる。
- rpcclientでのpwchangeは初めて見た。良い。
- とりまむずかった！

## 手順
1. まずはrustscan。ポートは色々開いているが、まずはenum4linux, ldapsearch, nmap --script ldap brurte, kerbruteをぶん回しておく。
2. ぶん回している間に、rpcclientとsmbclientで匿名ログインができないかを試す。どっちもログインは匿名でいけるぽい。
3. smbclientが、ターゲットのディレクトリは見えるのにログインできなくね？となってrpcclientのコマンド試しまくるなどして時間を溶かす。
4. ldapsearchらへんの列挙が終わって確認するも、ユーザ名取得できておらず詰んだくね？となる。
5. smbclientをディグリながらいろいろ試す。どうやらコマンドの指定をミスってたぽい。-Lなしでディレクトリ指定するとanonymous logonでディレクトリを全部ローカルに落とせた。
6. 321?こくらいのディレクトリを落とし、ユーザ名っぽいのでそこからユーザ名のリストを作成する。
7. ユーザリストを作成した後、とりあえずAS-REP Roastingぶっかます。ここで一つだけユーザがヒットする。
8. ユーザのハッシュをhashcatの形式で取れたのでクラックを試す。クラックできる。
9. 1つぶんのユーザ&パスワードを取得できたので、psexec, Kerberoasting, evil-winrmを試すも失敗。まだこのユーザでシェル取れないのかもと思い、とりまsmbclientを子のクレデンシャル使ってもっかいやる。
10. さっきアクセスできなかったSYSVOLに入れるのでそこのディレクトリ全部ローカルに落とす。ちなみにSYSVOLっていうのは[これらしい](https://e-words.jp/w/SYSVOL%E3%83%95%E3%82%A9%E3%83%AB%E3%83%80.html)
11. SYSVOLについてディグっていると、他のDCとの同期やらのためにあったりログオンスクリプトやらグループポリシーの設定ファイルやらがあったりするらしい。クレデンシャルありそうな予感。wkwk
12. まさかのなし。GPPが見つかればAES復号いけたはずなのに。。
13. あきらめてぼーっとして時間を溶かす。パスワードスプレーしてないことを思い出す。smbにnxc使ってさっきクラックしたパスワード使ってみると、smbで同じパスワードを使ってるやつがいた。
14. winrmとldapもnxcしておく。全部だめでおわた。
15. ここでギブってwriteup見に行く。LinuxからPythonでbloodhoundクエリ送れるっぽいのでそれをやるらしい。考えてみたら、確かにDCと通信できればbloodhoundも行けるはず(?)内部端末に侵入してからっていう先入観があったけど、そもそも今回は初めからターゲットがDCなのでbloodhoundもいけると。。
16. で、bloodhoundを見るもどっからいけばいいか分からへんという。ここもWriteupをばちこりに見る。
17. AnalysisじゃなくてNode Infoを見るべきだったらしい。今もってるユーザのOUTBOUND OBJECT CONTROL、つまり、現在侵害しているドメインユーザから他のドメインユーザに対して何ができるか、みたいな権限を見ることができる。
18. このOUTBOUND OBJECT CONTROLで、audit2020ユーザに対してchangepasswordの権限があるのが分かる。
19. rpcclientにsupportユーザで入ると、audit2020ユーザのパスワードを変更できる。
20. audit2020でnetexecしていくと、winrmは無理だがsmbはいけるぽいことがわかる。で、ここには先ほどのsupportでは入れなかったフォルダへのアクセス権限がある。
21. forensicなるフォルダからrecurse ON prompt OFFしてmget ./*する。.zip系のファイルが結構手に入る。
22. 平文の認証情報はないが、lsass.dmpというのがあるので、この中にNTLMハッシュとかありそう。この中のNTLMを取得して、新しくsvc_backupユーザとAdministratorのNTLMハッシュでnxcして、smbとwinrmへのアクセスを確かめる。
23. Administratorはさすがに無理。svc_backupでwinrmがいける。やっとfootholdゲット。
24. svc_backupから権限昇格を狙う。名前から推察するに、全ファイルへの読み取り権限とかありそう。実際、Administrator配下のファイルも中身はcatできないが一応ファイルの存在は確認できる。
25. backupというくらいなので、regでsamとsystemをダンプしてNTLMとれそうかも。案の定whoami /privすると、SeBackupPrivilegeを持ってる。
26. reg saveでsystemとsamを取得してevil-winrmからローカルにdownload
27. たしかsamdump2は新しめのWindowsハッシュのダンプに失敗するので、impacket-secretsdumpと併用してimpacket-secretsdumpの結果をクラックするのが無難。
28. この時点で、AdministratorとGuest, DefaultAccountなるユーザのNTLMが見える。正確には、aad3...04eeの部分はNULLになり、:で分けられた....:::の部分がLMハッシュになる。
29. hashcatでクラックしてゆく。クラックできないので、そのままAdministratorのLMハッシュを使ってevil-winrmからのPtHを狙う。しかしなぜか通らない。Writeupを見る。
30. SAMとSYSTEMからのダンプではなく、ntds.ditをダンプするのが正攻法らしい(?)それぞれの違いとして、SAMからとるのは端末のローカルアカウント、ntds.ditは、ドメインアカウントすべての情報をダンプできるぽい。AdministratorのLMがそれぞれ違っていたので、これが違うせいで、evil-winrmはドメインユーザのAdministratorのパスワードを求めていたためにアクセスできなかったのかも？writeupも同じことしてたけど、SAMでダメなこともなんかあるらしい。なのでそういうときはDCならntds.ditがあるはずなのでそっちをぶんどる方向にシフトする必要がありそう。
31. なのでとりあえず、ADのデータベース情報が全部入ってるらしいntds.ditを取得する方針。ちなみに、本来robocopyとかでもってこれるはず？だけど他のプロセスが邪魔していて取れないらしい。
32. 以下のWriteupにあるちょっとしたバイパステクを使うと、シャドウコピーを作ってntds.ditを新しくコピーしてきて閲覧できるようになる。
33. ローカルにntds.ditとsystemを落としてきてimpacket-secretsdumpでダンプしてからAdministratorのLMハッシュでPtHしておわり。


## 総括
Writeupはこれが最高。↓  
https://juggernaut-sec.com/hackthebox-blackfield/#Dumping_Local_SAM_Hashes_with_SeBackupPrivilege