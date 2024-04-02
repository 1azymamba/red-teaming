# Brute
[Brute](https://www.youtube.com/watch?v=dO3UwMbV6-A&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=34)

1. nmapするとkerberosとかが動いているのでADだというのが分かる。brute.cslがドメイン名。
2. HackTricksでADのハッキング手法を調べながら進めていく。まずはADのユーザ列挙から始めるべきなので、nmapスクリプトで列挙する。wordlistsには、/usr/share/wordlists/SecLists/Usernames/Names/names.txtを使う。
3. 4人のUsernameが見つかるので、ASREPHashなるものを取得するために、GetNPUsers.pyというツールでスキャンすると、一人のハッシュが手に入る。
4. ハッシュをローカルでjohn使ってrockyou.txtでクラックするとパスワードが分かるので、crackmapexecしたあとにevil-winrmでログイン
5. 現状tessユーザでログインしているので、whoami /allすると、すべてのグループが分かる。
6. DnsAdminsなるグループがあるので、この時点でDnsAdminsからSYSTEMへの権限昇格という手法が瞬時に浮かばないといけない
7. DnsAdminsからの権限昇格の手法を調べながら、.dllのファイルを作成する
8. .dllファイルをマウントして実行後にsc.exeでdnsにクエリをぶん投げると、リバースシェルがとれてSYSTEM権限になる。