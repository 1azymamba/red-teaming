# John the Ripper
[Documentation](https://github.com/openwall/john)

## コマンド集

1. ssh2johnで秘密鍵をjohn用のハッシュに変換した後、hashcatで作ったルールファイルをjohnの設定ファイルに追加する
```
sudo sh -c 'cat /home/kali/passwordattacks/ssh.rule >> /etc/john/john.conf'
```
なお、johnのルールセットには、john.confに以下のような行を頭に入れる必要がある。  
[List.Rules:sshRules]  
つまり、最終的には以下のようにしておく
[List.Rules:sshRules]
c $1 $3 $7 $!
c $1 $3 $7 $@
c $1 $3 $7 $#