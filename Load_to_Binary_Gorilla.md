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


mov命令の基本
![image](https://github.com/cyber-mamba/red-teaming/assets/96987448/1691f31d-bc13-45c5-bb0f-7c2e43684800)
> [!NOTES]
> movに似たものとして**lea**(load effective address)がある。これもコピーだが、メモリ内の値ではなくメモリアドレスそのものをコピーする点に注意。

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





# 用語集
- オペコード => operation codeのこと。16進数で表されていて、CPUに何をしてほしいかが書いてある。オペコードは以下のように記述される。
  以下のB9...の部分がオペコード。movの方はアセンブリ言語に翻訳されたもの。
  ```
  Mnemonic Destination operand Source operand
  mov ecx, 0x42
  B9 42 00 00 00
  ```
  ![image](https://github.com/cyber-mamba/red-teaming/assets/96987448/f6583a09-7a04-47c1-ae92-2db3423595ea)

- **リトルエンディアン** => x86はリトルエンディアンを使っている。リトルエンディアンはバイトを逆順で表す。x86はリトルエンディアンだが、ネットワークではビッグエンディアンなので、マシンコードを逆順に変換する作業が発生する点に注意。(IPアドレス等)
- **オペランド**
  => これは命令の中でデータを特定するために使われる。オペランドには以下の3種類がある。
  - Immediate operands => 0x42のような値
  - Register operands => ecxのような、レジストリを表す値
  - Memory address operands => [eax]のように、かっこで囲まれた値、レジスタ、または式で表され、目的値のメモリアドレスを指す。

- レジスタ <= 重要！
  => 実行速度が速いがデータ許容量の小さいストレージのこと。CPU上に存在し、CPUから直接アクセスするので速い。以下の4種類がある。

  1. General Registers
     => データとメモリアドレスを格納している。日本語だと汎用レジスタと呼ばれる。汎用レジスタは全て32bitで構成される。
     => レジスタごとに役割が決まっているものも多く、それらを知っておくと幸せになれる。
     例：EAXは関数の戻り値が格納される。乗除算命令にはEAXとEDXを使用する。etc...
  3. 
  >[!TIPS}
  >EIPについて => Instruction Pointerで、CPUに実行を命令するメモリアドレスを指す。この指しているアドレスに格納されているコードが壊れてると実行に失敗してクラッシュする。

  
  











