# rpcclient
SMB NULL Session等の、認証情報が無い状態からの端末アクセスと列挙が可能になる場合がある。  
  
## コマンド集
1. SMB NULL Sessionによって、資格情報なしで接続を確立する。
```
rpcclient -U "" -N 172.16.5.5
```

2. ドメイン内の全てのユーザとRIDのリストを出力する。
```
enumdomusers
```

3. ドメインユーザの詳細情報を取得する。
```
queryusers <rid>
```

4. 
```
enumlsgroups
```

5. 
```
builtin
```

6. 
```
enumdomgroups
```

7. 
```
setuserinfo
```

8. 
```
chgpasswd
```