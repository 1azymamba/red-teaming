# SharpHound and BloodHound
ドメイン内の情報を収集するツール。　　
C#で書かれていて、NetWkstaUserEnumやNetSessionEnumといった、手動列挙で使うような.NETのクラスを使用する。  
使い方として、自分でコンパイルすることも、コンパイル済みのバイナリファイルを使用することも、PowerShellスクリプトとして利用することも可能。  
ちなみに、SharpHoundを実行する際は最初にInvoke-BloodHoundというコマンドを実行する必要がある。  
また、BloodHoundの使用には、デフォルトでKaliにインストールされているNeo4jサービスを開始する必要がある。


## コマンド集
1. PowerShellスクリプトとして使用する。
```
Import-Module .\SharpHound.ps1
```

2. Invoke-BloodHoundコマンドのヘルプを表示する。
```
Get-Help Invoke-BloodHound
```

3. -CollectionMethod => すべての収集メソッドを実行する  
```
Invoke-BloodHound -CollectionMethod All -OutputDirectory C:\Users\stephanie\Desktop\ -OutputPrefix "corp audit"
```

4. Neo4jサービスの開始。neo4jは、NoSQLをつかった収集データのグラフィカル化をするためのもの。
```
sudo neo4j start
```

5. Kali上でBloodHoundを開始する
```
bloodhound
```

6. ドメイン内の全てのコンピュータを取得するカスタムクエリ
```
MATCH (m:Compyter) RETURN m
```

7. ドメイン内の全てのユーザを取得するカスタムクエリ
```
MATCH (m:User) RETURN m
```

8. 各コンピュータに対する全てのアクティブなセッションを表示するクエリ
```
MATCH p = (c:Computer)-[:HasSession]->(m:User) RETURN p
```