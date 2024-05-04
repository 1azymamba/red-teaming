# SQLのメモ
## 基礎的な仕組み
- 縦と横にデータが入ってる。Excelみたいな。
- 縦のデータを**カラム**と呼び、横のデータを**レコード**と呼ぶ。
- カラムとレコードからなるデータを**テーブル**と呼ぶ。

## クエリ
### SELECT
- データベースからデータを取得するために使用する。
- SELECTを使うと**どのカラムのデータを取得するか**を選べる。

```.sql
SELECT name
```

- カラムは以下のようにして区切ることで、複数のカラムからデータを取得できる。
```.sql
SELECT name, price
```

- 正規表現みたいにすればすべてのカラムからデータを取得できる。
```.sql
SELECT *
```

### FROM
- DBには複数のテーブルが存在する場合がある。
- SELECTで選んだカラムが**どのテーブルのカラムか**を指定する。

- 以下では、purchasesテーブルのnameカラムにあるデータを取得する。
```.sql
SELECT name
FROM purchases;
```

### WHERE
- SELECTでカラムを、FROMでテーブルを指定した。WHEREでは**レコードを指定できる**。
- 以下のように、categoryカラムが"hoge"であるデータを取得するようにできる。
- ここの"hoge"は文字列だが、データ型を指定する必要がある。
```.sql
WHERE category="hoge"
```

```.sql
SELECT *
FROM purchases
WHERE category="hoge"
```




## データ型
- SQLにおけるデータ型はとりあえず3つ覚えておくべき。
1. テキスト。 
"hoge"みたいな。ダブルクオーテーションかシングルクオーテーションで囲めばおｋ
2. 数値。  
10みたいな。囲まなくておｋ
3. 日付  
"2024-05-01"みたいな。クオーテーションで囲まれた日付(年・月・日)

## 比較演算子
- <=とかで1000円以上の弁当、とかの指定ができる。
```.sql
SELECT * FROM purchases WHERE price=1000;
```

- =を使うと、完全に一致するデータを取得する。
```.sql
SELECT * FROM purchases WHERE name="Pudding";
```

### LIKE演算子
- WHEREとかを使うときに、**ある文字を含むデータ**という指定ができる。
```.sql
SELECT * FROM purchases WHERE name LIKE "hoge";
```
- また、LIKE演算子はワイルドカードとして%を使える。これで、Puddingという文字列を含むレコード指定になる。
```.sql
SELECT * FROM purchases WHERE name LIKE "%Pudding%";
```

### NOT演算子
- NOT演算子を使うと、●●を含まないデータという指定ができる。

```.sql
SELECT * FROM purchases WHERE NOT price > 1000;
```

### AND演算子
- WHERE 条件 1 AND 条件 2みたいにして、条件を複数合致したデータだけ取得、もできる。
```
WHERE price = 1000 AND AND name = "hoge";
```

### OR演算子
- ANDみたいなもん。

## NULLの扱い
- データが入っていない場所は**NULL**と呼ばれるデータになる。
- **IS NOT NULL;**とすると、指定したカラムのデータがNULLじゃないもの、ということになる。
```.sql
WHERE price IS NOT NULL;
```

- NULLでは、**WHERE price = NULL;**のように=を使えない。

## ORDER BY
- データの並び替えができる。
- ～順に並べる、っていうのができる。
- ORDER BY 並べ替えたいカラム名 並べ方; っていう書き方。
- **ASC**で昇順。**DESC**で降順。

```.sql
ORDER BY price DESC;
```

## LIMIT
- LIMITで、**最大何件取得するか**を指定できる。
- 検索結果の上から指定されたデータの件数だけ取得する。
```.sql
SELECT * FROM purchases LIMIT 5;
```

## DISTINCT
- **DISTINCT (カラム名)**で、重複したデータを省くことができる。

```.sql
SELECT DISTINCT(name) FROM purchases;
```

## 四則演算
### 足し算
- カラム名 + 111
### 引き算
- カラム名 - 111
### 掛け算
- カラム名 * 111
### 割り算
- カラム名 / 111

## 集計関数
- 四則演算的なのを簡単に行える組み込みの関数。
### SUM
- SUM(カラム名)で、合致したカラムのデータを合計した値を取得できる。
- 以下は、purchasesテーブルからpriceというカラムを指定し、priceカラムに合致したデータをすべて合計した値を取得する。

```.sql
SELECT SUM(price) FROM purchases;
```

### AVG
- AVG(カラム名)で、合致したカラムのデータを平均した値を取得できる。
```.sql
SELECT AVG(price) FROM purchages;
```

### COUNT
- COUNT(カラム名)で、合致したカラムのデータの数を変えることができる。
- なお、NULLのデータはカウントされない。
```.sql
SELECT COUNT(price) FROM purchases;
```

- NULLのデータをカウントしたくない場合は、COUNT(*)で
```.sql
SELECT COUNT(*) FROM purchases;
```

### MAX
- MAX(カラム名)で、カラムの中で最も大きい値を取得できる。
```.sql
SELECT MAX(price)
```
### MIN
- MIN(カラム名)で、カラムの中で最も小さい値を取得できる。
```.sql
SELECT MIN(price);
```
## GROUP BY
- GROUP BY カラム名で、そのカラムで同じ値のものは同じグループとして扱われる。
- GROUP BYを使っている場合、SELECTでは、集計関数とGROUP BYで指定しているカラム名しか指定できない。
```.sql
SELECT SUM(price), name FROM purchase
GROUP BY name;
```
### 複数カラムでのGROUP BY
- 複数カラムでのグループ化も可能。
- GROUP BY カラム名1, カラム名2のようにして書く。
```.sql
GROUP BY name, purchased_at
```

### HAVINGによるGROUP BYしたデータの条件指定
- GROUP BYの後ろに**HAVING**を使うと、GROUP BYしたものを条件指定できる。
```.sql
GROUP BY purchased_at HAVING SUM(price) > 1000;
```

## サブクエリ
- クエリの中に他のクエリを入れることができる。このほかのクエリのことをサブクエリと呼ぶ。
- 2つ以上のクエリを一つにまとめられるので、より複雑なデータを取得するときとかに使えるぽい。
- サブクエリは()で囲う。また、サブクエリ内はセミコロンが不要。



## AS
- カラム名等に別名を付与することができる。
- **カラム名 AS "名前"**の構文。

```
SELECT goals AS "ウィルの合計点"
FROM players
WHERE name="ウィル";
```

## JOINによるテーブルの結合
- 2つのテーブルをJOINによって結合することができる。
- **ON**で条件を指定し、テーブルAにテーブルBを結合する。
- 結合したテーブルは1つのテーブルとしてデータを取得できる。

```
SELECT *
FROM tableA
JOIN tableB
ON tableA.カラム名 = tableB.カラム名
```

### 複数テーブルでのカラム指定
- JOINすると、同じカラム名がそれぞれのテーブルに存在することがある。
- このような場合は、tableA.name, tableB.nameというように指定する。
- JOINでは外部キーのNULLのレコードを取得されない。
- JOINで外部キーのNULLレコードを取得したい場合は**LEFT JOIN**を使う。

### LEFT JOINによるNULLの取得
- LEFT JOINを使うと、FROMで指定したテーブルのてコードを、NULLも含めてすべてJOINさせることができる。

### 3つ以上のテーブル結合
- 結合したいテーブルが3つ以上ある場合は、JOINを複数回実行することで結合が可能になる。
- JOINは一つのクエリで複数回実行できるが、FROMは一度だけ実行するという点に注意。