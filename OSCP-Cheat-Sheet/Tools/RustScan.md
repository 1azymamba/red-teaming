# RustScan
[ドキュメント](https://github.com/RustScan/RustScan/releases)
[Nmapとの比較記事](https://jpn.nec.com/cybersecurity/blog/220930/index.html)
- めっちゃ早いnmapみたいなやつ。
- UDPスキャンはできない。でもめっちゃ早い。

## コマンド集
1. Kaliにダウンロードしてインストールする。
```
wget https://github.com/RustScan/RustScan/releases/download/2.2.3/rustscan_2.2.3_amd64.deb
dpkg -i ./rustscan_2.2.3_amd64.deb
```

2. 全ポートをスキャンして開いてるポートのスキャンのみnmapに渡す。
```
rustscan -a 192.168.231.249 -- -A -sCV -Pn > rustscan
```