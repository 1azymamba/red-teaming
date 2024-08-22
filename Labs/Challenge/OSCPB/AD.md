# AD machine

## Time
foothold = 5H  
privesc = 10H


※footholdディスコあり。

## 手順
1. rustscanをかけると、httpがあいていて、8000ポートと5559?が怪しそう。
2. webのディレクトリをferoxでcommon.txt使ってスキャン。DBとchangelogみたいなのが見えるのでダウンロード。
3. ローカルのsqlite viewerみたいなツールで見る。すると、ユーザ名とパスワードが手に入る。
4. 取得した認証情報を使ってnxc sshすると、supportユーザがFreedom1でpwnできる。winrmのlocal authもうまくいく。
5. 