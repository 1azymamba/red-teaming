# wpscan
WordPressを使っているWebサイトに対してスキャンを行い、使用しているプラグインなどを検出する。

## コマンド集

1. APIキーを使わないでtargetのプラグインを検出する。--enumerateの引数にpを入れると、よく使われるプラグインを検出することになる。
```
wpscan --url http://192.168.50.244 --enumerate p --plugins-detection aggressive -o websrv1/wpscan
```