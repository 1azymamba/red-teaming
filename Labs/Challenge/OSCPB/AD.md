# AD machine

## Time
foothold = 5H  
privesc = 10H


※footholdディスコあり。

## 手順
1. rustscanをかけると、httpがあいていて、8000ポートと5559?が怪しそう。
2. responderで構えればURL入力からweb_svcの認証取得。
3. ドメインユーザのweb_svcを使ってbloodhound。sql_svcがkerberoastableなことが分かる。
4. sql_svcの認証が取得できる。ligolo-ngでms02につながるようにしてkaliからnmapするとmysqlが動いていることが分かる
5. sql_svcの認証をつかってms02のmysqlにつなげる

4. 取得した認証情報を使ってnxc sshすると、supportユーザがFreedom1でpwnできる。winrmのlocal authもうまくいく。
5. impacket-mssqlclient Administrator:Lab123@192.168.50.18 -windows-auth
