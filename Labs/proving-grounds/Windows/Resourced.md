# Resourced

## 手順
1. rustscan, ldapsearh, enum4linuxをかける。enum4linuxだけいい感じに刺さって、ユーザ名のリストとパスワードらしきものを取得できる。
2. 取得したユーザ名とパスワードらしきものでsmbclientでアクセスすると、NTDS.dltとSYSTEMのバックアップ？のようなものを取得できる。
3. impacket-secretsdumpで復元して、取得したNTハッシュから平文のパスワードに戻せるかをcrackstationで試す。AdministratorのNTハッシュだけヒットするが、これはこの後使えなかった。
4. pass the hashの手法でnxc smb, rdp, winrmそれぞれにスキャンを書けると、L.Livingstoneがrdpとwinrmの権限あり。
5. rdpはRestricted Adminが有効みたいだったので、L.Livingstoneでwinrmに接続してlocalフラグゲット。
6. BloodHoundで現在のL.Livingstoneの権限を確認すると、コンピュータアカウントに対してGenericAllの権限を持っていることが分かる。コンピュータアカウントに対してユーザアカウントが書き込み権限を持っている場合、Resource-based Constrained Delegationの手法を使って、そのマシン上で特権アクセスを取得することができる。  
[Resource-based Constrained Delegationの手法](https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/resource-based-constrained-delegation)
7. 