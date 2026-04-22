import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1 style={{ fontSize: '72px', margin: 0, color: '#007bff' }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ color: '#666' }}>The page you are looking for does not exist.</p>
      <button
        onClick={() => navigate('/')}
        style={{ padding: '10px 24px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ddd', fontSize: '15px' }}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
