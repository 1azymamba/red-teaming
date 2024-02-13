# Cheat sheet of WinDbg

関数、変数名などのコードモジュールに関する情報を保持するファイルであるシンボルファイルがないとデバッグができない。
以下のコマンドでPDB(シンボル)ファイルを取得する。
```
.reload
```

シンボルの検索
xがexaminで、検索。 x notepad!wWin*のようにして正規表現も使える。
```
x [Options] Module!Symbol
```

ブレークポイントをはる
```
bu notepad!wWinMain
```

ブレークポイントがはられていることを確認する
```
bl
```

プロセスを開始する。このとき、ブレークポイントをはった部分まで実行される
```
g
```

モジュールの一覧を表示する
```
lm
```

プロセスをデタッチしてデバッグを終了する
```
qd
```

モジュール内のシンボルを一覧表示する
```
x notepad!*
```

## ドキュメント
WinDbg の概要 (ユーザー モード)
https://learn.microsoft.com/ja-jp/windows-hardware/drivers/debugger/getting-started-with-windbg



