import React, { useState } from 'react';
import ShopInfo from './ShopInfo';
import ReservationDetails from './ReservationDetails';
import { API_ENDPOINTS, apiRequest } from '../../api/config';

// 予約確認画面のメインコンポーネント
function ReservationConfirmation({ 
  selectedDateTime, 
  formData, 
  onConfirm, 
  onBack,
  onReservationSuccess 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // selectedDateTimeがnullの場合は何も表示しない
  if (!selectedDateTime) {
    return null;
  }

  // 予約データをFirebaseに送信
  const handleConfirmReservation = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // 日付をYYYY-MM-DD形式に変換
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      // 時間をHH:MM形式に変換
      const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
      };

      // 送信データを作成
      const reservationData = {
        date: formatDate(selectedDateTime),
        time: formatTime(selectedDateTime),
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail,
        service: formData.service,
        staff: formData.staff,
        request: formData.request || ''
      };

      console.log('送信する予約データ:', reservationData);

      // Firebaseに送信
      const response = await apiRequest(API_ENDPOINTS.RESERVATIONS, {
        method: 'POST',
        body: JSON.stringify(reservationData)
      });

      console.log('予約作成成功:', response);

      // 成功時の処理
      if (onReservationSuccess) {
        onReservationSuccess(response.data);
      }

      // 確認ボタンの処理を実行
      onConfirm();

    } catch (err) {
      console.error('予約作成エラー:', err);
      setError(err.message || '予約の作成に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        {/* タイトル */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <h2 style={{
            margin: 0,
            color: '#2c3e50',
            fontSize: '28px',
            fontWeight: '600',
            borderBottom: '3px solid #3498db',
            paddingBottom: '12px'
          }}>
            ご予約内容
          </h2>
        </div>

        {/* エラーメッセージ */}
        {error && (
          <div style={{
            background: '#ffe6e6',
            color: '#d32f2f',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* メインコンテンツ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* 左側：店舗情報 */}
          <ShopInfo />

          {/* 右側：予約内容 */}
          <ReservationDetails 
            selectedDateTime={selectedDateTime}
            formData={formData}
          />
        </div>

        {/* ボタン */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <button
            onClick={onBack}
            disabled={isSubmitting}
            style={{
              padding: '12px 32px',
              border: '2px solid #6c757d',
              background: '#ffffff',
              color: '#6c757d',
              borderRadius: '8px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              opacity: isSubmitting ? 0.6 : 1
            }}
            onMouseOver={(e) => {
              if (!isSubmitting) {
                e.target.style.background = '#6c757d';
                e.target.style.color = '#ffffff';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#ffffff';
              e.target.style.color = '#6c757d';
            }}
          >
            戻る
          </button>
          <button
            onClick={handleConfirmReservation}
            disabled={isSubmitting}
            style={{
              padding: '12px 32px',
              border: 'none',
              background: isSubmitting ? '#6c757d' : '#28a745',
              color: '#ffffff',
              borderRadius: '8px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              if (!isSubmitting) {
                e.target.style.background = '#218838';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.background = isSubmitting ? '#6c757d' : '#28a745';
            }}
          >
            {isSubmitting ? '送信中...' : '予約確定'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationConfirmation; 