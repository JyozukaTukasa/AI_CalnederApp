// ログインページコンポーネント
// メールアドレス・パスワードでログイン
import React, { useState } from 'react';
import authService from '../../services/authService';

function LoginPage({ onLogin, onNavigateToRegister }) {
  // フォーム状態
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 入力変更ハンドラ
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (loginError) setLoginError('');
  };

  // フォームバリデーション
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'メールアドレスは必須です';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '正しいメールアドレス形式で入力してください';
    if (!formData.password.trim()) newErrors.password = 'パスワードは必須です';
    else if (formData.password.length < 6) newErrors.password = 'パスワードは6文字以上で入力してください';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ログイン処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setLoginError('');
    try {
      const userData = await authService.loginWithEmail(formData.email, formData.password);
      authService.setCurrentUser(userData);
      onLogin(userData);
    } catch (error) {
      setLoginError(error.message || 'ログインに失敗しました');
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
          ログイン
        </h1>

        {/* ログインエラーメッセージ */}
        {loginError && (
          <div style={{
            background: '#fee',
            color: '#c33',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {loginError}
          </div>
        )}

        {/* ログインフォーム */}
        <form onSubmit={handleSubmit}>
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
          <div style={{ marginBottom: '24px' }}>
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
              placeholder="パスワードを入力"
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

          {/* ログインボタン */}
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
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>

        {/* 新規登録リンク */}
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#6c757d'
        }}>
          アカウントをお持ちでない方は
          <button
            onClick={onNavigateToRegister}
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
            新規登録
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage; 