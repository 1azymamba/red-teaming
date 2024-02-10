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
コンパイラでコンパイルすると、C/C++といった高級言語がマシンコードに変換される。
このマシンコードをインプットしてIDAやGhidraなどのディスアセンブラを使ってアセンブリ言語を生成するプロセスがディスアセンブル


# アセンブルとディスアセンブル
高級言語からコンパイルされたマシンコードからアセンブリ言語を生成できる。マシンコードはアセンブリ言語のもう一つ下のレベルの言語。
16進数なので理解するのは難しい。
アセンブリ言語
```
push ebp
mov ebp, esp
sub esp, 0x40
```
> [!NOTE]
> アセンブリは、C言語などの高級言語で書かれたソースコードにアクセスできない場合に復元して読むことができる、最も高いレベルの言語。低レベルではマシンコード、マイクロコード、ハードウェアというのもあるが、ここは人間が理解するにはハードルが高い。

## ニーモニック一覧
ニーモニックとは以下のこと。**Instructions**の構成要素の一つで、 "ニーモニック" "オペランド"という形式で書かれる。オペランドには、レジスタやデータなどが書かれている。
mov
jmp
push

![image](https://github.com/cyber-mamba/red-teaming/assets/96987448/57c93fa6-db91-4d15-9ca9-98eefdcbd237)


> [!TIPS]
> Randall Hyde's氏著の**The Art of Assembly Language, 2nd Edition**は、x86アセンブリに馴染の無い初学者向けの良本

# x86アーキテクチャ

まずは現代のノイマンコンピュータの内側を復習することが必須((+_+))
![image](https://github.com/cyber-mamba/red-teaming/assets/96987448/7a7fa429-936d-49b5-83b9-c4f75c6b44bc)

- CPU
 - Control Unitはレジスタを使っていて、RAMから受け取った命令を実行する。この時、Control Unitは受け取る命令を**Instruction Pointer**で参照して、このポインタに書かれてるRAMのアドレスから命令を取ってくる。
 - ALU (arith metric unit)は、RAMから取ってきた命令を実行し、実行の結果をレジスタかメモリに保存する役割を持つ。

# Main Memory(RAM)
![image](https://github.com/cyber-mamba/red-teaming/assets/96987448/f9eb88da-5257-4b85-93e3-9170ebf95aba)

 RAMは大まかに以下の領域で構成される。
 - Data.
  データセクション。プログラムがロードされたときに設定される値を含んでいる。Data.セクションにある値はStatic valueとも呼ばれていて、Static valueはプログラムの実行時に値が変更することがない。より分かりやすく言えば、このData.セクションに含まれている値はグローバル変数であり、プログラム内のどこからでも参照される値が格納されている。
 - Code.
   プログラム実行のためにCPUがRAMから命令をフェッチする際、その命令がこのCode.セクションに含まれている。
   実際にプログラムの動きを決めている部分なので大事。
 - Heap.
   プログラム実行に伴って動的に値を作成したり削除したりするときに使われる。
   Heap領域に格納されている値はプログラム実行時に頻繁に変更されるため、**dinamic memory**とも呼ばれる。
 - Stack.
   スタック領域は、関数実行時のローカル変数やパラメータのコントロール等で使われる。Buffer Overflowを目指すには深い理解が必須。
> [!NOTE]
> 上の図では順番にData. Code. Heap. Stack.となっているが、これらは必ずしもこの順番で並んでいる必要はない。実際にはメモリ全体にこれらのセクションが配置されていればいいので、順番が異なることはあり得る。


















