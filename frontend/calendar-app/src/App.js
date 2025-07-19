import React, { useState, useRef, useEffect } from 'react';
import Calendar from './components/Calendar/Calendar';
import ReservationForm from './components/ReservationForm/ReservationForm';
import ReservationConfirmation from './components/ReservationConfirmation/ReservationConfirmation';
import { LoginPage, RegisterPage } from './components/Auth';
import { 
  getCurrentSunday, 
  getWeekDates, 
  generateTimeSlots, 
  getDateBackgroundColor 
} from './utils/dateUtils';
import { 
  getStatusColor, 
  validateReservationForm 
} from './utils/validationUtils';
import authService from './services/authService';

function App() {
  // 認証状態
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  
  // 現在表示中の週の開始日（日曜日から開始）
  const [currentWeek, setCurrentWeek] = useState(getCurrentSunday);
  
  // 予約状況（実際のアプリではFirebaseから取得）
  const [reservations, setReservations] = useState({});
  
  // 予約フォームの表示状態
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  
  // 予約確認画面の表示状態
  const [showConfirmation, setShowConfirmation] = useState(false);

  // 予約フォームのデータ
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    service: '',
    staff: '',
    request: ''
  });
  
  // エラー状態
  const [errors, setErrors] = useState({});

  // カレンダーのref
  const calendarRef = useRef(null);

  // 初期化時にローカルストレージからユーザー情報を取得
  useEffect(() => {
    const savedUser = authService.getCurrentUser();
    if (savedUser) {
      setCurrentUser(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // ログイン処理
  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    setShowRegister(false);
  };

  // ログアウト処理
  const handleLogout = async () => {
    try {
      if (currentUser?.uid) {
        await authService.logout(currentUser.uid);
      }
    } catch (error) {
      console.error('ログアウトエラー:', error);
    } finally {
      // ローカルストレージからユーザー情報を削除
      authService.clearCurrentUser();
      
      // 状態をリセット
      setIsAuthenticated(false);
      setCurrentUser(null);
      setShowReservationForm(false);
      setShowConfirmation(false);
      setSelectedDateTime(null);
      setFormData({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        service: '',
        staff: '',
        request: ''
      });
      setErrors({});
    }
  };

  // 新規登録ページに移動
  const handleNavigateToRegister = () => {
    setShowRegister(true);
  };

  // ログインページに移動
  const handleNavigateToLogin = () => {
    setShowRegister(false);
  };

  // 認証されていない場合はログイン/登録ページを表示
  if (!isAuthenticated) {
    if (showRegister) {
      return <RegisterPage onRegister={handleLogin} onNavigateToLogin={handleNavigateToLogin} />;
    } else {
      return <LoginPage onLogin={handleLogin} onNavigateToRegister={handleNavigateToRegister} />;
    }
  }

  // 時間枠と週の日付を生成
  const timeSlots = generateTimeSlots();
  const weekDates = getWeekDates(currentWeek);

  // 前の2週間に移動
  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() - 14);
    setCurrentWeek(newDate);
  };

  // 次の2週間に移動
  const goToNextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + 14);
    setCurrentWeek(newDate);
  };

  // 予約可能な時間枠をクリックした時の処理
  const handleTimeSlotClick = (date, time) => {
    console.log('時間枠クリック:', date, time);
    
    // 日付と時間を組み合わせてDateTimeオブジェクトを作成
    const [hours, minutes] = time.split(':').map(Number);
    const selectedDate = new Date(date);
    selectedDate.setHours(hours, minutes, 0, 0);
    
    setSelectedDateTime(selectedDate);
    setShowReservationForm(true);
    
    // フォームデータをリセット
    setFormData({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      service: '',
      staff: '',
      request: ''
    });
    setErrors({});
    
    console.log('予約フォーム表示:', selectedDate);
  };

  // フォームデータの更新
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // エラーをクリア
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // 予約フォーム送信（確認画面に遷移）
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateReservationForm(formData);
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // 確認画面に遷移
      setShowReservationForm(false);
      setShowConfirmation(true);
    }
  };

  // 予約フォームを閉じる
  const closeReservationForm = () => {
    setShowReservationForm(false);
    setSelectedDateTime(null);
  };

  // 予約成功時の処理
  const handleReservationSuccess = (reservationData) => {
    console.log('予約成功:', reservationData);
    alert('予約が完了しました！');
    
    // カレンダーの予約データを更新
    if (calendarRef.current && calendarRef.current.refreshReservations) {
      calendarRef.current.refreshReservations();
    }
  };

  // 予約確定
  const handleConfirmReservation = () => {
    setShowConfirmation(false);
    setSelectedDateTime(null);
  };

  // 確認画面から戻る
  const handleBackToForm = () => {
    setShowConfirmation(false);
    setShowReservationForm(true);
  };

  return (
    <div style={{ 
      width: '100%',
      maxWidth: '100vw',
      margin: '20px auto', 
      background: '#ffffff', 
      borderRadius: 12, 
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
      padding: 24,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxSizing: 'border-box'
    }}>
      {/* ヘッダー */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '2px solid #e9ecef'
      }}>
        <h1 style={{
          margin: 0,
          color: '#2c3e50',
          fontSize: '32px',
          fontWeight: '700'
        }}>
          カレンダー予約システム
        </h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <span style={{
            color: '#6c757d',
            fontSize: '14px'
          }}>
            ようこそ、{currentUser?.displayName || currentUser?.email || 'ユーザー'}さん
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              border: '1px solid #dc3545',
              background: '#ffffff',
              color: '#dc3545',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#dc3545';
              e.target.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#ffffff';
              e.target.style.color = '#dc3545';
            }}
          >
            ログアウト
          </button>
        </div>
      </div>

      {/* カレンダー */}
      <Calendar
        ref={calendarRef}
        currentWeek={currentWeek}
        weekDates={weekDates}
        timeSlots={timeSlots}
        getDateBackgroundColor={getDateBackgroundColor}
        getStatusColor={getStatusColor}
        onPreviousWeek={goToPreviousWeek}
        onNextWeek={goToNextWeek}
        onTimeSlotClick={handleTimeSlotClick}
      />

      {/* 予約フォーム */}
      {showReservationForm && (
        <ReservationForm
          selectedDateTime={selectedDateTime}
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
          onSubmit={handleFormSubmit}
          onClose={closeReservationForm}
        />
      )}

      {/* 予約確認画面 */}
      {showConfirmation && (
        <ReservationConfirmation
          selectedDateTime={selectedDateTime}
          formData={formData}
          onConfirm={handleConfirmReservation}
          onBack={handleBackToForm}
          onReservationSuccess={handleReservationSuccess}
        />
      )}
    </div>
  );
}

export default App;