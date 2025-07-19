const express = require('express');
const router = express.Router();
const { healthCheck } = require('../controllers/healthController');

// ヘルスチェックAPI
router.get('/', healthCheck);

module.exports = router; // ヘルスチェック用ルート 