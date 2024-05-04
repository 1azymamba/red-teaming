# PSPY
[ドキュメント](https://github.com/DominicBreuker/pspy)
プロセスの監視ツールというかLinux用のプロセススパイツールらしい。  
用途としては、カレントユーザ以外のユーザ権限で実行されているプロセスのコマンドラインを確認することだそうな。
Kaliにデフォルトインストールされていないので、sudo apt instlall pspy -yでインストールする。  
使うときはターゲット上でwgetして/usr/share/pspyからバイナリをとってくる。

## コマンド集
1. 普通にターゲット上で実行
```
./pspy64
```