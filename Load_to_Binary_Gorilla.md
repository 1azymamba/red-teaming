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

> [!TIP]
> 知らない命令を見かけたら、以下のx86に関するIntelのドキュメントを参照して調べられる。
http://www.intel.com/products/processor/manuals/index.htm

## ニーモニック一覧
ニーモニックとは以下のこと。**Instructions**の構成要素の一つで、 "ニーモニック" "オペランド"という形式で書かれる。オペランドには、レジスタやデータなどが書かれている。
mov
jmp
push
xor

![image](https://github.com/cyber-mamba/red-teaming/assets/96987448/57c93fa6-db91-4d15-9ca9-98eefdcbd237)
>[!TIP]
>xor, or, and, shl, ror, shr, rolといったニーモニックが繰り返し出てくるような関数にあたった場合、マルウェア解析においては暗号化処理の部分にあたっている可能性がある

> [!TIP]
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


# スタック

Last in First out (LIFO)で、x86はこのスタック構造をサポートしている。
レジスタは、ESPとEBPでスタック操作をサポート。
 - ESP => スタックポインタ
 - EBP => ベースポインタ 関数実行の際にローカル変数のメモリアドレスなどをオフセットとしてトレースできるように関数が始まるアドレスが格納される。
 - スタックではpush, pop, call, leave, enter, retなどのニーモニックがよく使われる。
 - 上位のメモリアドレスほどスタックの下へ。下位のメモリアドレス程スタックの上へ。0のアドレスに向かってスタックは伸びていく。
 - スタックはよく、ローカル変数、パラメータ、リターンアドレスを格納する。これらをEBPレジスタからのオフセットで参照する。
 - 引数は**push**でスタックの一番上に積まれる。
 - 関数は**call memory_location**のかたちで呼び出される。この時、その時点でEIPレジスタに保存されているメモリアドレスをスタックにpushする。なぜなら、callした関数の実行が終了した後に、元のメモリアドレスに戻る必要があるため。
 - 関数呼び出しの際は、ローカル変数とEBPレジスタ(ベースポインタ)の空間を確保するためにスペースがpushされる。
 - エピローグ。leave命令でESPとEBPを解放する。
 - 関数はret命令で元のアドレスに戻る。retは、関数call時にpushされていた戻りアドレスをpopしてEIPに格納する。
   ## プロローグとエピローグ
   ## スタックフレーム
   EBPとESPで関数の最上位メモリアドレスと再会メモリアドレスを指定。例：EBP = 0x12F03C, ESP = 0x12F028
   ![image](https://github.com/cyber-mamba/red-teaming/assets/96987448/06839449-1ab0-4080-ba83-379459b30aad)

## 条件付きジャンプ

   ![image](https://github.com/cyber-mamba/red-teaming/assets/96987448/788a9b25-e457-41d6-9ebc-b1ca4565902a)
   ![image](https://github.com/cyber-mamba/red-teaming/assets/96987448/bc0af24c-05c0-4b4e-9610-e8aaca047739)

# C言語の基礎
超シンプルなC言語のmain関数は以下になる。
argcはint型で、コマンドからプログラムを実行する時の引数の数とプログラムの名前を示す。argvは、コマンドラインから引数を入れたときの配列へのポインタを示す(?)
```.c
int main(int argc, char **argv
```

例：
```
filetestprogram.exe -r filename.txt

argc = 3
argv[0] = filetestprogram.exe
argv[1] = -r
argv[2] = filename.txt
```

```.c
int main(int argc, char* argv[])
{
    if(argc !=3) {return 0;}
    if(strncmp(argv[1], '-r', 2) ==0){
        DeleteFileA(argv[2]);

    }
    return 0;
}
```


# Reversing: Secrets of Reverse Engineering
## Chapter2
### 低レイヤ基礎
### アセンブリ言語
IA-32(Intel Architecture 32bit)では、以下の式で命令が一つずつ記述される。
```
Instruction Name(opcode) destination operand source operand
```
オペランドとなる値は大まかに以下の3つ。
1. レジスタ => EAXやEBXのような汎用レジスタの名称 例：**EAX**
2. Immediate => コードの中にハードコードされた文字列や定数を表す 例：**0x3000040
3. メモリアドレス => メモリアドレスは[]で囲まれる。 例：[0x4000349e] <- []で囲まれたImmediateなメモリアドレスは、グローバル変数である可能性がある。

>[!NOTE]
>上述されている文法は、IA-32の文法にのっとったもので、**AT&T**の文法とは異なる点に注意。大きく以下の点が異なる。AT&Tは主に、GNUなどのUNIX開発ツールで使用される。IntelはWindows向け。
> - destination operandとsource operandが逆
> - レジスタ名の先頭に%が付く。 例:%eax
> - IA-32でいう[]によるメモリアドレスの参照は、()として表記される。 例：%(ebx)　<-これで、EBXが指すメモリアドレス、という意味になる。
#### 基礎的な演算
1. ADD
2. SUB
3. MUL
    => 符号なしのEAXの数値を掛け算して、結果を64bitで保存する。保存先は**EDX:EAX** この意味は、下位32bitをEAXに保存して、上位32ビットをEDXに保存するという意味になる。IA-32では一般的な命令。
4. DIV
    => 符号なしの64bit値を割り算してEDX:EAXに符号なしで保存。商はEAX,余りはEDXに保存される。
5. IMUL
6. IDIV
#### 比較と条件分岐
1. CMP
2. ZF
    => 比較した二つのオペランドが等価だとセットされる
3. JNZ(jump if not zero)
    => ZFがセットされていない時に分岐先へジャンプする。実質**JNE(jump if not equal)**と同じニーモニック
   
#### レジスタ
- 汎用レジスタは8種類
  1. EAX
     整数、ブーリアン、論理といったメモリ演算に使用できる
  2. EBX
     整数、ブーリアン、論理といったメモリ演算に使用できる
  3. ECX
     演算にも使うが、繰り返し処理をするときのカウンタとしても使用される
  4. EDX
     整数、ブーリアン、論理といったメモリ演算に使用できる
  5. ESI
     メモリコピーにおいて、Source Indexとして使われることが多い
  6. EDI
     メモリコピーにおいて、Destination Indexとして使われることが多い
  7. EBP
     演算用の汎用的なレジスタとしても使われるが、スタックベースポインタとして使われることが多い。**ベースポインタ**は、ESPと一緒に使うことで、**スタックフレーム**を作ることができる。
  8. ESP
     CPUのスタックポインタを指す。現在のスタックの一番上のアドレスを格納しているので、スタックに値がpushされるたびにESPの値は更新される。
  >[!TIP]
  >これらのレジスタは**E**で始まっているが、これは**Extended**を表す。E系のレジスタは32bitのものだが、16bit Intelアーキテクチャの拡張版なので、Extendedがついている。
  >16bit IntelアーキテクチャではこれらのレジスタからEが外れて、AX, BX, CXのような名前だった。




### コンパイラ
現代ソフトウェアの99%はソースコードからコンパイラを使ってコンパイルしてからユーザに提供されている。
そのためリバエするときは、このコンパイラの挙動を把握することも重要になる。(コンパイラによってアセンブリに表示される挙動も変わる)
コンパイラに対する理解はオプションではなく**Must**らしい((+_+))
>[!NOTE]
>ここではコンパイラの表面しか扱わないので、ガチりたい人は以下を読むと良さげ
>[Cooper] Keith D. Copper and Linda Torczon. Engineering a Compiler. Morgan Kaufmann Publishers, 2004,
>[Muchnick] Steven S. Muchnick. Advanced Compiler Design and Implementation







