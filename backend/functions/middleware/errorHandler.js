const logger = require('../utils/logger');

// 共通エラーハンドリングミドルウェア
module.exports = async (err, req, res, next) => {
  // エラーログをファイルとFirestoreに保存
  await logger.logError({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    time: new Date().toISOString(),
    user: req.body?.email || null
  });

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'サーバーエラーが発生しました',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}; 