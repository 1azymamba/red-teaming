# Command Prompt

1. ホスト名\ユーザ名をターゲット上で取得する
```
whoami
```

2. シェルを取っている端末のユーザがどこのグループに属しているかを確認する。現在のユーザが属するグループをすべて表示する。
```
whoami /groups
```

3. 他の全てのローカルユーザのリストを取得する
```
net user
```

4. ホスト上の既存のグループを列挙する
```
net localgroup
```

5. OSのバージョンとアーキテクチャを取得する
```
systeminfo
```

6. 全てのネットワークインターフェースを表示する
```
ipconfig /all
```

7. 全てのルーティングテーブルを取得する
```
route print
```

8. 全てのアクティブなネットワーク接続のリストを取得する。  
-a => 全てのアクティブなTCP接続とTCP、UDPポートを表示する。
-n => 名前解決を無効にする  
-o => 各接続のプロセスIDを表示する
```
netstat -ano
```

9. バイナリに対応するプリンシパルとアクセス許可を出力する
```
icacls "C:\xampp\apache\bin\httpd.exe"
```
icaclsの権限は以下の通り  
MASK	PERMISSIONS  
F	Full access  
M	Modify access  
RX	Read and execute access  
R	Read-only access  
W	Write-only access  

10. Unquoted-Serviceの脆弱性がある可能性のあるサービスとバイナリファイルのパスを列挙する。
```
wmic service get name,pathname |  findstr /i /v "C:\Windows\\" | findstr /i /v """
```

11. スケジュールされているすべてのタスクを確認する。  
/fo => 引数にLISTを渡してリスト形式の出力を得る  
/v => タスクのすべてのプロパティを表示する
```
schtasks /query /fo LIST /v
```