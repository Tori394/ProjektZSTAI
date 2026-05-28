import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

// Reuse the same CSS from LoginPage (ideally import from shared file)
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
    max-width: 420px;
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

  .auth-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
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

  .auth-success {
    background: rgba(39,174,96,0.15);
    border: 1px solid rgba(39,174,96,0.35);
    border-radius: 8px;
    color: #7de8a8;
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

const FIELDS = [
  { key: 'username',  label: 'Login',    placeholder: 'login' },
  { key: 'password',  label: 'Hasło',    placeholder: '••••••••', type: 'password' },
  { key: 'firstName', label: 'Imię',     placeholder: 'Jan',     half: true },
  { key: 'lastName',  label: 'Nazwisko', placeholder: 'Kowalski', half: true },
  { key: 'email',     label: 'Email',    placeholder: 'jan@example.com', type: 'email' },
];

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '', firstName: '', lastName: '', email: '' });
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post('/api/auth/register', form);
      setSuccess('Konto utworzone! Za chwilę zostaniesz przekierowany…');
      setTimeout(() => navigate('/login'), 2000);
    } catch (e) {
      setError(e.response?.data || 'Błąd rejestracji');
    }
  };

  const halfFields  = FIELDS.filter(f => f.half);
  const otherFields = FIELDS.filter(f => !f.half);

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="auth-card">
          <h2 className="auth-title">Utwórz konto</h2>
          <p className="auth-subtitle">Dołącz i zamawiaj ozdoby świąteczne</p>

          {error   && <div className="auth-error">⚠ {error}</div>}
          {success && <div className="auth-success">✓ {success}</div>}

          {/* Login & Password */}
          {otherFields.slice(0, 2).map(({ key, label, placeholder, type }) => (
            <div className="auth-field" key={key}>
              <label className="auth-label">{label}</label>
              <input
                className="auth-input"
                placeholder={placeholder}
                type={type || 'text'}
                value={form[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
              />
            </div>
          ))}

          {/* First & Last name side-by-side */}
          <div className="auth-row">
            {halfFields.map(({ key, label, placeholder }) => (
              <div className="auth-field" key={key}>
                <label className="auth-label">{label}</label>
                <input
                  className="auth-input"
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            ))}
          </div>

          {/* Email */}
          {otherFields.slice(2).map(({ key, label, placeholder, type }) => (
            <div className="auth-field" key={key}>
              <label className="auth-label">{label}</label>
              <input
                className="auth-input"
                placeholder={placeholder}
                type={type || 'text'}
                value={form[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
              />
            </div>
          ))}

          <button className="auth-btn" onClick={handleRegister}>
            Zarejestruj się →
          </button>

          <hr className="auth-divider" />
          <p className="auth-footer">Masz już konto? <Link to="/login">Zaloguj się</Link></p>
        </div>
      </div>
    </>
  );
}