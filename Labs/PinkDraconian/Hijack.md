# Hijack
[Hijack](https://www.youtube.com/watch?v=ZfVNIBM1zHY&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=4)

1. nmapで1000番ポートまでスキャン
2. バージョンが低いDrupalが走っているので、Public Exploitを調べる
3. レンダーに使われるarray配列に脆弱性があり、外部からRCEできることが分かる
4. whoamiでRCEできることを確認した後、msfvenomでリバースシェルファイルを作成
5. pythonでサーバ待ち受けし、POSTでcertutilをつかってターゲットにリバースシェルをダウンロード、実行させる
6. ncでシェルが取れるのが分かる
7. DLLハイジャックをつかってsystemに権限昇格