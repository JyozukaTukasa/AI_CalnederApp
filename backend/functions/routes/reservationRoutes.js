const express = require('express');
const router = express.Router();
const { 
  createReservation, 
  getReservations, 
  getReservation, 
  updateReservation, 
  deleteReservation 
} = require('../controllers/reservationController');

// 予約APIルート
router.get('/', getReservations); // 一覧取得
router.post('/', createReservation); // 作成
router.get('/:id', getReservation); // 詳細取得
router.put('/:id', updateReservation); // 更新
router.delete('/:id', deleteReservation); // 削除

module.exports = router; // 予約用ルート 