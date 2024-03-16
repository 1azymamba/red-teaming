# Zero
[Zero](https://www.youtube.com/watch?v=AqYLF4JavfE&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=1)  
  
1. ターゲットにnmapで全ポートのスキャンを実行
2. NetBIOS_Computer_Nameに"DC"の文字列があることからDomain Controllerと推測
3. "Zero"というマシンの名前とDCという情報から、ADのzero logonの脆弱性を使うと推測
4. CVE-2020-1472のPOCを使ってターゲットにzero logonの脆弱性があることを確認
5. impacket-secretumpでAdminのhashをダンプ
6. impacket-psexecで、先ほどダンプしたハッシュを使ってAdminとしてパスワードが無くてもログオンができる