# Hutch

## Time
iniaccess = 35min  next => impacket-GetNPUsersによるAS-repのパスワードスプレー
foothold = 
privesc = 

※AD系ダメなのでいったんストップ。THMやってからもういっかい。(5/18)

## 教訓

## 手順
1. ldapsearchをする。
2. 認証情報を取得したら、cadaverというwebdav clientツールを使ってiisのポートに接続して認証を通す。
3. aspxのウェブシェルをPUTしてfoothold獲得。
4. 認証情報がありDCに接続もできるので、bloodhoundを実行できる。取得したドメインユーザがLAPSの読み取り権限があることが分かる。
5. Kaliからnxcを使って-MのようなLAPS読み取りモジュールを使う、もしくはウェブシェルをcasverからアップロードするというやり方がある。
6. ウェブシェル越しに、ファイルをPUTしたパスを特定する。
7. 安定用のpayloadをアップロードして、ウェブシェルコマンドからファイルパス上のペイロードを実行してシェルを取る。
8. LAPSがProgram Filesにインストールされていることが確認できる
9. ldapsearchで、最初に取得した認証情報尾渡すと管理者のパスワードを取得できる。
10. psexecで管理者の認証情報を渡して終わり

## 総括