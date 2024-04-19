# Hack Kerberos

## What's Mimikatz?
- 奇人**Benjamin Delpy**によって開発されたWindowsの認証情報をダンプできるツール
![alt text](image.png)
- もっと具体的に言うと、**NTLMハッシュの取得**、**Pass the Hash**攻撃、**Over the Pass**攻撃の実行といったことが可能！まさにスーパーはかあのスイス・アーミー・ナイフ。  

- ツールの実行はスタンドアローンのmimikatz.exeバイナリでも、カーネルモードで実行するmimidrv.sysでも、DLLのmimilib.dllでも、PowerShellから呼び出されるpowerkatz.dll出も可能。
- CTFならmimikatz.exeを使うことが多い。
- 実行するには**ローカル管理者権限**か**SYSTEM権限**、加えて**デバッグ権限**(SeDebugPrivilege)が必要。

## Syntacks of Mimikatz
文法を叩きこませる！  
```
例：
.\mimikatz.exe  # <=実行してmimikatzのセッションを開始
privilege::debug  # <=デバッグ権限へのエスカレーション
sekurlsa::logonpasswords # <=ユーザのNTLMハッシュなどをダンプして取得
exit
```
つまり...
```
<modulename>::<commandname> arguments...
```

## 次にAD関連の用語を叩きこむ！
### Active Directory一般用語
- ログオンプロセス
- Local Security Authority(LSA)
- Domain Controller(DC)
- Key Distribution Center(KDC)
- Authentication Service(AS)
- Principal
- SAMデータベース
- SeDebugPrivilege権限
- LSASS.exeダンプ
- ローカル管理者  
=> **Administratorsグループに所属しているユーザ**のこと。  
=> 一台のコンピュータやサーバに対して権限を持つ。  
- ドメイン管理者  
=> **Domain Admins**というグループに所属しているユーザの事を指す。  
![alt text](image-2.png)
=> ローカルAdministratorと違い、文字通りドメイン内のすべてのコンピュータの管理ができる**最強にして最高の権限**。  
=> ネットワーク全体に対して管理者としての権限を持つ。
- SYSTEM権限
- Administratorsグループ  
=> コンピュータ一台ごとにAdministratorsというグループが初めから存在する。  
=> ビルトインユーザであるAdministratorはこのAdministratorsグループに所属している。  
=> Administratorsグループに所属しているユーザは**システム管理者権限を持つ**。  
=> **Administratorsグループに所属させれば、Administratorユーザ以外でもシステム管理者にすることができる**。  
![alt text](image-1.png)  
=> ややこしいが、Administratorユーザには、**ローカルAdministrator**と**ドメインAdministrator**がいるので注意。
- admin(Administrator)  
=> Windowsに初めから存在している**ビルトインユーザ**。  
=> 権限としては最も強力で、**アプリケーションのインストール**、**ユーザの作成**、**レジストリの変更**といったあらゆる操作が可能。  
=> adminは**Administratorsグループに所属している**。

### Kerberos認証関連
- ハッシュアルゴリズム
- LMハッシュ
- NTハッシュ
- Net-NTLMハッシュ
- Net-NTLMv1/v2
- Net-NTLMv1
- Net-NTLMv2
- Kerberos
- Ticket-Granting Tiket(TGT)
- krbtgt
- Ticket-Granting Service(TGS)
- Service Tiket
- Kerberos認証プロセス
- Golden Ticket
- Silver Ticket

### ADの攻撃手法
- Pass-the-Hash(PtH)
- Overpass-the-Hash
- Skelton Key Attack
- DCShadow
