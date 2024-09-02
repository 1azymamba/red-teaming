# Clue
Hard...  
  
## 手順
1. rustscanする。cassandra、freeswitchの2つが怪しい。
2. まずはcassandraのpublic exploitから調べていく。これは、cassandra.yamlの設定が特定条件下の時にのみ成功するよう。cassandra.yamlはsmbclientの匿名ログインで確認できた。しかし脆弱な設定ではないようでエクスプロイトは失敗した。
3. 次に、cassandraにarbitrary file readの脆弱性があるらしくpocを使う。パストラバーサルで/etc/passwdを読み取れた。これで、ユーザにcassieとanthonyがいることが分かった。
4. ユーザ名が分かったので.ssh/id_rsa等の秘密鍵を取得できないかを試したが失敗。ファイルが存在しないよう(?)
5. また、public exploitのコメントにも書いてあるが/proc/self/cmdlineを見ることもできる。そうすると、cassieのパスワードらしき値が平文で返ってくる。
6. cassieとこのパスワードでsshを試みるも失敗。/etc/ssh/sshd_configをExploitで読み取ると、AllowUsersの部分でrootとanthonyだけがssh許可されていることが分かる。cassieは使用不可。
7. この時点でパスワードスプレーも実施すべきだがいったんスキップ。
8. 次に、freeswitchのPublic Exploitを調べる。デフォルトパスワードが設定されていればRCEできるというもの。しかしデフォルトパスワードと先ほど手に入れたcassieのパスワードではRCEに失敗。
9. freeswitchのパスワードがどこかのconfigファイルに書かれているはずなので、そのファイルパスを調べる。[ここに書いてあるらしい](https://docs.astppbilling.org/itplmars/v5/how-to-change-freeswitch-event-socket-password-56435594.html)
10. ひとまず/etc/freeswitch/autoload_configs/event_socket.conf.xmlに平文のパスワードがあるようなのでそこを読み取り、そのパスワードでpocを実行すると初期侵入が完了する。
11. 