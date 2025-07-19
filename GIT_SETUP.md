# Git設定と投稿手順

## 📋 完了した作業

### 1. .gitignoreファイルの作成
プロジェクト全体用の`.gitignore`ファイルを作成し、以下のファイル・ディレクトリを除外：

- **node_modules/** - 依存関係パッケージ
- **logs/** - ログファイル
- ***.log** - 各種ログファイル
- **build/, dist/** - ビルド成果物
- **.env** - 環境変数ファイル
- **.firebase/** - Firebaseキャッシュ
- **firebase-debug.log** - Firebaseデバッグログ

### 2. Gitリポジトリの初期化
```bash
# Gitリポジトリを初期化
git init

# リモートリポジトリを追加
git remote add origin https://github.com/JyozukaTukasa/AI_CalnederApp.git
```

### 3. ファイルのステージングとコミット
```bash
# すべてのファイルをステージング（.gitignoreで除外されたファイルは含まれない）
git add .

# コミット
git commit -m "Initial commit: CalendarApp with authentication and reservation system"

# メインブランチに設定
git branch -M main

# リモートリポジトリにプッシュ
git push -u origin main
```

## ✅ 投稿されたファイル構成

### 📁 プロジェクト全体
- `README.md` - 環境構築と使い方ガイド
- `TROUBLESHOOTING.md` - トラブルシューティングガイド
- `DEVELOPMENT_NOTES.md` - 開発ノート
- `.gitignore` - Git除外設定

### 📁 バックエンド (backend/)
- `firebase.json` - Firebase設定
- `.firebaserc` - Firebaseプロジェクト設定
- `firestore.rules` - Firestoreセキュリティルール
- `firestore.indexes.json` - Firestoreインデックス設定
- `API_SPECIFICATION.md` - API仕様書
- `DEPLOYMENT.md` - デプロイ手順
- `DEPLOY_COMMANDS.md` - デプロイコマンド集

### 📁 Firebase Functions (backend/functions/)
- `index.js` - メインエントリーポイント
- `package.json` - 依存関係設定
- `controllers/` - APIコントローラー
- `routes/` - APIルート
- `middleware/` - ミドルウェア
- `utils/` - ユーティリティ
- `config/` - 設定ファイル

### 📁 フロントエンド (frontend/calendar-app/)
- `package.json` - 依存関係設定
- `src/` - Reactアプリケーションソース
  - `App.js` - メインアプリケーション
  - `components/` - Reactコンポーネント
  - `services/` - APIサービス
  - `utils/` - ユーティリティ
  - `api/` - API設定

## 🚫 除外されたファイル・ディレクトリ

### 依存関係
- `node_modules/` - npmパッケージ（自動生成）
- `package-lock.json` - ロックファイル（自動生成）

### ログ・キャッシュ
- `logs/` - アプリケーションログ
- `*.log` - 各種ログファイル
- `.firebase/` - Firebaseキャッシュ
- `firebase-debug.log` - Firebaseデバッグログ

### ビルド成果物
- `build/` - Reactビルド成果物
- `dist/` - 配布用ファイル

### 環境変数
- `.env` - 環境変数（機密情報）

## 🔄 今後の更新手順

### 1. 変更を確認
```bash
git status
```

### 2. 変更をステージング
```bash
git add .
```

### 3. コミット
```bash
git commit -m "変更内容の説明"
```

### 4. プッシュ
```bash
git push
```

## 📝 注意事項

### 1. 機密情報の管理
- `.env`ファイルは除外されているため、環境変数は別途設定が必要
- Firebase設定は`.firebaserc`で管理

### 2. 依存関係のインストール
新しい環境でプロジェクトを使用する場合：
```bash
# バックエンド
cd backend/functions
npm install

# フロントエンド
cd frontend/calendar-app
npm install
```

### 3. 環境設定
- Firebaseプロジェクトの設定
- 環境変数の設定
- APIエンドポイントの設定

## 🌐 リポジトリURL
https://github.com/JyozukaTukasa/AI_CalnederApp.git

---

**このリポジトリには、カレンダー予約システムの完全なソースコードとドキュメントが含まれています。** 