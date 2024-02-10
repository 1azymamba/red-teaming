> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

# What's this
**バイナリゴリラ**は、バイナリ解析がめっちゃできる人間のことです。
本書では、**push ebp**も分からない状態から初めてのBuffer Overflowの脆弱性を突いたC言語のエクスプロイトを書けるようになるまでを目標にしたドキュメントです。

## 必要な事前経験
本書を理解するために、以下が事前経験として求められます。
- C言語でHello Worldをしたことがある
- 何らかの言語でプログラミングをしたことがある
- コンパイル、デコンパイル、ディスアセンブルの単語を理解している

# コンパイルとデコンパイル


# アセンブルとディスアセンブル

アセンブリ言語
```
push ebp
mov ebp, esp
sub esp, 0x40
```

## ニーモニック一覧
ニーモニックとは以下のこと。オペコードとも呼ばれていてCPU(プロセッサ)に対して何を指せたいかの命令を表す。通常は16進数？
mov
jmp
push




















