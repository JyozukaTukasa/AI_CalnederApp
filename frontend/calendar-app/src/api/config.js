// API設定・共通リクエスト関数
// バックエンドAPIのエンドポイントとfetchラッパーを管理

export const API_BASE_URL = 'https://api-v7giyqljva-uc.a.run.app';

// APIエンドポイント一覧
export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/api/health`,
  RESERVATIONS: `${API_BASE_URL}/api/reservations`,
  RESERVATION_BY_ID: (id) => `${API_BASE_URL}/api/reservations/${id}`,
  // 認証エンドポイント
  AUTH_REGISTER: `${API_BASE_URL}/api/auth/register`,
  AUTH_LOGIN_EMAIL: `${API_BASE_URL}/api/auth/login/email`,
  AUTH_LOGIN_GOOGLE: `${API_BASE_URL}/api/auth/login/google`,
  AUTH_LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  AUTH_USER_INFO: (uid) => `${API_BASE_URL}/api/auth/user/${uid}`,
};

// 共通APIリクエスト関数
// fetchをラップし、エラー処理も統一
export const apiRequest = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    return data;
  } catch (error) {
    // APIリクエスト失敗時の共通エラーハンドリング
    console.error('API request failed:', error);
    throw error;
  }
}; 