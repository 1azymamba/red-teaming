# CMS
[CMS](https://www.youtube.com/watch?v=nnlfJbFKt2Y&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=9)

1. nmapでApacheサーバであることが分かるのでブラウザからアクセス
2. WordPressを使っていること分かるので、wpscanでプラグインの脆弱性が無いかチェック
3. 少し調べると、SplitzというプラグインにLFIの脆弱性があり、そこからRCEにつなげらることが分かる
4. /etc/passwdを見て、そこのuidと/procの内容から、ターゲットのWebサーバがAngelユーザで実行されているらしいことをuidより確認
5. sshのid_rsaは秘密鍵で、これを/home/angel/から取得
6. angelユーザとしてsshで接続
7. angelユーザでidコマンドを実行すると、angelがsudoのグループになっていることが分かる
8. sudo /bin/bashを実行することでrootへの権限昇格が可能
