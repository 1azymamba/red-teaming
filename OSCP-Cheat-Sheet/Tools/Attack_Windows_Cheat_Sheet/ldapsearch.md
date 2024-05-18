# ldapsearch
Ldapを見つけた時に、ユーザ名の列挙で使えるやつ


## コマンドリスト

1. ユーザ名をれきょする。
```
ldapsearch -v -x -b "DC=hutch,DC=offsec" -H "ldap://192.168.161.122" "(objectclass=*)"
```