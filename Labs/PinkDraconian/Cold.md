# Cold
[Cold](https://www.youtube.com/watch?v=D0lI12DUg7Y&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=12)

1. nmapでスキャン。ターゲットマシンでxamppのサービスが動いていて、そこにJetty?とかいうサービスが動いてるのが分かる
2. 調べるとサービスのデフォルトのadminログインページへのパスが書いてあるので、ログインページにアクセスする
3. admin adminでDev権限でアクセスできる
4. Webサービス入ったら、searchsploitで脆弱性を調べてWindowsサーバのシェルを取る
5. シェルでWinPEASを使ってDLLインジェクション？かなにかでサービスの悪用ができるのが分かる
6. 権限昇格しておわり