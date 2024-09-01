# Persistance

1. PayloadTaskというタスク名でペイロードを毎日10時に実行するように設定する。
```
schtasks /create /tn "PayloadTask" /tr "C:\path\to\payload.exe" /sc daily /st 10:00 /f
```

2. セットしたタスクが動くかをチェックする。
```
schtasks /query /tn "MyPayloadTask"
```

3. 5分ごとにペイロードを実行するようにセットする。
```
schtasks /create /tn "MyPayloadTask" /tr "C:\path\to\payload.exe" /sc minute /mo 5 /f
```