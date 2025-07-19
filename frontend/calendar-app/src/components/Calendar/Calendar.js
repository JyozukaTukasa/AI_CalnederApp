import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarTable from './CalendarTable';
import CalendarFooter from './CalendarFooter';
import { API_ENDPOINTS, apiRequest } from '../../api/config';

// カレンダーのメインコンポーネント
const Calendar = forwardRef(({ 
  currentWeek,
  weekDates,
  timeSlots,
  getDateBackgroundColor,
  getStatusColor,
  onPreviousWeek,
  onNextWeek,
  onTimeSlotClick
}, ref) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 予約データを取得
  const fetchReservations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiRequest(API_ENDPOINTS.RESERVATIONS);
      const reservationData = response.data || [];
      setReservations(reservationData);
      console.log('予約データ取得成功:', reservationData);
      console.log('予約データ件数:', reservationData.length);
      
      // 各予約データの詳細をログ出力
      reservationData.forEach((reservation, index) => {
        console.log(`予約${index + 1}:`, {
          date: reservation.date,
          time: reservation.time,
          customerName: reservation.customerName,
          service: reservation.service
        });
      });
    } catch (err) {
      setError('予約データの取得に失敗しました');
      console.error('予約データ取得エラー:', err);
    } finally {
      setLoading(false);
    }
  };

  // コンポーネントマウント時に予約データを取得
  useEffect(() => {
    fetchReservations();
  }, []);

  // 予約データを更新する関数（外部から呼び出し可能）
  const refreshReservations = () => {
    console.log('予約データを更新中...');
    fetchReservations();
  };

  // 予約データを親コンポーネントに渡す
  useImperativeHandle(ref, () => ({
    refreshReservations,
    reservations
  }));

  return (
    <>
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#f0f8ff',
          marginBottom: '10px'
        }}>
          予約データを読み込み中...
        </div>
      )}
      
      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#ffe6e6',
          color: '#d32f2f',
          marginBottom: '10px'
        }}>
          {error}
        </div>
      )}

      {/* デバッグ情報 */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '8px', 
        marginBottom: '10px', 
        fontSize: '12px',
        color: '#6c757d',
        borderRadius: '4px'
      }}>
        現在の予約データ: {reservations.length}件
        {reservations.length > 0 && (
          <div style={{ marginTop: '4px' }}>
            最新予約: {reservations[reservations.length - 1]?.date} {reservations[reservations.length - 1]?.time}
          </div>
        )}
      </div>

      <CalendarHeader 
        currentWeek={currentWeek}
        onPreviousWeek={onPreviousWeek}
        onNextWeek={onNextWeek}
      />
      
      <CalendarTable 
        weekDates={weekDates}
        timeSlots={timeSlots}
        reservations={reservations}
        getDateBackgroundColor={getDateBackgroundColor}
        getStatusColor={getStatusColor}
        onTimeSlotClick={onTimeSlotClick}
      />
      
      <CalendarFooter 
        onPreviousWeek={onPreviousWeek}
        onNextWeek={onNextWeek}
      />
    </>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar; 