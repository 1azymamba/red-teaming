# client02
Checking KrbRelayUp

## Time
合計1.5Hくらい

## 手順
1. 別のマシンから取得したユーザ名と、NTLMからクラックした平文のパスワードでnxc winrmかける
2. Pwn3dヒットするのでevil-winrmでアクセスしてlocalは取得。
3. めぼしいファイルがないか探索を行う。C:\に明らかに怪しいDevelopmentExecutablesというフォルダがあり、その中に一つバイナリが入っている。dllが同じフォルダに無いので、dllサイドローディングよりもサービスバイナリインジェクションからのサービス実行かなと推測。
4. 一応PrivescCheckでも確認。auditTrackerのサービスが怪しいらしく、auditTracker.exeというバイナリがシステム権限でサービス実行されており、ドメインユーザはバイナリに対してModifyの権限を持っているようだった。
5. kaliからバイナリのシェルを落としてきてauditTracker.exeの名前で同じパスにおいてからcmd /c sc start auditTrackerでサービスを実行してSYSTEM獲得。easy

