// 日付関連のユーティリティ関数

// 日付をYYYY-MM-DD形式に変換
export const formatDate = (date) => date.toISOString().split('T')[0];

// 2週間分の日付を生成（日曜日から開始）
export const getWeekDates = (startDate) => {
  const dates = [];
  for (let i = 0; i < 14; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }
  return dates;
};

// 30分刻みの時間帯を生成（10:00-17:30）
export const generateTimeSlots = () => {
  const timeSlots = [];
  for (let hour = 10; hour <= 17; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    if (hour < 17) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
    } else {
      // 17時半を追加
      timeSlots.push('17:30');
    }
  }
  return timeSlots;
};

// 日付の背景色を取得
export const getDateBackgroundColor = (date) => {
  const day = date.getDay();
  if (day === 0) return '#ffebee'; // 日曜日：薄い赤
  if (day === 6) return '#e3f2fd'; // 土曜日：薄い青
  return '#ffffff'; // 平日：白
};

// 現在の日付から最も近い日曜日を取得
export const getCurrentSunday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=日曜日, 1=月曜日, ..., 6=土曜日
  const daysToSubtract = dayOfWeek; // 日曜日まで戻す
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - daysToSubtract);
  return sunday;
}; 