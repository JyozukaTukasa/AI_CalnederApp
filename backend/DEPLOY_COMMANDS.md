# デプロイ用コマンド集

## 1. Firebase CLI インストール

```bash
npm install -g firebase-tools
```

## 2. Firebase ログイン

```bash
firebase login
```

## 3. プロジェクト初期化（初回のみ）

```bash
firebase init functions
```

選択肢：
- ✅ Use an existing project
- ✅ JavaScript
- ✅ ESLint
- ✅ Install dependencies with npm

## 4. 依存関係インストール

```bash
cd functions
npm install
```

## 5. ローカルテスト（オプション）

```bash
firebase emulators:start --only functions
```

## 6. デプロイ実行

```bash
# プロジェクトルートから
firebase deploy --only functions

# または functionsディレクトリから
npm run deploy
```

## 7. デプロイ確認

```bash
firebase functions:list
```

## 8. ログ確認

```bash
firebase functions:log
```

## 9. 環境変数設定（必要に応じて）

```bash
firebase functions:config:set env.NODE_ENV="production"
```

## 10. 設定確認

```bash
firebase functions:config:get
```

## 11. プロジェクト切り替え

```bash
firebase use YOUR-PROJECT-ID
```

## 12. プロジェクト一覧

```bash
firebase projects:list
```

## 13. トラブルシューティング

### 権限エラー
```bash
firebase login --reauth
```

### 依存関係エラー
```bash
cd functions
rm -rf node_modules package-lock.json
npm install
```

### キャッシュクリア
```bash
firebase logout
firebase login
```

## 14. 完全リセット（緊急時）

```bash
# プロジェクトルートから
rm -rf .firebase
firebase logout
firebase login
firebase init functions
cd functions
npm install
firebase deploy --only functions
```

## 15. デプロイ後の確認

デプロイが成功すると以下のようなメッセージが表示されます：

```
✔  functions[api(us-central1)] Successful create operation. 
Function URL (api): https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api
```

このURLがAPIのベースURLになります。 