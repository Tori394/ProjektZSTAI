import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();

  if (!token) return null;

  return (
    <nav style={{ padding: '10px', background: '#c0392b', color: 'white', display: 'flex', gap: '20px' }}>
      <Link to="/catalog" style={{ color: 'white' }}>🎄 Katalog ozdób</Link>
      {role === 'ADMIN' && <Link to="/admin" style={{ color: 'white' }}>⚙️ Panel admina</Link>}
      <button onClick={() => { logout(); navigate('/login'); }}
        style={{ marginLeft: 'auto', cursor: 'pointer' }}>
        Wyloguj
      </button>
    </nav>
  );
}