// 認証サービス
// 認証APIへのリクエストやローカルストレージ管理を担当
import { API_ENDPOINTS, apiRequest } from '../api/config';

class AuthService {
  // ユーザー登録API呼び出し
  async register(email, password) {
    try {
      const response = await apiRequest(API_ENDPOINTS.AUTH_REGISTER, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // メールアドレス・パスワードでログイン
  async loginWithEmail(email, password) {
    try {
      const response = await apiRequest(API_ENDPOINTS.AUTH_LOGIN_EMAIL, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // GoogleログインAPI呼び出し
  async loginWithGoogle(idToken) {
    try {
      const response = await apiRequest(API_ENDPOINTS.AUTH_LOGIN_GOOGLE, {
        method: 'POST',
        body: JSON.stringify({ idToken })
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // ログアウトAPI呼び出し
  async logout(uid) {
    try {
      const response = await apiRequest(API_ENDPOINTS.AUTH_LOGOUT, {
        method: 'POST',
        body: JSON.stringify({ uid })
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Firestoreからユーザー情報取得
  async getUserInfo(uid) {
    try {
      const response = await apiRequest(API_ENDPOINTS.AUTH_USER_INFO(uid));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // ローカルストレージからユーザー情報取得
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('currentUser');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      return null;
    }
  }

  // ローカルストレージにユーザー情報保存
  setCurrentUser(user) {
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {}
  }

  // ローカルストレージからユーザー情報削除
  clearCurrentUser() {
    try {
      localStorage.removeItem('currentUser');
    } catch (error) {}
  }

  // ログイン状態チェック
  isAuthenticated() {
    const user = this.getCurrentUser();
    return user !== null;
  }
}

export default new AuthService(); 