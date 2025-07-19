// バリデーション関連のユーティリティ関数

// 予約フォームのバリデーション
export const validateReservationForm = (formData) => {
  const errors = {};
  
  if (!formData.customerName?.trim()) {
    errors.customerName = '氏名は必須です';
  }
  
  if (!formData.customerPhone?.trim()) {
    errors.customerPhone = '電話番号は必須です';
  }
  
  if (!formData.customerEmail?.trim()) {
    errors.customerEmail = 'Emailは必須です';
  } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
    errors.customerEmail = '正しいEmail形式で入力してください';
  }
  
  if (!formData.service?.trim()) {
    errors.service = 'サービスは必須です';
  }
  
  if (!formData.staff?.trim()) {
    errors.staff = 'スタッフは必須です';
  }
  
  return errors;
};

// 予約状況の色を取得
export const getStatusColor = (status) => {
  return status === '◎' ? '#28a745' : '#dc3545';
}; 