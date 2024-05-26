# SharpHound and BloodHound
ドメイン内の情報を収集するツール。　　
C#で書かれていて、NetWkstaUserEnumやNetSessionEnumといった、手動列挙で使うような.NETのクラスを使用する。  
使い方として、自分でコンパイルすることも、コンパイル済みのバイナリファイルを使用することも、PowerShellスクリプトとして利用することも可能。  
ちなみに、SharpHoundを実行する際は最初にInvoke-BloodHoundというコマンドを実行する必要がある。  
また、BloodHoundの使用には、デフォルトでKaliにインストールされているNeo4jサービスを開始する必要がある。

## SharpHoundとBloodHoundの違い
- SharpHound = ADの情報を収集するスクリプトとかの方。
- BloodHound = SharpHoundで収集した情報をインポートしてグラフDBの理論に基づいてデータを可視化するツール。neo4jを使う方。

## SharpHound実行時の注意点
- ADの構造は、大規模な組織ではそこまで頻繁に大きく変わることはない。従業員が増えたり減ったりはするが、OU、グループ、ユーザ、その権限といった全体的な構造は変わらないことが多い。
- ただし、**アクティブなセッションとログオンイベントは常に変わる可能性がある。**過去にSharpHoundを実行しても、ペンテスト時の評価では、一部のユーザがすでにセッションをログオフしていたり、新しいユーザが新しいセッションを確立していたりする可能性がある。
- 過去に実行したSharpHoundの情報をBloodHoundで見ても、そのアクティブなセッションデータが常に正確であるとは限らない。
- なのでペンテストにおいて良い方法は、SharpHoundでいったん**All**コレクションして、その後は少なくとも1日に2回、SessionコレクションでSharpHoundを実行するのが良い。
- 上記の方法を使うと、最初のAllコレクションでAD構造全体を把握して、その後はセッション情報だけ取得するので実行が早く済む。
- このセッションの実行は、ユーザが最初に仕事を始める10:00と、昼休みから戻ってきて仕事を始めるであろう14:00が最適。

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
MATCH (m:Computer) RETURN m
```

7. ドメイン内の全てのユーザを取得するカスタムクエリ
```
MATCH (m:User) RETURN m
```

8. 各コンピュータに対する全てのアクティブなセッションを表示するクエリ
```
MATCH p = (c:Computer)-[:HasSession]->(m:User) RETURN p
```