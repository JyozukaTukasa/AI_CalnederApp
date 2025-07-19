// ヘルスチェックAPI
// APIの動作状況を確認するためのエンドポイント
const healthCheck = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'API is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: 'production',
      status: 'healthy'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

module.exports = {
  healthCheck
}; // ヘルスチェック用コントローラ 