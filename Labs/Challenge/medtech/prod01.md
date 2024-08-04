# PROD01

## 手順
1. DEV04を侵害しているのが前提。
2. DEV04でADMINとっていたらそのままmimikatzでleonがsessionを持っているのが分かり、平文パスワードrabbitを取得できる。
3. nxc smbでprodにドメインでスキャン掛けたらPwn3d!するのでimpacket-psexecでログインして終わり。(rabbitの特殊文字タイポでめちゃ時間溶かした。。。)