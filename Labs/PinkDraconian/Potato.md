# Potato
[Potato](https://www.youtube.com/watch?v=xUHFQsncsyc&list=PLeSXUd883dhjhV4MokruWYQWnhxsCPyUY&index=15)

1. nmapすると8080がopenなのでブラウザからアクセス
2. 認証求められるのでとりあえずadmin adminでいくと通る
3. Jenkinsの中で、/scriptにアクセスするとコンソールからコマンド実行ができる。HackTricksでリバースシェルの取り方を調べながらリバースシェルを取る
4. PowerShellでリバースシェルを取れたので、WinPEASで権限昇格の脆弱性が無いか調べる
5. JuicyPotatoというツールを使ってSeImpersonatePrivilegeという攻撃でトークンの権限昇格ができるらしいので、調べながらJuicyPotatoで権限昇格
6. system権限取得