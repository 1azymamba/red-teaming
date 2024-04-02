# Fuel
[Fuel](https://www.youtube.com/watch?v=cAVaHenL7s8&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=33)

1. 22と80が空いていて、80がおもしろそうなのでブラウザから見に行くと、FuelというCMSがv1.4で動いているのが分かる
2. searchsploitでfuelの脆弱性を調べると、RCEの脆弱性があるのが分かるので使ってシェルを取る
3. moiraユーザなので、とりあえず/home/moira/.sshからid_rsaのssh秘密鍵をcatで読み取っておく
4. sshでid_rsaを使ってもう一回moiraでアクセスして起き、シェルを安定させる
5. 権限昇格を狙う。.bash_historyがあるので、これを確認しておく。
6. .bash_historyで確認すると、sshpass -pでパスワードが平文で書かれていて、これを使ってrootに権限昇格できる。