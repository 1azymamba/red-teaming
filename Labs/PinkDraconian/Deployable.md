# Deployable
[Deployable](https://www.youtube.com/watch?v=3YWOggMiKu4&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=22)

1. RPC, SMB, WinRM, 8080, 8009が空いているのが分かる。ここだと、8009と8080気になる。
2. Apache Tomcatが8080でサーバとして動いているのでアクセスしてみると、ManagerAppからTomcat Application Managerなる場所にたどり着く
3. .jspのwebshellをmsfvenomで作ってjarで.warにコンパイルする
4. tomcatの管理コンソールから.warのwebshellをアップロードしてシェルを取る
5. winPEASをアップロードして実行する
6. sc qc deployでDeploy.exeのバイナリパスを見つける。ここのパスに別の不正なバイナリを置けば実行できる可能性がある
7. sc sdshow deployでSIDの権限を見ると、自分の持つtomcat権限では、通常はstopしかできないことが分かる
8. msfvenomでwindowsのリバースシェルバイナリを作る
9. バイナリをsc.exeをさっきのDeployのフォルダにサービスとしてアップロードしてsc start deployでサービス実行すると、権限昇格ができてる