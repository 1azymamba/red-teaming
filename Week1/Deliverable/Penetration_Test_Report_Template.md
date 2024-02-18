# ペネトレーションテスト実施後のレポートテンプレート

## Executive Summary
1. スコープやテスト期間、攻撃元IP等の概要
e.g)
```
Executive Summary:

- Scope: https://kali.org/login.php
- Timeframe: Jan 3 - 5, 2022
- OWASP/PCI Testing methodology was used
- Social engineering and DoS testing were not in scope
- No testing accounts were given; testing was black box from an external IP address
- All tests were run from 192.168.1.2"
```
2. 契約、実施事項の概説長い形式のExecutive Summary。(経営幹部向けなので、ここでは技術詳細については触れなくてもおｋ)

```
- "The Client hired OffSec to conduct a penetration test of
their kali.org web application in October of 2025. The test was conducted
from a remote IP between the hours of 9 AM and 5 PM, with no users
provided by the Client."
```

3. クライアントの良い点
```
- "The application had many forms of hardening in place. First, OffSec was unable to upload malicious files due to the strong filtering
in place. OffSec was also unable to brute force user accounts
because of the robust lockout policy in place. Finally, the strong
password policy made trivial password attacks unlikely to succeed.
This points to a commendable culture of user account protections."
```

4. 発見された脆弱性の説明
```
- "However, there were still areas of concern within the application.
OffSec was able to inject arbitrary JavaScript into the browser of
an unwitting victim that would then be run in the context of that
victim. In conjuction with the username enumeration on the login
field, there seems to be a trend of unsanitized user input compounded
by verbose error messages being returned to the user. This can lead
to some impactful issues, such as password or session stealing. It is
recommended that all input and error messages that are returned to the
user be sanitized and made generic to prevent this class of issue from
cropping up."
```

5. 結論、まとめ、次の項への導入文
```
"These vulnerabilities and their remediations are described in more
detail below. Should any questions arise, OffSec is happy
to provide further advice and remediation help."
```

> [!Note]
> すべてのペンテスターが、脆弱性修正に関するアドバイスを提供するわけではない。しかし、あった方がクライアントは喜ぶ。

## 重大度指標について
===
Positive Outcome: "There were no limitations or extenuating circumstances in the engagement. The time allocated was sufficient to thoroughly test the environment."

Neutral Outcome: "There were no credentials allocated to the tester in the first two days of the test. However, the attack surface was much smaller than anticipated. Therefore, this did not have an impact on the overall test. OffSec recommends that communication of credentials occurs immediately before the engagement begins for future contracts, so that we can provide as much testing as possible within the allotted time."

Negative Outcome: "There was not enough time allocated to this engagement to conduct a thorough review of the application, and the scope became much larger than expected. It is recommended that more time is allocated to future engagements to provide more comprehensive coverage."
===

## 技術詳細
```
4. Patch Management

Windows and Ubuntu operating systems that are not up to date were
identified. These are shown to be vulnerable to publicly-available
exploits and could result in malicious execution of code, theft
of sensitive information, or cause denial of services which may
impact the infrastructure. Using outdated applications increases the
possibility of an intruder gaining unauthorized access by exploiting
known vulnerabilities. Patch management ought to be improved and
updates should be applied in conjunction with change manage
```
![alt text](image-2.png)

## Appendix
