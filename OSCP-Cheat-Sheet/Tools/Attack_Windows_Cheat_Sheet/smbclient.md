# smbclient

## コマンド集

1. ターゲットマシンの共有ファイルが分からないときに共有フォルダをまず列挙する。-Uでユーザ名を指定し、%区切りでパスワードを入力
```
smbclient -L 192.168.203.227 -U nadine%123abc
```

2. ターゲットマシンの共有ファイルにアクセスする
```
smbclient -U nadine%123abc \\\\192.168.203.227\\<共有フォルダ>
```

3. ターゲットマシンの平文パスワードが分からないときに、NTLMハッシュをつかってPtH(Pass the Hash)を使ってアクセスする
```
smbclient \\\\192.168.50.212\\secrets -U Administrator --pw-nt-hash 7a38310ea6f0027ee955abed1762964b
```

4. SMBへの匿名ログイン
```
smbclient --no-pass -L <//targetIP>
```