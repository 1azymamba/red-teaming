# Gobuster
[Documentation](https://github.com/OJ/gobuster)

Goで書かれた**ディレクトリブルートフォースツール**

Web上で実行されているアプリケーションを発見した後、パブリックからアクセス可能なすべてのファイルとディレクトリを特定(マッピング)することが重要になる。
GobusterではWordlistを使用してサーバ上のディレクトリとファイルを検出できる。

> [!NOTE]
> ブルートフォースなので大量の通信が発生することに注意!

## コマンド集

-u => ターゲットIPを指定
-w => ワードリストの指定
-t => 実行時のスレッドを設定(デフォルトでは10)

dirモードでの一般的なスキャン
```
gobuster dir -u <target IP> -w /usr/share/wordlists/dirb/common.txt -t 5
```

