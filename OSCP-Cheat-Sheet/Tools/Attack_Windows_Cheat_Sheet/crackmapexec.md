# crackmapexec
WindowsのAD環境に対して、列挙したユーザ名を使ったパスワードスプレーを実行できるツール。

## コマンド集

1. smbのIPを指定して、users.txt内のユーザ名に対し、-pで指定したパスワードのスプレーを行う。ドメインはcorp.comに設定。  
また、--continue-on-successで、有効な認証情報が最初に出た時に実行をストップせずスプレーを実行し続ける。  
ちなみに、出力に**Pwn3d!**が書いてあったら、そのユーザは管理者権限を持っていることになる。
```
crackmapexec smb 192.168.50.75 -u users.txt -p 'Nexus123!' -d corp.com --continue-on-success
```