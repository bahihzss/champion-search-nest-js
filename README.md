## Nest.js のサンプル

どんな感じになるのか口頭や文面で説明したもわかりづらいと思うので。  
とりあえず、ユーザーを登録と参照できるだけの API で書いてみました。

### 書いてみて感じたメリット

* CoC ではないので
  * 依存関係がわかりやすい
  * FW 特有の仕様が少ない
* TypeScript なので
  * 補完がばっちり効く
  * テスト中も型チェックしてくれるので安心
* 枠から外れたことが柔軟にしやすい
  * TypeORM やめて Prisma にしたり
  * ドメイン知識を分離して、 Service クラスで依存を解決するのをやめたり

### 書いてみて感じたデメリット

* Laravel や Rails に慣れてたら、書くことが多く感じる
* 今回はドメイン知識とインフラの実装を分離しているので、 nest-cli の恩恵があまり受けられない
* JavaScript だけで使えない（知らなかった・・・）
* PHP とは違って、同期・非同期を意識しないといけない
  
## フォルダ構成

```
prisma
├── migrations
└── schema.prisma
src
├── domain
│   └── user
│       ├── user.entity.spec.ts
│       ├── user.entity.ts
│       └── user.repository.ts
├── infra
│   ├── shared
│   │   └── prisma.service.ts
│   └── user
│       ├── user.prisma.repository.spec.ts
│       └── user.prisma.repository.ts
├── main.ts
├── modules
│   ├── app.module.ts
│   └── user
│       ├── user.find-by-id.controller.spec.ts
│       ├── user.find-by-id.controller.ts
│       ├── user.module.ts
│       ├── user.register.controller.spec.ts
│       └── user.register.controller.ts
└── shared
    ├── e2e-test.ts
    ├── entity.ts
    └── errors.ts

```

### ドメイン層： `domain`
* ドメイン知識を実装するレイヤー、他のどのレイヤーにも依存してはいけない
* 値オブジェクトは作らず、プリミティブ型で実装しています
* リポジトリのインターフェースは集約を表すドメイン知識になるので、ここに置いています

### インフラ層： `infra`
* この例では Repository を Prisma 2 + MySQL で構成していますが、 インターフェース名で DI しているので、後で Firebase や Mongo DB に変えるとができる構成になっている

### モジュール： `modules`
* コントローラーをモジュールごとに実装する場所になっています
* モジュールの分割単位は API の URL 設計に合わせるのがいいかなと

### 共通処理：`shared`
* 共通化した処理や、共通で使うサービスプロバイダを置いています

## テストについて
### ドメイン層のテスト
この層は他にも依存しないので、ユニットテストで書いています

### インフラ層のテスト
リポジトリのテストをユニットテストでやってもあまり意味がないので、データベースとの結合テストを書いています。

### モジュールのテスト
コントローラーは E2E テストで一緒にテストしています
テスト用のエントリーポイントを作成する関数を `src/shared/e2e-test.ts` に入れてます

## コーディング規約
### ファイル名
Nest.js の慣習に従って `.` 区切りにしています（連語はハイフン区切り）

### ESLint
ESLint は Nest.js の標準からセミコロンを消しています

### TypeScript
`strict: true` で厳密な型チェックにしていますが、バリデーションの都合で `strictPropertyInitialization` のみ `false` にしています。
