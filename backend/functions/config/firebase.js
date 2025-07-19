const admin = require("firebase-admin");

// Firebase Admin SDKの初期化
if (!admin.apps.length) {
  admin.initializeApp();
}

// Firestoreデータベースの参照
const db = admin.firestore();

// Authの参照
const auth = admin.auth();

module.exports = {
  admin,
  db,
  auth,
}; 