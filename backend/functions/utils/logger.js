const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const LOG_DIR = path.join(__dirname, '../../logs');
const LOG_FILE = path.join(LOG_DIR, 'app.log');

// ログディレクトリがなければ作成
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

// ファイルにログを追記
function logToFile(log) {
  const line = `[${log.time}] [${log.method || '-'}] ${log.path || '-'}: ${log.message}\n`;
  fs.appendFileSync(LOG_FILE, line);
}

// Firestoreにエラーログを保存
async function logToFirestore(log) {
  try {
    await admin.firestore().collection('logs').add(log);
  } catch (e) {
    // Firestoreへの保存失敗時は無視
  }
}

// エラーをファイルとFirestoreに保存
async function logError(log) {
  logToFile(log);
  await logToFirestore(log);
}

module.exports = {
  logError
}; 