# Hermes
## Time
Ini Access = 4H 40min  
PrivEsc = 1H 50min  
※両方ディスコあり

## 教訓
- Public Exploitの実行は丁寧に。コード丁寧に読んで自分がしくってるのかバージョン一致しない環境問題なのかをチェックする。
- UDPスキャンも絶対やっとけ。
- TryHackMeのPrivEscがめっちゃ使える。やっとけ。
- WinPeasと併用して手動列挙もやっとけ。

## 手順
1. とりまnmap。この時はTCPスキャンだけやったがUDPスキャンもやった方が良い。21, 80, 135, 189, 445, 1978があいてる。
2. 21のFTPの匿名ログインできるのでやってみる。passive modeみたいになっててファイル見れないのでしばらくやって止める。
3. 次に80ポートの手動列挙しながらffufする。ffufでも大したサブディレクトリが出てこず。手動列挙でもIISってことはわかるがその他変なソフトとかなさそうだった。とりまターゲットがWindows OSってことだけわかる。あと、wappalizerでIISは10.0とわかる。
4. Webからの攻撃一旦あきらめて135からRPCの匿名ログオンを試すが無理。
5. 次に445も空いてるのでSMBに匿名アクセスできるか試すがこれも無理。smbclient --no-pass -L \\IPやる。
6. 最後の頼みの綱、1978ポート、ディぐったらMouse Serverとかいうやつらしい。
7. Mouse Serverの脆弱性見るとsearch sploitでもぐぐーるでもRCEがヒット。これやろ、、！！
8.  試すも引数の渡し方ミスってるのに気づかずディスコを見てしまう。
9. snmp見ろって書いてあった。UDPスキャンしていなかったのでUDPスキャンすると確かに某ポートでsnmpが動いてる。
10. snmpをディぐってるとsnmpの書き込みからRCEに行けるぽいことが分かる。mosue serverじゃなくてsnmpからシェル取るのかあと思って色々やるけど実はrabbit hallで時間を溶かす。
11. 結局snmpからmmouse serverの正確なバージョンが見えるよっていうだけで、Ini Accessは結局mosue serverの脆弱性をつかうっぽい。
12. もっかいちゃんとMouse ServerのExploitをいじくって引数ちゃんとやったらshellとれた。
==========
  
13. 時間とかしすぎて疲れたので、多少自分のcheet sheat見てダメだったのが分かってからディスコ見た。
14. めっちゃ簡単ぽくて、WinPeas走らせると認証情報が書いてあるっぽい。pspyのやつ。
15. 手動列挙でreg queryしてレジストリからpspyに設定されてるプロキシへの認証情報が取得できる。
16. Administratorsグループに入ってるユーザの認証情報が取れるのでそれでproof.txtとれる。
17. ちなみにreg queryのやつはTryHackMeで紹介されてるやつそのまま使える。THMは予習しとこう。おわり。