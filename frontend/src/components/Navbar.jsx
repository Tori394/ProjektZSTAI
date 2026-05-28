import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const styles = `
  .navbar-root {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 16px 32px;
    background: rgba(15, 26, 15, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    font-family: 'DM Sans', sans-serif;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  }

  .navbar-link {
    color: #f0e8d8;
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: color 0.2s ease;
  }

  .navbar-link:hover {
    color: #e07b6e;
  }

  .navbar-btn {
    margin-left: auto;
    background: rgba(192, 57, 43, 0.15);
    color: #ff9e96;
    border: 1px solid rgba(192, 57, 43, 0.3);
    border-radius: 8px;
    padding: 8px 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .navbar-btn:hover {
    background: rgba(192, 57, 43, 0.3);
    border-color: rgba(192, 57, 43, 0.6);
    color: #fff;
    transform: translateY(-1px);
  }
`;

export default function Navbar() {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();

  if (!token) return null;

  return (
    <>
      <style>{styles}</style>
      <nav className="navbar-root">
        <Link to="/catalog" className="navbar-link">
          🎄 Katalog ozdób
        </Link>

        {role === 'ADMIN' && (
          <Link to="/admin" className="navbar-link">
            ⚙️ Panel admina
          </Link>
        )}

        <button
          className="navbar-btn"
          onClick={() => { logout(); navigate('/login'); }}
        >
          Wyloguj
        </button>
      </nav>
    </>
  );
}