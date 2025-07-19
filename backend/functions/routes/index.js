const express = require('express');
const router = express.Router();

// ルート定義ファイル
// 各APIカテゴリのルートをまとめて管理
const healthRoutes = require('./healthRoutes');
const reservationRoutes = require('./reservationRoutes');
const authRoutes = require('./authRoutes');

// ルートを設定
router.use('/health', healthRoutes); // ヘルスチェック
router.use('/reservations', reservationRoutes); // 予約API
router.use('/auth', authRoutes); // 認証API

// 404エラーハンドリング
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'エンドポイントが見つかりません',
    availableEndpoints: [
      'GET /api/health',
      'GET /api/reservations',
      'POST /api/reservations',
      'GET /api/reservations/:id',
      'PUT /api/reservations/:id',
      'DELETE /api/reservations/:id',
      'POST /api/auth/register',
      'POST /api/auth/login/email',
      'POST /api/auth/login/google',
      'POST /api/auth/logout',
      'GET /api/auth/user/:uid'
    ]
  });
});

module.exports = router;
