# fping
pingと大体一緒。ICMPのリクエストをホストに送ってホストとのアクセスができるかをチェックする。  
ping異なる点として、fpingは複数のホストのリストに対してICMPを一度に送ることができスクリプトとして使いやすい。  
CIDRで指定して通信できるホストを把握するのに役立つ。  

  
## コマンド集
1. -a アクティブなターゲットを表示する。  
-s スキャンの終了と気に統計をprintする。  
-g CIDRでネットワークからターゲットリストを生成する。  
-q ターゲットごとの結果を表示しない。  
```
fping -asgq 172.16.5.0/23
```