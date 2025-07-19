import React from 'react';

// カレンダーの上部ナビゲーション（前週・次週ボタンとタイトル）
function CalendarHeader({ currentWeek, onPreviousWeek, onNextWeek }) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: 20,
      padding: '12px 16px',
      background: '#f8f9fa',
      borderRadius: 8
    }}>
      <button
        onClick={onPreviousWeek}
        style={{ 
          padding: '8px 16px', 
          borderRadius: 6, 
          border: '2px solid #3498db', 
          background: '#ffffff', 
          color: '#3498db', 
          cursor: 'pointer',
          fontWeight: '600',
          transition: 'all 0.2s ease',
          fontSize: '13px'
        }}
        onMouseOver={(e) => {
          e.target.style.background = '#3498db';
          e.target.style.color = '#ffffff';
        }}
        onMouseOut={(e) => {
          e.target.style.background = '#ffffff';
          e.target.style.color = '#3498db';
        }}
      >
        ← 前の2週間
      </button>
      <h2 style={{ 
        margin: 0, 
        color: '#2c3e50',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        {currentWeek.getMonth() + 1}月の予約状況
      </h2>
      <button
        onClick={onNextWeek}
        style={{ 
          padding: '8px 16px', 
          borderRadius: 6, 
          border: '2px solid #3498db', 
          background: '#ffffff', 
          color: '#3498db', 
          cursor: 'pointer',
          fontWeight: '600',
          transition: 'all 0.2s ease',
          fontSize: '13px'
        }}
        onMouseOver={(e) => {
          e.target.style.background = '#3498db';
          e.target.style.color = '#ffffff';
        }}
        onMouseOut={(e) => {
          e.target.style.background = '#ffffff';
          e.target.style.color = '#3498db';
        }}
      >
        次の2週間 →
      </button>
    </div>
  );
}

export default CalendarHeader; 