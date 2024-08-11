# Frankfurt

## 手順
1. rustscanとferoxbusterをかます。色々Attack Surfaceが見つかって時間を溶かす。
2. rustscanの結果から、vesta cpが動いていることが分かる。vesta cpはauthenticated rceの脆弱性があるよう。
3. snmpwalkすると、ユーザ名とパスワードらしきものを平文で取得できる。それを使って8083ポートのVESTA CPにJackユーザでログインする。この時、jackではなくJackの大文字小文字区別がある点に注意。
4. VestaRoot.pyというのがGitHubで見つかるので、それを使ってシェルを取る。
5. 初めからrootなので権限昇格なしでおわり