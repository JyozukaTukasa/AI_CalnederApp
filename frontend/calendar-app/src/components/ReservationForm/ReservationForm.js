import React from 'react';

// 予約フォームのメインコンポーネント
function ReservationForm({ 
  selectedDateTime, 
  formData, 
  errors, 
  onInputChange, 
  onSubmit, 
  onClose 
}) {
  if (!selectedDateTime) return null;

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
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: 12,
        padding: 32,
        maxWidth: 500,
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24
        }}>
          <h2 style={{
            margin: 0,
            color: '#2c3e50',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            予約フォーム
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6c757d'
            }}
          >
            ×
          </button>
        </div>

        <div style={{
          background: '#f8f9fa',
          padding: 16,
          borderRadius: 8,
          marginBottom: 24
        }}>
          <strong>予約日時:</strong> {formatSelectedDate(selectedDateTime)} {formatSelectedTime(selectedDateTime)}
        </div>

        <form onSubmit={onSubmit}>
          {/* 氏名 */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              marginBottom: 8,
              fontWeight: '600',
              color: '#495057'
            }}>
              氏名 <span style={{ color: '#dc3545' }}>*</span>
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName || ''}
              onChange={onInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.customerName ? '#dc3545' : '#ced4da'}`,
                borderRadius: 6,
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              placeholder="山田太郎"
            />
            {errors.customerName && (
              <div style={{ color: '#dc3545', fontSize: '12px', marginTop: 4 }}>
                {errors.customerName}
              </div>
            )}
          </div>

          {/* 電話番号 */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              marginBottom: 8,
              fontWeight: '600',
              color: '#495057'
            }}>
              電話番号 <span style={{ color: '#dc3545' }}>*</span>
            </label>
            <input
              type="tel"
              name="customerPhone"
              value={formData.customerPhone || ''}
              onChange={onInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.customerPhone ? '#dc3545' : '#ced4da'}`,
                borderRadius: 6,
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              placeholder="090-1234-5678"
            />
            {errors.customerPhone && (
              <div style={{ color: '#dc3545', fontSize: '12px', marginTop: 4 }}>
                {errors.customerPhone}
              </div>
            )}
          </div>

          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              marginBottom: 8,
              fontWeight: '600',
              color: '#495057'
            }}>
              Email <span style={{ color: '#dc3545' }}>*</span>
            </label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail || ''}
              onChange={onInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.customerEmail ? '#dc3545' : '#ced4da'}`,
                borderRadius: 6,
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              placeholder="example@email.com"
            />
            {errors.customerEmail && (
              <div style={{ color: '#dc3545', fontSize: '12px', marginTop: 4 }}>
                {errors.customerEmail}
              </div>
            )}
          </div>

          {/* サービス */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              marginBottom: 8,
              fontWeight: '600',
              color: '#495057'
            }}>
              サービス <span style={{ color: '#dc3545' }}>*</span>
            </label>
            <select
              name="service"
              value={formData.service || ''}
              onChange={onInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.service ? '#dc3545' : '#ced4da'}`,
                borderRadius: 6,
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            >
              <option value="">サービスを選択してください</option>
              <option value="カット">カット</option>
              <option value="カラー">カラー</option>
              <option value="カット＋カラー">カット＋カラー</option>
              <option value="カット＋カラー＋トリートメント">カット＋カラー＋トリートメント</option>
              <option value="パーマー">パーマー</option>
              <option value="髪質改善">髪質改善</option>
            </select>
            {errors.service && (
              <div style={{ color: '#dc3545', fontSize: '12px', marginTop: 4 }}>
                {errors.service}
              </div>
            )}
          </div>

          {/* スタッフ */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              marginBottom: 8,
              fontWeight: '600',
              color: '#495057'
            }}>
              スタッフ <span style={{ color: '#dc3545' }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: 16 }}>
              {['佐藤', '田中', '鈴木'].map(staff => (
                <label key={staff} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="staff"
                    value={staff}
                    checked={formData.staff === staff}
                    onChange={onInputChange}
                  />
                  {staff}
                </label>
              ))}
            </div>
            {errors.staff && (
              <div style={{ color: '#dc3545', fontSize: '12px', marginTop: 4 }}>
                {errors.staff}
              </div>
            )}
          </div>

          {/* ご要望 */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: 'block',
              marginBottom: 8,
              fontWeight: '600',
              color: '#495057'
            }}>
              ご要望
            </label>
            <textarea
              name="request"
              value={formData.request || ''}
              onChange={onInputChange}
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ced4da',
                borderRadius: 6,
                fontSize: '14px',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
              placeholder="ご要望があればお聞かせください"
            />
          </div>

          {/* ボタン */}
          <div style={{
            display: 'flex',
            gap: 12
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                border: '2px solid #6c757d',
                background: '#ffffff',
                color: '#6c757d',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              キャンセル
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '12px',
                border: 'none',
                background: '#007bff',
                color: '#ffffff',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              確認画面へ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm; 