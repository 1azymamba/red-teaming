# Red
[Red](https://www.youtube.com/watch?v=XonqZUaqioM&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=26)


1. 22, 80, 6379のredisというのが空いている。redisはあまり見かけないので今回はここから見ていく。
2. nc <IP> <redis_port>にバインドすると、redisのバージョン等の情報が取得できる
3. searchsploitでredisの脆弱性を調べたりググったりすると、exploiitの手法で出てくるのでそれを試す
4. RCEができてシェルが取れるので、redisユーザからrootへの権限昇格を狙う
5. pspyというツールでターゲット上でroot実行されているプロセスを列挙する
6. redisユーザがこのroot権限実行されているファイルへのアクセス権限を持っていそう
7. 該当する/var/log/resdis/に移動して、log-manager.shがroot実行されているので見てみる
8. このlogフォルダ以下のファイルには、redisユーザも書き込み権限がある。なので、.shファイルを書き換えてみる
9. redisの権限でroot実行される.shファイル内のbashを書き換えたので、root権限のシェルを取れる