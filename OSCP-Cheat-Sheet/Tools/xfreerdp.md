# xfreerdp

WindowsマシンへのKaliからのrdp接続などで使用できる。  
  
## コマンド例
基本的な接続
```
xfreerdp /u:offsec /p:lab /v:192.168.249.196:<port>
```

2. 高速でつなげてクリップボードと共有フォルダ付き。
```
xfreerdp +clipboard /drive:/ctf/tmp/share -fast-path +bitmap-cache /network:auto /dynamic-resolution /compression-level:2 /u:<user> /p:<pass> /v:<IP>
```

3. stephanieとしてドメインを指定してRDPする。
```
xfreerdp /u:stephanie /d:corp.con /v:192.168.241.75
```