# Inveigh
Responderのように、LLMNRによる名前解決をキャプチャしてハッシュを取得できる。  
ResponderがLinuxから実行されるのに対し、InveighはWindowsから実行されることを想定している。  
  
PowerShellバージョンとC#で書かれたバイナリバージョンがある。  
  
なお、2024現在PowerShellバージョンは更新されておらずC#で書かれたバイナリの方を使う方がよさそう。  
  
ResponderやInveighのMITMは、LLMNRとNetBIOSが有効になっていることが攻撃の前提条件としてある。
  

  
1. 使用できるパラメータを確認する。
```
(Get-Command Invoke-Inveigh).Parameters
```

2. LLMNRとNBNSスプーフィングによってInveighがキャプチャした内容をコンソールに出力してファイルに書き込む。
```
Invoke-Inveigh Y -NBNS Y -ConsoleOutput Y -FileOutput Y
```

3. バイナリのInveighを実行する。  
```
./Inveigh.exe
```
