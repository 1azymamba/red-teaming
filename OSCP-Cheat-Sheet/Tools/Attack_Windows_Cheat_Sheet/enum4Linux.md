# enum4Linux
Kaliにデフォで入っているツールで、ターゲットのusernameのリストやOSの情報を収集できる。
ちなみに4Linuxとか言ってるけど、WindowsとSmabaをスキャンするためのツールなので注意。
Perlで書かれている。
https://www.kali.org/tools/enum4linux/


## コマンド集
1. 一般的な情報をスキャンするコマンド。
```
enum4linux -a <target_ip>
```
