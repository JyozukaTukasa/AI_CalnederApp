import React from 'react';

// カレンダーのテーブル本体（時間枠と予約状況の表示）
function CalendarTable({ 
  weekDates, 
  timeSlots, 
  reservations = [],
  getDateBackgroundColor, 
  getStatusColor, 
  onTimeSlotClick 
}) {
  // 曜日を取得
  const getDayOfWeek = (date) => {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return days[date.getDay()];
  };

  // 日付をYYYY-MM-DD形式に変換
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 指定された日付と時間の予約を取得
  const getReservationForSlot = (date, time) => {
    const dateStr = formatDate(date);
    const reservation = reservations.find(reservation => 
      reservation.date === dateStr && reservation.time === time
    );
    
    // デバッグ用ログ
    if (reservation) {
      console.log(`予約発見: ${dateStr} ${time} - ${reservation.customerName}`);
    }
    
    return reservation;
  };

  // 予約状況を取得（Firebaseデータのみ使用）
  const getReservationStatus = (date, time) => {
    const reservation = getReservationForSlot(date, time);
    
    if (reservation) {
      // 予約がある場合は予約済みとして表示
      return {
        status: '×',
        color: '#dc3545',
        tooltip: `${reservation.customerName} - ${reservation.service}`,
        clickable: false
      };
    } else {
      // 予約がない場合は予約可能として表示
      return {
        status: '◎',
        color: '#28a745',
        tooltip: '予約可能',
        clickable: true
      };
    }
  };

  // デバッグ情報を表示
  console.log('CalendarTable - 予約データ:', reservations);
  console.log('CalendarTable - 週の日付:', weekDates.map(d => formatDate(d)));
  console.log('CalendarTable - 時間枠:', timeSlots);

  return (
    <div style={{ 
      width: '100%',
      borderRadius: 8, 
      border: '1px solid #e9ecef',
      overflow: 'hidden'
    }}>
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        background: '#ffffff',
        tableLayout: 'fixed'
      }}>
        <thead>
          <tr>
            <th style={{ 
              border: '1px solid #dee2e6', 
              padding: '12px 8px', 
              background: '#495057', 
              color: '#ffffff',
              width: '7%',
              fontSize: '13px',
              fontWeight: '600'
            }}>
              時間
            </th>
            {weekDates.map((date, index) => (
              <th
                key={index}
                style={{
                  border: '1px solid #dee2e6',
                  padding: '8px 4px',
                  background: getDateBackgroundColor(date),
                  width: '6.6%',
                  textAlign: 'center',
                  fontSize: '12px'
                }}
              >
                <div style={{ 
                  fontWeight: '600', 
                  color: '#495057',
                  marginBottom: '2px'
                }}>
                  {getDayOfWeek(date)}
                </div>
                <div style={{ 
                  color: '#6c757d',
                  fontSize: '14px',
                  fontWeight: '700'
                }}>
                  {date.getDate()}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, timeIndex) => (
            <tr key={time} style={{ background: timeIndex % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
              <td style={{ 
                border: '1px solid #dee2e6', 
                padding: '8px 4px', 
                background: '#6c757d', 
                color: '#ffffff',
                fontWeight: '600',
                fontSize: '12px',
                textAlign: 'center'
              }}>
                {time}
              </td>
              {weekDates.map((date, dateIndex) => {
                const reservationInfo = getReservationStatus(date, time);
                
                return (
                  <td
                    key={dateIndex}
                    style={{
                      border: '1px solid #dee2e6',
                      padding: '8px 4px',
                      textAlign: 'center',
                      background: getDateBackgroundColor(date),
                      cursor: reservationInfo.clickable ? 'pointer' : 'default',
                      transition: 'background-color 0.2s ease',
                      position: 'relative'
                    }}
                    onClick={() => reservationInfo.clickable && onTimeSlotClick(date, time)}
                    onMouseOver={(e) => {
                      if (reservationInfo.clickable) {
                        e.target.style.background = '#e3f2fd';
                      }
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = getDateBackgroundColor(date);
                    }}
                    title={reservationInfo.tooltip}
                  >
                    <span style={{ 
                      fontSize: '16px', 
                      fontWeight: 'bold',
                      color: reservationInfo.color
                    }}>
                      {reservationInfo.status}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CalendarTable; 