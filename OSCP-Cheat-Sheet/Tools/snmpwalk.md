# snmapwalk
- snmpにはMIBという、NWデータベースを管理するやつがあるらしい。
[HackTricksの参考情報](https://book.hacktricks.xyz/network-services-pentesting/pentesting-snmp)
[SNMPからRCEへ](https://book.hacktricks.xyz/network-services-pentesting/pentesting-snmp/snmp-rce#extending-services-with-additional-commands)


## コマンド集
1. コミュニティ文字列をpublic(ほとんどの場合public)にしてSNMPのversionを1に指定、そしてタイムアウト10秒にする。
```
snmpwalk -c public -v1 -t 10 192.168.50.151
```

2. コミュニティ文字列をpublicに指定、SNMPバージョンを1に指定、最後の引数はOID(オブジェクトID)。  
このOIDがプロセスデータとか出してくれていい感じ。
```
snmpwalk -c public -v1 192.168.50.151 1.3.6.1.2.1.1
```

3. -Oaを追加することで、StringsがHexになっているものをデコードしてくれる。
```
snmpwalk -c public -v1 -Oa -t 192.168.50.151
```

4. STRINGとINTEGERを引っ張り出す。
```
snmpwalk -c public -v2c 192.168.50.151 NET-SNMP-EXTEND-MIB::nsExtendObjects
```

5. 
```
snmpbulkwalk -c public -v2c 192.168.215.156 . > snmp_2
snmpwalk -v2c -c public 192.168.215.156 NET-SNMP-EXTEND-MIB::nsExtendOutputFul
snmpwalk -v2c -c public 192.168.236.149 NET-SNMP-EXTEND-MIB::nsExtendObjects
```