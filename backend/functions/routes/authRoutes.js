const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginWithEmail,
  loginWithGoogle,
  logout,
  getUserInfo
} = require('../controllers/authController');

// 認証APIルート
router.post('/register', registerUser); // 新規登録
router.post('/login/email', loginWithEmail); // メールログイン
router.post('/login/google', loginWithGoogle); // Googleログイン
router.post('/logout', logout); // ログアウト
router.get('/user/:uid', getUserInfo); // ユーザー情報取得

module.exports = router; // 認証用ルート 