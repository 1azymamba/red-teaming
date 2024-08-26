# Access
Difficulty = Intermediate (However, community rated this machine as very hard)

## Time
iniaccess = 1H
privesc = むずくて一旦ストップ。THMでADモジュールやったら戻ってくる。

※Writeupあり

## 教訓
- Webのファイルアップロードできないか要チェック。全ボタンをクリックすること。
- .htaccessをアップロードできる場合、そこから.phpファイルを許可するなどのバイパス手法が使える。
- AD攻撃はムズい。SPNとかの用語復習をすること。

## 手順
1. まずはrustscanとferoxbuster。80のポートで、チケットの購入画面からファイルのアップロードができるよう。デフォルトではphpファイルのアップロードが制限されていて、マジックナンバーの使用や拡張子のPhp、pHpといったバイパスもできず。逆に、phpファイル以外のものは割と何でもアップロードできる。
2. .htaccessで.pwn拡張子をphpファイルとして読み込むように指定して、作成した.htaccessファイルをアップロードする。.htaccessは、そのディレクトリの下のサブディレクトリに適用される。
3. .pwnの拡張子にphpのリバースシェルを書き込みアップロード成功。/uploads/hoge.pwnにアクセスしてfoothold獲得。
4. この時点ではsvc_apacheの低い権限のみ。privesccheck.ps1するとサービスバイナリハイジャックできるぽいが、権限がsvc_apacheのままなのでやっても意味がない。
5. 同じ端末がDCとして動作していることが、ポート88が開いていることからもわかる。svc_mssqlに対してkerberoastingが可能と推測し、Get-SPN.ps1スクリプトを使ってsvc_mssqlのハッシュを取得してクラック。trustno1というパスワード。
6. winrm等は使えないようで、Invoke-RunasCs.ps1というスクリプトを使う。ターゲット端末上でこのスクリプトを走らせ、リバースシェルペイロードを実行。これによってsvc_mssqlに横展開が成功する。
7. svc_mssqlユーザでwhoami /privすると、**SeManageVolumePrivilege**という権限があることが分かる。パブリックエクスプロイトがあり、これを使うことでC:\配下に.dllの書き込み権限が与えられる。
8. C:\Windows\System32\wbem\の下に、tzres.dllという名前で、msfvenomから作った.dllペイロードを配置する。このtzres.dllという名前は、タイムゾーンを読み込むときに使われるもののようで、systeminfoコマンドを実行するときに読み込まれる.dllファイルのよう。
9. systeminfoコマンドを実行したらtzres.dllが起動するので、これでSYSTEMを獲得しておわり。