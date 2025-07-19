import React from 'react';

// カレンダーの下部（凡例とナビゲーションボタン）
function CalendarFooter({ onPreviousWeek, onNextWeek }) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginTop: 20,
      padding: '16px',
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
      <div style={{ 
        color: '#495057',
        fontSize: '13px',
        fontWeight: '500'
      }}>
        <span style={{ 
          marginRight: 20,
          padding: '6px 12px',
          background: '#d4edda',
          borderRadius: 4,
          color: '#155724'
        }}>
          ◎: 予約可能
        </span>
        <span style={{ 
          marginRight: 16,
          padding: '6px 12px',
          background: '#f8d7da',
          borderRadius: 4,
          color: '#721c24'
        }}>
          ×: 予約不可
        </span>
      </div>
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

export default CalendarFooter; 