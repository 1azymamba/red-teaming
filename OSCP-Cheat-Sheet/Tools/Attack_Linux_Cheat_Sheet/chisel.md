# chisel
FWなどでリバースシェルができないときに、HTTPトンネリングすることでリバースシェルが取れるようになる、みたいなツール。

## コマンド集
1. chiselサーバをkaliに8080でセットアップする。
```
chisel server --port 8080 --reverse
```