# SMBMap
[Documentation](https://github.com/ShawnDEvans/smbmap)

## 概要
sambaの共有ドライブの列挙が可能になるツール。  
具体的には**共有ドライブ、ドライブのパーミッション、共有されている内容、ファイル名**といった情報を列挙することができる。  

## コマンド
guestユーザでターゲットマシンを列挙する
```
smbmap -u guest -H <target IP>
```