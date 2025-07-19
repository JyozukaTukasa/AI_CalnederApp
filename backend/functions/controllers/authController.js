const admin = require('firebase-admin');

// ユーザー登録API
// メールアドレスとパスワードで新規ユーザーを作成し、Firestoreに記録
const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const err = new Error('メールアドレスとパスワードは必須です');
      err.status = 400;
      throw err;
    }
    // Firebase Authでユーザー作成
    const userRecord = await admin.auth().createUser({ email, password });
    // Firestoreに記録（パスワードは保存しない）
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(201).json({
      success: true,
      message: 'ユーザー登録が完了しました',
      data: {
        uid: userRecord.uid,
        email: userRecord.email
      }
    });
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      error.status = 400;
      error.message = 'このメールアドレスは既に使用されています';
    }
    if (error.code === 'auth/weak-password') {
      error.status = 400;
      error.message = 'パスワードは6文字以上で入力してください';
    }
    next(error);
  }
};

// メールアドレスでログインAPI
// メールアドレスでユーザーを検索し、存在すればOK
const loginWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const err = new Error('メールアドレスとパスワードは必須です');
      err.status = 400;
      throw err;
    }
    // Firebase Authでユーザー取得
    const userRecord = await admin.auth().getUserByEmail(email);
    // Firestoreからユーザー情報取得
    const userDoc = await admin.firestore().collection('users').doc(userRecord.uid).get();
    if (!userDoc.exists) {
      const err = new Error('ユーザーが見つかりません');
      err.status = 404;
      throw err;
    }
    res.status(200).json({
      success: true,
      message: 'ログインに成功しました',
      data: {
        uid: userRecord.uid,
        email: userRecord.email
      }
    });
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      error.status = 404;
      error.message = 'ユーザーが見つかりません';
    }
    next(error);
  }
};

// GoogleログインAPI
// GoogleのIDトークンを検証し、Firestoreに記録
const loginWithGoogle = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      const err = new Error('IDトークンは必須です');
      err.status = 400;
      throw err;
    }
    // IDトークンを検証
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    // Firestoreにユーザーがなければ新規作成
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    if (!userDoc.exists) {
      await admin.firestore().collection('users').doc(uid).set({
        email: decodedToken.email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }
    res.status(200).json({
      success: true,
      message: 'Googleログインに成功しました',
      data: {
        uid,
        email: decodedToken.email
      }
    });
  } catch (error) {
    next(error);
  }
};

// ログアウトAPI（ダミー）
const logout = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'ログアウトしました'
    });
  } catch (error) {
    next(error);
  }
};

// ユーザー情報取得API
const getUserInfo = async (req, res, next) => {
  try {
    const { uid } = req.params;
    // Firestoreからユーザー情報取得
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    if (!userDoc.exists) {
      const err = new Error('ユーザーが見つかりません');
      err.status = 404;
      throw err;
    }
    const userData = userDoc.data();
    res.status(200).json({
      success: true,
      data: {
        uid,
        email: userData.email,
        createdAt: userData.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginWithEmail,
  loginWithGoogle,
  logout,
  getUserInfo
}; 