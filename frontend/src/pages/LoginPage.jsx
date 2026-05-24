import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api/axios';

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

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
      <h2>🎄 Logowanie</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input placeholder="Login" value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input placeholder="Hasło" type="password" value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        <button onClick={handleLogin}
          style={{ background: '#c0392b', color: 'white', padding: '10px 20px', cursor: 'pointer' }}>
          Zaloguj
        </button>
        <p>Nie masz konta? <Link to="/register">Zarejestruj się</Link></p>
      </div>
    </div>
  );
}