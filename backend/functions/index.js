/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Firebase Admin SDKの初期化
initializeApp();

// Expressアプリの作成
const app = express();

// CORS設定
app.use(cors({
  origin: true,
  credentials: true
}));

// JSONボディパーサー
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// APIルートの設定
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

// 共通エラーハンドリングミドルウェア（必ず最後に）
app.use(errorHandler);

// Firebase Functions 2世代 HTTPトリガー
exports.api = onRequest({
  cors: true,
  maxInstances: 10,
}, app);

// このファイルはAPIサーバーのエントリーポイントです。
