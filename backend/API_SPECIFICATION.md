# API 仕様書

## ベースURL
```
https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api
```

## 認証

### Bearer Token
APIリクエストには認証が必要な場合、AuthorizationヘッダーにBearerトークンを含めてください：

```
Authorization: Bearer YOUR_FIREBASE_ID_TOKEN
```

## エンドポイント一覧

### 1. 認証API

#### 1.1 ユーザー登録
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "displayName": "ユーザー名",
  "phone": "090-1234-5678"
}
```

**レスポンス**
```json
{
  "success": true,
  "message": "ユーザー登録が完了しました",
  "data": {
    "uid": "user_uid",
    "email": "user@example.com",
    "displayName": "ユーザー名",
    "customToken": "firebase_custom_token"
  }
}
```

#### 1.2 メール/パスワードログイン
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**レスポンス**
```json
{
  "success": true,
  "message": "ログインに成功しました",
  "data": {
    "uid": "user_uid",
    "email": "user@example.com",
    "displayName": "ユーザー名",
    "customToken": "firebase_custom_token",
    "userData": {
      "email": "user@example.com",
      "displayName": "ユーザー名",
      "role": "customer"
    }
  }
}
```

#### 1.3 Googleログイン
```http
POST /auth/google
Content-Type: application/json

{
  "idToken": "google_id_token"
}
```

**レスポンス**
```json
{
  "success": true,
  "message": "Googleログインに成功しました",
  "data": {
    "uid": "user_uid",
    "email": "user@gmail.com",
    "displayName": "ユーザー名",
    "photoURL": "https://...",
    "customToken": "firebase_custom_token",
    "userData": {
      "email": "user@gmail.com",
      "displayName": "ユーザー名",
      "role": "customer",
      "provider": "google"
    }
  }
}
```

#### 1.4 ログアウト
```http
POST /auth/logout
Content-Type: application/json

{
  "uid": "user_uid"
}
```

**レスポンス**
```json
{
  "success": true,
  "message": "ログアウトに成功しました"
}
```

#### 1.5 ユーザー情報取得
```http
GET /auth/profile/:uid
Authorization: Bearer YOUR_TOKEN
```

**レスポンス**
```json
{
  "success": true,
  "data": {
    "email": "user@example.com",
    "displayName": "ユーザー名",
    "phone": "090-1234-5678",
    "role": "customer",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. 予約API

#### 2.1 予約作成
```http
POST /reservations
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "date": "2024-01-15",
  "time": "14:30",
  "customerName": "田中太郎",
  "customerPhone": "090-1234-5678",
  "customerEmail": "tanaka@example.com",
  "service": "カット",
  "staff": "佐藤",
  "request": "短めにしてください"
}
```

**レスポンス**
```json
{
  "success": true,
  "message": "予約が作成されました",
  "data": {
    "id": "reservation_id",
    "date": "2024-01-15",
    "time": "14:30",
    "customerName": "田中太郎",
    "customerPhone": "090-1234-5678",
    "customerEmail": "tanaka@example.com",
    "service": "カット",
    "staff": "佐藤",
    "request": "短めにしてください",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 2.2 予約一覧取得
```http
GET /reservations?startDate=2024-01-01&endDate=2024-01-31&userId=user@example.com&status=confirmed
```

**クエリパラメータ**
- `startDate`: 開始日（YYYY-MM-DD）
- `endDate`: 終了日（YYYY-MM-DD）
- `userId`: ユーザーメールアドレス
- `status`: ステータス（pending, confirmed, cancelled）

**レスポンス**
```json
{
  "success": true,
  "data": [
    {
      "id": "reservation_id",
      "date": "2024-01-15",
      "time": "14:30",
      "customerName": "田中太郎",
      "customerPhone": "090-1234-5678",
      "customerEmail": "tanaka@example.com",
      "service": "カット",
      "staff": "佐藤",
      "request": "短めにしてください",
      "status": "confirmed",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### 2.3 予約詳細取得
```http
GET /reservations/:id
```

**レスポンス**
```json
{
  "success": true,
  "data": {
    "id": "reservation_id",
    "date": "2024-01-15",
    "time": "14:30",
    "customerName": "田中太郎",
    "customerPhone": "090-1234-5678",
    "customerEmail": "tanaka@example.com",
    "service": "カット",
    "staff": "佐藤",
    "request": "短めにしてください",
    "status": "confirmed",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 2.4 予約更新
```http
PUT /reservations/:id
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "date": "2024-01-16",
  "time": "15:00",
  "customerName": "田中太郎",
  "customerPhone": "090-1234-5678",
  "customerEmail": "tanaka@example.com",
  "service": "カット＋カラー",
  "staff": "田中",
  "request": "明るめの色で",
  "status": "confirmed"
}
```

**レスポンス**
```json
{
  "success": true,
  "message": "予約が更新されました",
  "data": {
    "id": "reservation_id",
    "date": "2024-01-16",
    "time": "15:00",
    "customerName": "田中太郎",
    "customerPhone": "090-1234-5678",
    "customerEmail": "tanaka@example.com",
    "service": "カット＋カラー",
    "staff": "田中",
    "request": "明るめの色で",
    "status": "confirmed",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 2.5 予約削除
```http
DELETE /reservations/:id
Authorization: Bearer YOUR_TOKEN
```

**レスポンス**
```json
{
  "success": true,
  "message": "予約が削除されました"
}
```

#### 2.6 利用可能時間取得
```http
GET /reservations/available-slots?date=2024-01-15&staff=佐藤
```

**クエリパラメータ**
- `date`: 日付（YYYY-MM-DD）
- `staff`: スタッフ名（オプション）

**レスポンス**
```json
{
  "success": true,
  "data": {
    "date": "2024-01-15",
    "availableSlots": ["09:00", "09:30", "10:00", "14:30", "15:00"],
    "allSlots": ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
    "bookedSlots": ["10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "15:30", "16:00", "16:30", "17:00", "17:30"]
  }
}
```

### 3. ヘルスチェック

#### 3.1 API状態確認
```http
GET /health
```

**レスポンス**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## エラーレスポンス

### 400 Bad Request
```json
{
  "success": false,
  "message": "バリデーションエラー",
  "errors": ["メールアドレスを入力してください"]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "認証トークンが必要です"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "予約が見つかりません"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "指定された時間は既に予約されています"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "予約の作成に失敗しました",
  "error": "エラーの詳細"
}
```

## データ形式

### 日付形式
- 日付: `YYYY-MM-DD` (例: 2024-01-15)
- 時間: `HH:mm` (例: 14:30)

### ステータス
- `pending`: 保留中
- `confirmed`: 確定
- `cancelled`: キャンセル

### 営業時間
- 開始: 09:00
- 終了: 18:00
- 間隔: 30分 