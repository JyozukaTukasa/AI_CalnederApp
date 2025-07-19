import React, { useState } from 'react';
import { SHOP_INFO } from '../../utils/constants';

// 店舗情報を表示するコンポーネント
function ShopInfo() {
  const [imageError, setImageError] = useState(false);

  const handleAddressClick = () => {
    window.open(SHOP_INFO.googleMapsUrl, '_blank');
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div style={{
      background: '#f8f9fa',
      padding: '24px',
      borderRadius: '12px',
      height: 'fit-content'
    }}>
      {/* 店舗名 */}
      <h3 style={{
        margin: '0 0 16px 0',
        color: '#2c3e50',
        fontSize: '20px',
        fontWeight: '600'
      }}>
        {SHOP_INFO.name}
      </h3>

      {/* 店舗詳細情報 */}
      <div style={{ marginBottom: '20px' }}>
        {/* 電話番号 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '12px',
          fontSize: '14px',
          color: '#495057'
        }}>
          <span style={{
            marginRight: '8px',
            fontSize: '16px'
          }}>
            📞
          </span>
          <a 
            href={`tel:${SHOP_INFO.phone}`}
            style={{
              color: '#3498db',
              textDecoration: 'none'
            }}
          >
            {SHOP_INFO.phone}
          </a>
        </div>

        {/* 住所 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '12px',
          fontSize: '14px',
          color: '#495057'
        }}>
          <span style={{
            marginRight: '8px',
            fontSize: '16px'
          }}>
            📍
          </span>
          <button
            onClick={handleAddressClick}
            style={{
              background: 'none',
              border: 'none',
              color: '#3498db',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '14px',
              padding: 0
            }}
          >
            {SHOP_INFO.address}
          </button>
        </div>
      </div>

      {/* 店舗写真 */}
      <div style={{
        marginTop: '20px',
        textAlign: 'center'
      }}>
        {!imageError ? (
          <img
            src={SHOP_INFO.image}
            alt="店舗写真"
            style={{
              width: '100%',
              maxWidth: '300px',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              objectFit: 'cover'
            }}
            onError={handleImageError}
          />
        ) : (
          <div style={{
            width: '100%',
            maxWidth: '300px',
            height: '200px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 auto',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌙</div>
              <div>美しい夜景</div>
              <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.8 }}>
                幻想的な雰囲気
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopInfo; 