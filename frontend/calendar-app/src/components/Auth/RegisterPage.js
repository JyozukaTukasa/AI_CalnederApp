// 新規登録ページコンポーネント
// メールアドレス・パスワードで新規登録
import React, { useState } from 'react';
import authService from '../../services/authService';

function RegisterPage({ onRegister, onNavigateToLogin }) {
  // フォーム状態
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 入力変更ハンドラ
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (registerError) setRegisterError('');
    if (registerSuccess) setRegisterSuccess('');
  };

  // フォームバリデーション
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'メールアドレスは必須です';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '正しいメールアドレス形式で入力してください';
    if (!formData.password.trim()) newErrors.password = 'パスワードは必須です';
    else if (formData.password.length < 6) newErrors.password = 'パスワードは6文字以上で入力してください';
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'パスワード確認は必須です';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'パスワードが一致しません';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 新規登録処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setRegisterError('');
    try {
      const userData = await authService.register(formData.email, formData.password);
      authService.setCurrentUser(userData);
      setRegisterSuccess('アカウントが正常に作成されました！');
      setFormData({ email: '', password: '', confirmPassword: '' });
      setErrors({});
      setTimeout(() => { onRegister(userData); }, 1500);
    } catch (error) {
      setRegisterError(error.message || 'アカウント作成に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px'
      }}>
        {/* タイトル */}
        <h1 style={{
          textAlign: 'center',
          marginBottom: '32px',
          color: '#2c3e50',
          fontSize: '28px',
          fontWeight: '600'
        }}>
          新規登録
        </h1>

        {/* 登録エラーメッセージ */}
        {registerError && (
          <div style={{
            background: '#fee',
            color: '#c33',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {registerError}
          </div>
        )}

        {/* 登録成功メッセージ */}
        {registerSuccess && (
          <div style={{
            background: '#efe',
            color: '#3c3',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>
              {registerSuccess}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              まもなくカレンダー画面に移動します...
            </div>
          </div>
        )}

        {/* 登録フォーム */}
        <form onSubmit={handleSubmit} style={{ 
          opacity: registerSuccess ? 0.6 : 1, 
          pointerEvents: registerSuccess ? 'none' : 'auto' 
        }}>
          {/* メールアドレス */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#495057',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              メールアドレス
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: errors.email ? '2px solid #e74c3c' : '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box',
                opacity: isLoading ? 0.7 : 1
              }}
              placeholder="example@email.com"
            />
            {errors.email && (
              <div style={{
                color: '#e74c3c',
                fontSize: '12px',
                marginTop: '4px'
              }}>
                {errors.email}
              </div>
            )}
          </div>

          {/* パスワード */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#495057',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              パスワード
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: errors.password ? '2px solid #e74c3c' : '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box',
                opacity: isLoading ? 0.7 : 1
              }}
              placeholder="6文字以上で入力"
            />
            {errors.password && (
              <div style={{
                color: '#e74c3c',
                fontSize: '12px',
                marginTop: '4px'
              }}>
                {errors.password}
              </div>
            )}
          </div>

          {/* パスワード確認 */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#495057',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              パスワード確認
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: errors.confirmPassword ? '2px solid #e74c3c' : '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box',
                opacity: isLoading ? 0.7 : 1
              }}
              placeholder="パスワードを再入力"
            />
            {errors.confirmPassword && (
              <div style={{
                color: '#e74c3c',
                fontSize: '12px',
                marginTop: '4px'
              }}>
                {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* 登録ボタン */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              background: isLoading ? '#6c757d' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s ease',
              marginBottom: '20px',
              opacity: isLoading ? 0.7 : 1
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {isLoading ? '登録中...' : 'アカウント作成'}
          </button>
        </form>

        {/* ログインリンク */}
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#6c757d'
        }}>
          既にアカウントをお持ちの方は
          <button
            onClick={onNavigateToLogin}
            disabled={isLoading}
            style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              textDecoration: 'underline',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              marginLeft: '4px'
            }}
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage; 