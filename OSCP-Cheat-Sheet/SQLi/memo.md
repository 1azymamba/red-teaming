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