# ffuf

## Objective
- SQLIやXSSを見つけられる
- ffufで使われるwordlistsはただのtextファイル
- 
- 
## Installation
- sudo apt install ffuf


## Usage
- -uで対象のURLを指定する
- -wで、使用するwordlistsを指定する
最も基本的なコマンドは以下
```
ffuf -u https://example/FUZZ/ -w ./wordlist
```

## Response
![image](https://github.com/cyber-mamba/red-teaming/assets/96987448/6d2d681b-c4d9-4bb0-aa85-edfa30a17243)


## Wordlist
wordlistの選定が超大事
良いwordlistを使えば、良いスキャン結果が返ってくる
最も一般的で良いとされているのは**SecLists**

## recursionについて
- ffufには**recursion**と**recursion-depth**を選択するための2つのフラグがある
- recursionしてスキャンする場合は、URLの指定において、**FUZZ/**ではなく**FUZZ**として、末尾にバックスラッシュを含めないことに注意

recursionは以下のようにして行う
```
ffuf -u https://example/FUZZ -w ./wordlists -recursion
```
recursionを行うと、ヒットしたディレクトリにおいて、すべてのwordを使って再度スキャンする。
例えば、https://adminでヒットしたとき、admin/をほかのwordでもスキャンするため、admin/panelのような、admin配下のパスについてもスキャン結果に含めることができる。

## Extension check
ffufのスキャンにおいて、スキャンにヒットしたファイルの拡張子を、表示するresultに含ませることもできる。
```
ffuf -u https://example/FUZZ -w ./wordlists -recursion -e .bak
```
## Sirent modeとOutput
-sをつけることで、途中経過を表示しないようにすることができる。
また、**| tee .outfile.txt**で、結果をファイルに格納させることもできるので便利。

```
ffuf -u http://example/FUZZ -w ./wordlist -s | tee outfile.txt
```

更に、出力結果は.txtに限らず、json, ejson, html, md, csv, ecsvでも出力ができる
```
ffuf -u http://exampleFUZZ -w ./wordlsit -of html -o ./outputfile
```

## Authentication
### Cookie
Webアプリケーションのファジングでは、Cookieを用いた認証をバイパスする必要があるものも多い。
多くの場合、BurpなどでCookieを取得してからVALUEにセットする。
```
ffuf -u http://example/FUZZ -w ./wordlist -of html -o ./codingo -b "NAME1=VALUE1; NAME2=VALUE2"
```

### Header Authentication
headerをカスタムするには、**-H**をつける。
```
ffuf -u http://example/FUZZ -w ./wordlist -of html -o ./codingo -H "NAME1=VALUE1; NAME2=VALUE2"
```



