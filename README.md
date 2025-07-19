# カレンダー予約システム

## 📋 概要
このアプリは、美容院やサロンなどの予約管理システムです。
- ユーザー登録・ログイン機能
- カレンダーでの予約確認・作成
- 予約の管理（作成・編集・削除）

## 🛠️ 必要なソフトウェア
1. **Node.js** (バージョン 18以上)
   - [Node.js公式サイト](https://nodejs.org/)からダウンロード
2. **Git**
   - [Git公式サイト](https://git-scm.com/)からダウンロード
3. **Firebase CLI**
   - インストール方法: `npm install -g firebase-tools`

## 🚀 環境構築手順

### 1. プロジェクトのダウンロード
```bash
# プロジェクトフォルダに移動
cd AIKensyu/DAY5/CalendarApp
```

### 2. バックエンドの設定
```bash
# バックエンドフォルダに移動
cd backend

# Firebaseにログイン
firebase login

# プロジェクトを選択（初回のみ）
firebase use aikensyu-calenderapp

# 必要なパッケージをインストール
cd functions
npm install

# バックエンドをデプロイ
cd ..
firebase deploy --only functions
```

### 3. フロントエンドの設定
```bash
# フロントエンドフォルダに移動
cd ../frontend/calendar-app

# 必要なパッケージをインストール
npm install

# アプリを起動
npm start
```

## 📱 使い方

### 1. アプリにアクセス
- ブラウザで `http://localhost:3000` を開く

### 2. ユーザー登録
1. 「新規登録」をクリック
2. メールアドレスとパスワードを入力
3. 「アカウント作成」をクリック

### 3. ログイン
1. メールアドレスとパスワードを入力
2. 「ログイン」をクリック

### 4. 予約の確認・作成
1. カレンダーで日付を選択
2. 時間枠をクリック（◎マーク）
3. 予約フォームに情報を入力
4. 「予約確定」をクリック

### 5. ログアウト
- 右上の「ログアウト」ボタンをクリック

## 🔧 開発者向け情報

### フォルダ構成
```
CalendarApp/
├── backend/          # サーバー側（API）
│   ├── functions/    # Firebase Functions
│   └── firebase.json # Firebase設定
└── frontend/         # ブラウザ側（画面）
    └── calendar-app/ # Reactアプリ
```

### 主要ファイル
- **バックエンド**: `backend/functions/index.js` (APIの入り口)
- **フロントエンド**: `frontend/calendar-app/src/App.js` (アプリの入り口)

### APIエンドポイント
- ヘルスチェック: `GET /api/health`
- ユーザー登録: `POST /api/auth/register`
- ログイン: `POST /api/auth/login/email`
- 予約一覧: `GET /api/reservations`

## 🆘 よくある問題

### 1. アプリが起動しない
- Node.jsのバージョンを確認（18以上が必要）
- `npm install` を実行してパッケージを再インストール

### 2. ログインできない
- メールアドレスとパスワードが正しいか確認
- ブラウザのコンソールでエラーメッセージを確認

### 3. 予約が作成できない
- カレンダーで◎マークの時間枠を選択
- すべての必須項目を入力

## 📞 サポート
問題が解決しない場合は、以下を確認してください：
1. ブラウザのコンソール（F12キー）でエラーメッセージ
2. ターミナルでのエラーメッセージ
3. 詳細は `TROUBLESHOOTING.md` を参照

## 📝 更新履歴
- 2024年1月: 初回リリース
- 認証機能、予約機能を実装 