# The Fundamental of AD

## ADの概要
- Active Directoryは、管理者がOS, アプリケーションユーザ、データアクセスを大規模に更新・管理できるようにするサービス。
- ADは標準構成でインストールされているが、管理者がニーズに合わせて設定をカスタマイズしていることが多い。
- ペンテスターの観点からすれば、ADには豊富な情報が含まれているため興味深いものとなる。
- ドメイン内の特定のオブジェクトの侵害に成功すると、組織のインフラを完全にコントロールできる可能性がある。

## ADの基礎用語と仕組み
- **オブジェクト**と呼ばれるユーザ、グループ、およびコンピュータに関する情報が保存されている。
- 各オブジェクトに設定された権限で、オブジェクトがドメイン内で持つ権限が決まる。
- ADのインスタンスを構成するための最初のステップは、corp.comのようなドメイン名を作成すること。
- AD環境はDNSサービスに依存関係があるため、一般的なDCは特定のドメインに対して権限を持つDNSサーバをホストしている。
- **OU**(組織単位)は、ドメイン内にオブジェクトを保存するために使用されるファイルシステムフォルダのようなもの。
- **コンピュータオブジェクト**=>ドメインに参加している実際のサーバとワークステーションを表す。
- **ユーザオブジェクト**=>ドメインに参加しているコンピュータへのログインに使用できるアカウントを表す。
- **属性**=>オブジェクトのタイプによって異なる。たとえば、ユーザオブジェクトには**名、性、ユーザ名、電話番号**などが属性として入ったりする。
- ユーザがドメインにログインしようとすると、**DC**にリクエストが送信される。そしてこのタイミングで、ユーザがドメインにログインできるかどうかがチェックされる。
- DCにはすべてのOU、オブジェクト、およびそれらの属性が含まれるため、ADの調査における最も重要なコンポーネントと言える。
- ADにはグループが存在し、オブジェクトをADグループに割り当ててまとめて管理することもできる。
- **Domain Admins**グループのメンバーは、ドメインの中で最も権限の高いオブジェクトの一つ。
- 攻撃者がこのグループのメンバー(ドメイン管理者)を侵害すると、基本的にドメインを完全に制御できることになる。
- ADへの攻撃においてピボットは重要で、仮に新たにログインできる別のユーザを見つけた場合、そのユーザを無視せずに改めてそのユーザ視点での列挙を行うことが重要。これらの積み重ねが攻撃を前進させる。

## Manual Enumeration
- 