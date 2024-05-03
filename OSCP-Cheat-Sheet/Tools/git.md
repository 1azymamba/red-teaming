# Git

## コマンド集
1. git logで確認したコミットのハッシュを指定してその時のコミットと現在のコミットの違いを表示する。
```
git show <hash>
```

```
git checkout -b <new_branch_name>
```

```
git config --global user.name
```

```
git config --global user.email
```

```
git add .
```

```
git commit -m 'comment'
```

```
git push origin <your_currently_repogitry>
```

設定されているリモートリポジトリの情報を確認する
```
git remote -v
```

設定されているリモートリポジトリを変更する
```
git remote set-url origin [new url]
```

2. コミットの番号を指定して過去にコミットしたときの状態に戻す。
```
git ccheckout <commit number>
```


## .gitのフォルダ構成
[参考にしたページ](https://qiita.com/tatane616/items/dbad66179754be57d2e2)
- .gitファイルはgit initコマンドをしたときに作られるフォルダで、gitを扱う際に必要な情報はすべてこの中に入っているらしい。

- HEAD => 現在のブランチの参照
- branches => git fetch, git pull, git pushのURLを省略形で指定するために使われるらしい。廃止予定らしい。
- config => リポジトリのGit設定、git configで設定するメールとかもここ。
- description => GitWeb(gitのデフォのWebUI)で使われる。
- hooks => Gitのコマンドを実行したときに呼び出されるスクリプトを設定できる。
- info => 子のリポジトリに対する追加情報。
    - exclude => .gitignore的な奴。
- objects => Gitの実体(オブジェクト)が保存される場所。コミットされるといろいろ追加される。現在HEADが参照しているコミットを表示する。らしい。
    - info => オブジェクトに対する追加情報
    - pack => ランダムアクセスするためのインデックスファイルや、多数のオブジェクトを圧縮したファイル
- refs => Gitの各参照先が保存されている場所
    - heads => 参照先のブランチ(実体はコミットオブジェクト)
    - tags => 参照先のタグ名(実体はコミットオブジェクト)
- index => git addされたときに作られる。コミット前のステージング領域として利用される。git commitすると、このindexに入っている(ステージングされている)ものがコミットされる。この中身はバイナリファイル。中身はgit ls-files --stageで確認できるらしい。