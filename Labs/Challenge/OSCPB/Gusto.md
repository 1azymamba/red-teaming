# Gusto

## Time
foothold = 50min
privesc = 3.5h

※privescで泣きのディスコちらみ( ；∀；)

## 教訓
- ファイル書き込みがそのままダメでもリネームしなさい。フォルダに書き込みできるならサービスバイナリハイジャックいける。

## 手順
1. OSCP落ちたばっかりなので、Standaloneがんばろってなってるなう。
2. 特にWeb enumerationを丁寧にやる。ので、これまでとアプローチを変えて、rustscanからWebを見つけたらferoxbuster。--depth は2, or 3で。
3. IISのポート80は面白いもの見つからず。8021で変なapiレスポンスらしきものを見つける。
4. rustscanの出力にも書いてあったサービスで、FreeSwitchってやつらしい。
5. 一応APIエンドポイントの探索もferoxbusterとffufでやるが、応答が200じゃないので探索できず。今回はあまり活躍しなかったが、ここで使うWordlistsを毎回SeclistsのGitHubでちゃんと調べるのが大事と見た。
6. FreeSwitchの脆弱性を調べるとすぐに簡単そうなPoCが見つかる。ターゲットのバージョンはわからないがとりあえずぶっ放すとRCE成功して初期シェルを割と簡単にゲット。
7. 権限昇格を目指す。winpeasをとりま実行。バージョンが対応していないらしくうまく動かない。
8. 使ったことないが試しにPrivescCheckというPowerShellのスクリプトをｷﾞｯﾊﾌﾞから落として使ってみる。
9. HTMLでの出力ができたり結構要点だけ書いてあったりで割と良さげ。その中で、SeImpersonateLinkとサービス書き換えらしきものが見つかる。
10. まずはSeImpersonateLinkから試す。バージョンや5985使ってなさそうなところから、WinRMRogueかprintspooferが動きそうだったがなぜか失敗。
11. 諦めてサービスの方を調べる。KiteServiceとFreSwitchが怪しい。KiteServiceはサービスのリスタートができたものの、ファイル名そのままでKaliからコピーしようとしたら上書きできません見たいなの言われて終わる。
12. え、書き込み権限ねえのかよとなりでぃすこをチラ見する。
13. 普通にバイナリリネームはいけたらしい。そんなことも考えつかなかったなんて、、と萎えながらリネームしてからバイナリ名そろえて落としてsc stop sc startして終わり。

## 総括
- 比較的簡単だったはず。