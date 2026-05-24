import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '', password: '', firstName: '', lastName: '', email: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post('/api/auth/register', form);
      setSuccess('Konto utworzone! Możesz się zalogować.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (e) {
      setError(e.response?.data || 'Błąd rejestracji');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', padding: '20px' }}>
      <h2>🎄 Rejestracja</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {[
        { key: 'username', label: 'Login' },
        { key: 'password', label: 'Hasło', type: 'password' },
        { key: 'firstName', label: 'Imię' },
        { key: 'lastName', label: 'Nazwisko' },
        { key: 'email', label: 'Email' },
      ].map(({ key, label, type }) => (
        <input key={key} placeholder={label} type={type || 'text'} value={form[key]}
          onChange={e => setForm({ ...form, [key]: e.target.value })}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
      ))}
      <button onClick={handleRegister}
        style={{ background: '#c0392b', color: 'white', padding: '10px 20px', cursor: 'pointer' }}>
        Zarejestruj
      </button>
      <p>Masz już konto? <Link to="/login">Zaloguj się</Link></p>
    </div>
  );
}