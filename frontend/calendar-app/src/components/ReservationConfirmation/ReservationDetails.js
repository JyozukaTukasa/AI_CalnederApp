import React from 'react';

// 予約内容を表示するコンポーネント
function ReservationDetails({ selectedDateTime, formData }) {
  // selectedDateTimeがnullの場合は何も表示しない
  if (!selectedDateTime) {
    return null;
  }

  const formatSelectedDate = (date) => {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const formatSelectedTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div style={{
      background: '#ffffff',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #e9ecef',
      height: 'fit-content'
    }}>
      {/* 予約日時 */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          margin: '0 0 12px 0',
          color: '#2c3e50',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          予約日時
        </h4>
        <div style={{
          background: '#e3f2fd',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #bbdefb'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1976d2',
            marginBottom: '4px'
          }}>
            {formatSelectedDate(selectedDateTime)}
          </div>
          <div style={{
            fontSize: '16px',
            color: '#1976d2'
          }}>
            {formatSelectedTime(selectedDateTime)}
          </div>
        </div>
      </div>

      {/* お客様情報 */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          margin: '0 0 12px 0',
          color: '#2c3e50',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          お客様情報
        </h4>
        <div style={{
          background: '#f8f9fa',
          padding: '16px',
          borderRadius: '8px'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: '600', color: '#495057' }}>氏名: </span>
            <span style={{ color: '#6c757d' }}>{formData.customerName}</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: '600', color: '#495057' }}>電話番号: </span>
            <span style={{ color: '#6c757d' }}>{formData.customerPhone}</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: '600', color: '#495057' }}>Email: </span>
            <span style={{ color: '#6c757d' }}>{formData.customerEmail}</span>
          </div>
        </div>
      </div>

      {/* サービス情報 */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          margin: '0 0 12px 0',
          color: '#2c3e50',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          サービス情報
        </h4>
        <div style={{
          background: '#f8f9fa',
          padding: '16px',
          borderRadius: '8px'
        }}>
          {formData.service && (
            <div style={{ marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', color: '#495057' }}>サービス: </span>
              <span style={{ color: '#6c757d' }}>{formData.service}</span>
            </div>
          )}
          {formData.staff && (
            <div style={{ marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', color: '#495057' }}>スタッフ: </span>
              <span style={{ color: '#6c757d' }}>{formData.staff}</span>
            </div>
          )}
          {formData.request && (
            <div>
              <span style={{ fontWeight: '600', color: '#495057' }}>ご要望: </span>
              <div style={{ 
                color: '#6c757d', 
                marginTop: '4px',
                whiteSpace: 'pre-wrap'
              }}>
                {formData.request}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReservationDetails; 