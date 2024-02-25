# Python Cheat Sheet

## 組み込み関数
Pythonの組み込み関数は思ってたよりも少ないので頑張って覚えろ。
以下に全ての組み込み関数のドキュメントがある。
https://docs.python.org/ja/3/library/functions.html

### Open関数
概要：
対象ファイルのパスを引数に渡すことで、ファイルの編集や上書などができる。
ファイルの操作が終わったら**close()**メソッドでファイルを閉じる必要がある。

引数は以下の3種類だけ。
1. file => 相対パスと絶対パスどちらも使える
2. mode
  - r => 既存ファイルを読み込みモードで開く。モードを引数に渡さなかった場合はデフォルトでrモードになる。
  - w => ファイルを書き込みモードで開く
  - x => 新規ファイルを書き込みモードで開く
  - a => ファイルを書き込みモードで開く
  - rb, wb, xb, ab => 通常のモードにbをつけるとバイナリの書き込みや読み込みができるようになる。
3. flags

基本的な使い方の例
```.py
open(<file_path>, mode=<mode>, encoding=<char_code>
```

withを使ったopen()関数の応用

1. with文を使うことで、処理が終了した際に冒頭で指定した設定を開放(元に戻す)ことができる
```
path = r'hoge\hoge.txt'
with open(path) as f: # open関数で開いたファイルの中身をfに格納
  print(f.read()) # fの中身を表示
```

2. 1行ずつファイルの中身を読み込む
```.py
path = r'hoge\hoge.txt'
with open(path) as f: # oepn関数で開いたファイルをfに格納
  for line in f: # 1行ごとにlineという変数に保持して以下の処理を実行
    print(line) # lineの中身を行ごとに表示
```

### csv関数
