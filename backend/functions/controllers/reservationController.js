const { logger } = require("firebase-functions");
const { getFirestore } = require("firebase-admin/firestore");

/**
 * 予約作成API
 * 新しい予約をデータベースに保存
 */
const createReservation = async (req, res) => {
  try {
    const db = getFirestore();
    const { date, time, customerName, customerPhone, customerEmail, service, staff, request } = req.body;

    // 基本的なバリデーション
    if (!date || !time || !customerName || !customerPhone || !customerEmail || !service || !staff) {
      return res.status(400).json({
        success: false,
        message: '必須項目が不足しています',
        required: ['date', 'time', 'customerName', 'customerPhone', 'customerEmail', 'service', 'staff']
      });
    }

    // 予約データを作成
    const reservationData = {
      date: String(date),
      time: String(time),
      customerName: String(customerName),
      customerPhone: String(customerPhone),
      customerEmail: String(customerEmail),
      service: String(service),
      staff: String(staff),
      request: request ? String(request) : '',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Firestoreに保存
    const docRef = await db.collection('reservations').add(reservationData);
    const reservation = { id: docRef.id, ...reservationData };

    logger.info('予約作成成功', {
      reservationId: docRef.id,
      date: reservationData.date,
      time: reservationData.time,
      customerEmail: reservationData.customerEmail,
    });

    res.status(201).json({
      success: true,
      message: '予約が作成されました',
      data: reservation,
    });

  } catch (error) {
    logger.error('予約作成エラー', error);

    res.status(500).json({
      success: false,
      message: '予約の作成に失敗しました',
      error: error.message,
    });
  }
};

/**
 * 予約一覧取得API
 * すべての予約を取得
 */
const getReservations = async (req, res) => {
  try {
    const db = getFirestore();

    const snapshot = await db.collection('reservations').get();
    const reservations = [];

    snapshot.forEach(doc => {
      reservations.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    logger.info('予約一覧取得成功', { count: reservations.length });

    res.status(200).json({
      success: true,
      data: reservations,
      count: reservations.length,
    });

  } catch (error) {
    logger.error('予約一覧取得エラー', error);

    res.status(500).json({
      success: false,
      message: '予約一覧の取得に失敗しました',
      error: error.message,
    });
  }
};

/**
 * 予約詳細取得API
 * 特定の予約の詳細情報を取得
 */
const getReservation = async (req, res) => {
  try {
    const db = getFirestore();
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: '予約IDが必要です',
      });
    }

    const doc = await db.collection('reservations').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: '予約が見つかりません',
      });
    }

    const reservation = {
      id: doc.id,
      ...doc.data(),
    };

    logger.info('予約詳細取得成功', { reservationId: id });

    res.status(200).json({
      success: true,
      data: reservation,
    });

  } catch (error) {
    logger.error('予約詳細取得エラー', error);

    res.status(500).json({
      success: false,
      message: '予約詳細の取得に失敗しました',
      error: error.message,
    });
  }
};

/**
 * 予約更新API
 * 既存の予約情報を更新
 */
const updateReservation = async (req, res) => {
  try {
    const db = getFirestore();
    const { id } = req.params;
    const { date, time, customerName, customerPhone, customerEmail, service, staff, request, status } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: '予約IDが必要です',
      });
    }

    // 既存の予約を確認
    const existingDoc = await db.collection('reservations').doc(id).get();

    if (!existingDoc.exists) {
      return res.status(404).json({
        success: false,
        message: '予約が見つかりません',
      });
    }

    const updateData = {
      updatedAt: new Date(),
    };

    // 更新可能なフィールドを追加（文字列変換）
    if (date) updateData.date = String(date);
    if (time) updateData.time = String(time);
    if (customerName) updateData.customerName = String(customerName);
    if (customerPhone) updateData.customerPhone = String(customerPhone);
    if (customerEmail) updateData.customerEmail = String(customerEmail);
    if (service) updateData.service = String(service);
    if (staff) updateData.staff = String(staff);
    if (request !== undefined) updateData.request = String(request);
    if (status) updateData.status = String(status);

    await db.collection('reservations').doc(id).update(updateData);

    const updatedDoc = await db.collection('reservations').doc(id).get();
    const reservation = {
      id: updatedDoc.id,
      ...updatedDoc.data(),
    };

    logger.info('予約更新成功', { reservationId: id });

    res.status(200).json({
      success: true,
      message: '予約が更新されました',
      data: reservation,
    });

  } catch (error) {
    logger.error('予約更新エラー', error);

    res.status(500).json({
      success: false,
      message: '予約の更新に失敗しました',
      error: error.message,
    });
  }
};

/**
 * 予約削除API
 * 指定された予約を削除
 */
const deleteReservation = async (req, res) => {
  try {
    const db = getFirestore();
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: '予約IDが必要です',
      });
    }

    const doc = await db.collection('reservations').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: '予約が見つかりません',
      });
    }

    await db.collection('reservations').doc(id).delete();

    logger.info('予約削除成功', { reservationId: id });

    res.status(200).json({
      success: true,
      message: '予約が削除されました',
    });

  } catch (error) {
    logger.error('予約削除エラー', error);

    res.status(500).json({
      success: false,
      message: '予約の削除に失敗しました',
      error: error.message,
    });
  }
};

module.exports = {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation
};
