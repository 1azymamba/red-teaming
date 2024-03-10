# exiftool
[Documentation](https://exiftool.org/)

EXIF, GPS, IPTC, XMP, JFIF等、多彩なメタデータをドキュメントから読み取り、書き込みができるツール。Perlで動作する。  
  
## コマンド集
  
-a => 重複したタグを表示する  
-u => 未知のタグをファイル名**brochure.pdf**とともに表示
```
exiftool -a -u brochure.pdf
```