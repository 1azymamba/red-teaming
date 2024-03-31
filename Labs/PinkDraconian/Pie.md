# Pie
[Pie](https://www.youtube.com/watch?v=2u0PbBVFIPc&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=31)

1. ターゲットのWebページにアクセスできるので、80ポートが空いているのがわかる.
2. Linuxで走っているらしく、adminページに認証なしで入れる。ターゲットがPieHoleを使っていることが分かり、バージョンは4.3.0とわかる。
3. searchsploitでpie holeの脆弱性を探すとRCEのPythonエクスプロイトが見つかる。
4. pythonファイルにセッションidを渡して実行してシェルを取る。この時点で既にrootで、権限昇格は必要なし。 