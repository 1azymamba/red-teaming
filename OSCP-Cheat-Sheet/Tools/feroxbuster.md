# feroxbuster
- [NECのブログ](https://jpn.nec.com/cybersecurity/blog/220513/index.html)では、FFUFと比較されている。
- FFUFはディレクトリスキャンだけでなくパラメータに対してもファジングできるのに対し、feroxbusterはディレクトリスキャンに特化している。
- ディレクトリスキャンの一点においてはFFUFより良い時もあるかも。？

## コマンド集
1. 再帰的にサイトをスキャンする。
```
feroxbuster -u http://240.0.0.1:8000 -w /usr/share/seclists/Discovery/Web-Content/big.txt -o ferox_result
```