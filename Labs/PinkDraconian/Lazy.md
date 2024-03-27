# Lazy
[Lazy](https://www.youtube.com/watch?v=SqpWNgsR1TM&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=24)

1. 22, 445, 80が空いている。sambaのバージョンも見えているので、searchsploitで脆弱なバージョンか確認する
2. パイプ名で任意のモジュールロードという脆弱性があるようだが、ここではまだ脆弱性のエクスプロイトは実施しない
3. crackmapexecでsmbを使い、匿名ログインがsambaに対して可能かをチェックする
4. ユーザ名、パスワードなしでログインできた
5. Publicフォルダに読み取りと書き込みの権限があるのが分かる
6. known_pipenameを書き込んでrootのシェルが取れる