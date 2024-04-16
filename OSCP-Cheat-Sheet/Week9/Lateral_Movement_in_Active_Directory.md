# AD環境での横展開

## WMIとWinRM
- ここでの横展開のテクニックは、**Windows Management Instrumentation**(WMI)というWindowsのタスク自動化のための機能を利用したものを紹介。
- WMIは、**Win32_Process**クラスの**Createメソッド**を使ってプロセスを作成できる。
- ちなみに**wmicユーティリティ**は最近非推奨になった。
- PowerShellからWMIでの攻撃実行が可能。
- 昔からwmicは、コマンドライン経由での横展開によく使われていた。
- 