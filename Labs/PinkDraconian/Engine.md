# Engine
[Engine](https://www.youtube.com/watch?v=wpiA3wMawfw&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=20)

1. RPC, SMB, 445が空いているのが分かるので、まずはgobusterでWebの列挙を走らせる
2. ターゲットではIISが445で動いている
3. blogというサブディレクトリがあるのでブラウザから見ると、Alex's blogなるものが見える
4. ログインページが書いてあるのでそこへ飛んで、admin adminを試すと入れる
5. smbclientでsmbアクセスして匿名ログインが可能かチェックするがダメ
6. ログインページを見ると、BlogEngine3.3.6が走っているのが分かるので、そのプラグイン？をsearchsploitして脆弱性を突いたrceを実行する
7. シェルをとったらwinPEASを実行してみると、自動ログオンの脆弱性がありそうなので試す
8. administratorでパスワードを自動ログオンのやつでevil-winrm実行すると自動ログオンができる
9. これで権限昇格もできているので完了