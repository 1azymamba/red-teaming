# Gaara
## Time
Ini Access = 50min  
PrivEsc = 20min  
※どちらもヒントあり

## 教訓
- small.txtでディレクトリスキャンが何も出ないときはmedium.txtｍ試すこと。
- SSHのパスワードがどうしてもわからない場合は一応hydraでsshのブルートフォースも試すこと。
- SUIDがbinaryにセットされているかはすべてチェックし、手動でGTFObinを必ず一つ一つチェック&試すこと。


## 手順
1. まずはrustscan。22と80があいてる。
2. sshの方はいったん無視。80を見に行くが我愛羅の写真があるだけ。ffufでsmall.txtを回すが何も出ず。
3. Easyなはずなのに何も出なくて時間溶かしてももったいないのでWriteupを見に行く。medium.txtを使わないとヒットしないっぽい。medium.txtでffufするとディレクトリが見つかり、そこを見に行くとヒントがある。
4. 更にディレクトリがあるが、馬鹿長いテキストがあり、そこから頑張ってpassword hashらしきものを見つける。base58とかいろいろ試すと難読化解除ができるがこれはsshのパスワードじゃないっぽい。
5. どうにもならないのでhydraでsshをブルートフォース。ユーザ名はgaara
6. ブルートフォースでクラックできてしまう。とりまIniAccess獲得。
7. いつものfind / -perm -u=s -type f 2>/dev/nullでSUIDチェック。gimpとgdbとかいうやつがGTFObinでヒットする。
8. gimpはうまく動かないがgdbが動く。これでrootに昇格して終わり。

## 総括
CTF nonsenseとはこのことでは。