# Twiggy

## Time
iniaccess = 45min  
privesc = 0min

※Writeupなし  
※iniaccessした時点でroot取れているのでそもそもprivesc必要なし

## 教訓
- 
- 

## 手順

1. いつものrustscan。22, 53, 80, 4505, 4506, 8000があいてた。
2. 22は大体違うので無視。53はわんちゃんあるけど攻撃したことないので無視。とりま80と8000をffufしながら手動調査。
3. 8000はエンドポイントAPIっぽいレスポンスが返ってきてた。よう分からんがffufしとく。80もffufしとく。
4. 80はNginx1.16.1っぽい。でぃぐった感じぱっとみpublic exploitはなし。そこまで簡単じゃない。
5. webからの攻撃が無理そうなら、4505と4506が怪しい。あんま見ないポート。public exploitをでぃぐる。
6. なんか出てきて、salt stackみたいなやつのexploitでrceできるらしい。salt stackがzeromqとかいうのを使うためにこのポートを開けるそうな。
7. salt stackのバージョンが分かってないけどわんちゃんありそうなのでとりまexploitを試す。
8. exploitコードの中にvulnerability checkのオプションがあったのでとりまそれをやってみたらvulnerable判定だった。これでいけそう
9. ちょっとexploitを修正して動くようにしてからrce成功。privescするぞと思ったらiniaccessした時点でrootだったのでこれで終わり。簡単だった。

## 総括
- 勤務前の爆速1時間以内クリア👏
- 珍しくノーヒントで行けたのも良かった。けど簡単すぎるマシンだったのでまだOSCPレベルじゃない。