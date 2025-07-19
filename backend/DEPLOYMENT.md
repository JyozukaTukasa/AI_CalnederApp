# Firebase Functions デプロイ手順

## 前提条件

1. **Firebase CLI**がインストールされていること
2. **Firebase プロジェクト**が作成されていること
3. **Node.js**がインストールされていること

## セットアップ手順

### 1. Firebase CLIのインストール（未インストールの場合）

```bash
npm install -g firebase-tools
```

### 2. Firebaseにログイン

```bash
firebase login
```

### 3. プロジェクトの初期化（初回のみ）

```bash
firebase init functions
```

以下の選択肢を選んでください：
- プロジェクトを選択または作成
- JavaScriptを使用
- ESLintを使用
- 依存関係をインストール

### 4. 依存関係のインストール

```bash
cd functions
npm install
```

## デプロイ手順

### 1. 環境変数の設定（必要に応じて）

Firebase Consoleで以下の環境変数を設定：

```bash
# Firebase Console > Functions > 設定 > 環境変数
NODE_ENV=production
```

### 2. Functionsのデプロイ

```bash
# プロジェクトルートから実行
firebase deploy --only functions
```

または

```bash
# functionsディレクトリから実行
npm run deploy
```

### 3. デプロイ確認

デプロイが完了すると、以下のようなURLが表示されます：

```
✔  functions[api(us-central1)] Successful create operation. 
Function URL (api): https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api
```

## API エンドポイント

デプロイ後、以下のエンドポイントが利用可能になります：

### 認証API
- `POST https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api/auth/register`
- `POST https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api/auth/login`
- `POST https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api/auth/google`
- `POST https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api/auth/logout`
- `GET https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api/auth/profile/:uid`

### 予約API
- `POST https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api/reservations`
- `GET https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api/reservations`
- `GET https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api/reservations/:id`
- `PUT https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api/reservations/:id`
- `DELETE https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api/reservations/:id`
- `GET https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api/reservations/available-slots`

### ヘルスチェック
- `GET https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api/health`

## トラブルシューティング

### よくあるエラー

1. **権限エラー**
   ```bash
   firebase login --reauth
   ```

2. **依存関係エラー**
   ```bash
   cd functions
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **デプロイエラー**
   ```bash
   firebase functions:log
   ```

### ローカルテスト

```bash
# エミュレーターでローカルテスト
firebase emulators:start --only functions
```

## 注意事項

- 初回デプロイには数分かかる場合があります
- 無料プランの場合、月間の実行回数に制限があります
- 本番環境では適切なセキュリティルールを設定してください 