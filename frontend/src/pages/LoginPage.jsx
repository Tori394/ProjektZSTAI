import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

   html, body {
       margin: 0;
       padding: 0;
       background: #0f1a0f;
     }

     * {
       box-sizing: border-box;
     }

  .auth-root {
    min-height: 100vh;
    background: #0f1a0f;
    background-image:
      radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34,85,34,0.55) 0%, transparent 70%),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    padding: 20px;
  }

  .auth-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 48px 44px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .auth-badge {
    display: inline-block;
    background: linear-gradient(135deg, #b8291f, #8b1a11);
    color: #ffd9d6;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 18px;
  }

  .auth-title {
    font-family: 'Playfair Display', serif;
    color: #f0e8d8;
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 6px;
    line-height: 1.15;
  }

  .auth-subtitle {
    color: rgba(240,232,216,0.45);
    font-size: 14px;
    margin: 0 0 36px;
    font-weight: 300;
  }

  .auth-field {
    margin-bottom: 14px;
  }

  .auth-label {
    display: block;
    color: rgba(240,232,216,0.6);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .auth-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #f0e8d8;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 11px 14px;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    box-sizing: border-box;
  }

  .auth-input::placeholder { color: rgba(240,232,216,0.25); }

  .auth-input:focus {
    border-color: rgba(192,57,43,0.7);
    background: rgba(192,57,43,0.07);
  }

  .auth-btn {
    width: 100%;
    background: linear-gradient(135deg, #c0392b, #8b1a11);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.04em;
    padding: 13px;
    cursor: pointer;
    margin-top: 10px;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 4px 20px rgba(192,57,43,0.4);
  }

  .auth-btn:hover { opacity: 0.88; transform: translateY(-1px); }
  .auth-btn:active { transform: translateY(0); }

  .auth-error {
    background: rgba(192,57,43,0.18);
    border: 1px solid rgba(192,57,43,0.35);
    border-radius: 8px;
    color: #ff9e96;
    font-size: 13px;
    padding: 10px 14px;
    margin-bottom: 18px;
  }

  .auth-footer {
    color: rgba(240,232,216,0.4);
    font-size: 13px;
    text-align: center;
    margin-top: 24px;
  }

  .auth-footer a {
    color: #e07b6e;
    text-decoration: none;
    font-weight: 500;
  }
  .auth-footer a:hover { text-decoration: underline; }

  .auth-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.07);
    margin: 28px 0;
  }
`;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post('/api/auth/login', { username, password });
      const token = res.data.token;
      const payload = JSON.parse(atob(token.split('.')[1]));
      login(token, payload.role);
      navigate('/catalog');
    } catch (e) {
      setError('Błędny login lub hasło');
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter') handleLogin(); };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="auth-card">
          <h2 className="auth-title">Witaj</h2>
          <p className="auth-subtitle">Zaloguj się, by przeglądać ozdoby</p>

          {error && <div className="auth-error">⚠ {error}</div>}

          <div className="auth-field">
            <label className="auth-label">Login</label>
            <input
              className="auth-input"
              placeholder="login"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Hasło</label>
            <input
              className="auth-input"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>

          <button className="auth-btn" onClick={handleLogin}>
            Zaloguj się →
          </button>

          <hr className="auth-divider" />
          <p className="auth-footer">Nie masz konta? <Link to="/register">Zarejestruj się</Link></p>
        </div>
      </div>
    </>
  );
}
