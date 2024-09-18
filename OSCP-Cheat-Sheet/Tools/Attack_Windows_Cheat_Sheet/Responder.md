# Responder
ローカルの管理者権限(SYSTEM権限)を取得できておらずMimikatzを使えない状態で、Net-NTLMv2を取得して横展開するときなどに使える。  
Net-NTLMv2はSMBにアクセスするときにハッシュを送信するため、ネットワークのパケットをキャプチャするとハッシュを取得できる。  
  
responderがキャプチャした情報は画面に出力される。また、/usr/share/responder/logsディレクトリにあるホストごとのログファイルにも結果を書き込む。  
  
一般的な攻撃シナリオでは、内部に侵入したらホスト上でresponderを走らせておいて、その間に他のenumerationを進めておくものらしい。

## コマンド集

1. Net-NTLMv2ハッシュを取得するため、SMBを立ち上げてパケットをキャプチャする
```
sudo responder -I tun0
```  
クライアント側からは、//192.168.205.4/hoge.phpのようにして指定できる。ターゲットがWindowsマシンならNTLM取得もできる。


2. 
-wf => WPAD不正プロキシサーバを使う。一般的に毎回使用されるフラグらしい。  
-f => リモートホストのOSとversion情報のフィンガープリントを試行する。  
-v => verbose  
-w => 組み込みのWPADプロキシサーバを利用する。Internet Explorerを起動するすべてのユーザによるすべてのHTTPリクエストを補足するらしく、大規模環境で非常に有用。
```
sudo responder -wf -I tun0
```