# mingw-w64
Kali上でBinary ExploitコードなどをWindows向けにコンパイルするときとかに使える。  
  
インストール
```
sudo apt install mingw-w64
```

シンプルなソースコードのコンパイル
```
i686-w64-mingw32-gcc <ソースコード.c> -o <出力名.exe>