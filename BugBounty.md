# BugBounty 

## Fuzzing Tools

	• ClusterFuzz
→GoogleのFuzzingフレームワーク
	• OneFuzz
→MicrosoftのFuzzingフレームワーク、クローズドなので利用できない
	• AFL++
→ELFファイル向け、良いらしいけどWeb向きではない
	• WinAFL
→PEファイル向け
	• libFuzzer
→Unitテストを書く感覚でFuzzingできる、有力候補
	• graphql
	• ffuf
→-rateでfuzzの速度を変えることができたりする
	• wfuzz
	• gobuster
	• kanha
→個人作成の小さいツール。DNS逆引きやFuzzingに使える。規模小さくまだ検討対象外か。
	• OSSFuzz
→ようわからんけどGoogleのプロジェクトらしい
	• Goctopus
→サブドメインを列挙するツールっぽい
	• dirsearch
→ffufの競合っぽいが、ffufのほうが優性に見える
![image](https://github.com/cyber-mamba/red-teaming/assets/96987448/9e603eb0-ff74-4b78-a231-900a8f9a0546)

# API Enumeration
ffufなどでwordlistから自動列挙してみる→.jsをdeveloperツールで見て、エンドポイントごとの.jsに、別のAPIエンドポイントに関する記述が無いかを見てみる→BurpSuiteのスパイダリング？
上記のAPI Enumerationのアプローチは、React.js以外のWebサイトでも同様。
※jquery.jsのような、デフォルトで含まれるようなjsファイルを解析しても意味はないので時間の無駄。

参照：https://www.bugbountyhunter.com/guides/?type=javascript_files
