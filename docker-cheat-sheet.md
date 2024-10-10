# Docker cheat sheet

1. パブリックリポジトリからubuntu OSのイメージをpullする
```
docker image pull ubuntu
```

2. ローカルに存在するイメージの一覧を取得する
```
docker image ls
```

3. dockerイメージからコンテナを起動する。
-it => インタラクティブ
-d => バックグラウンドで実行
--name => コンテナの名前を指定する
```
docker container run -it -d --name <container name> <image name>
```

4. コンテナの一覧を表示する
```
docker container ls
```

5. コンテナの中にbashで入る
-it => インタラクティブ
```
docker exec -it <container name> bash
```

6. コンテナからexitしてもコンテナは動作し続けるのでストップする
```
docker container stop <container name>
```
