import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CatalogPage from './pages/CatalogPage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';

function PrivateRoute({ children, adminOnly }) {
  const { token, role } = useAuth();
  if (!token) return <Navigate to="/login" />;
  if (adminOnly && role !== 'ADMIN') return <Navigate to="/catalog" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/catalog" element={<PrivateRoute><CatalogPage /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute adminOnly><AdminPage /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}