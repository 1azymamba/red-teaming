# WinPEAS
[Documentation](https://gitlab.com/kalilinux/packages/peass-ng)  
  
Windows上で権限昇格のための情報収集を自動で行うツール。重要な情報は赤色で表示される。

## コマンド集

1. 端末上で列挙を行う。出力がかなり長くなり見づらいので、毎回別のファイルにアウトプットしておくといい。以下はwinpeasのオプションで、デフォルトだとカレントディレクトリにout.txtで保存される。
```
.\winPEAS.exe log
```


## 着眼点
1. DLL Hijacking in binary folderは熱い
2. Autorun ApplicationのUnquoted and Space detectedとPATH Injectionは微妙
3. writeとexe権限のあるexecutionファイルは熱い
4. 