# Unroot

1. 80と22が空いていて、まずは80から見ていく
2. 裏でgobusterを走らせておいて、.txtと.phpを検索していく
3. admin adminでは通らず、info.phpとdev/ping-test.phpが見つかるので、pingしてみる
4. ;で区切ってRCEできることが分かる
5. RCEでbin/bashのコマンドを実行させて、rlwrapをつけてnetcatでリバースシェル狙うがダメ。python入ってないのでpythonのシェルも取れず
6. PHPのワンライナーで/bin/bash動かしてシェルが取れた
7. joeのアカウントでシェルを取って、sudo -lしてみると、rootで実行できるものは無いように見える CVE-2019-14287の脆弱性。
8. だが、sudo 1.8のバージョンが脆弱らしく、このCVEを突くとrootを取れる