import { useEffect, useState } from 'react';
import api from '../api/axios';

const empty = { name: '', price: '', size: '', colour: '' };

const COLOURS = {
  0: '#e74c3c',  // czerwony
  1: '#27ae60',  // zielony
  2: '#f1c40f',  // złoty
  3: '#bdc3c7',  // srebrny
  4: '#2980b9',  // niebieski
  5: '#ffffff',  // biały
};

export default function AdminPage() {
  const [ornaments, setOrnaments] = useState([]);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');

  const fetchAll = () => api.get('/api/ornaments').then(res => setOrnaments(res.data));

  useEffect(() => { fetchAll(); }, []);

  const handleCreate = async () => {
    try {
      await api.post('/api/ornaments', {
        name: form.name,
        price: parseFloat(form.price),
        size: parseInt(form.size),
        colour: parseInt(form.colour),
      });
      setForm(empty);
      setError('');
      fetchAll();
    } catch (e) {
      setError(e.response?.data?.message || 'Błąd przy dodawaniu');
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/ornaments/${id}`);
    fetchAll();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>⚙️ Panel admina</h2>

      <h3>Dodaj ozdobę</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {['name', 'price', 'size', 'colour'].map(field => (
        <input key={field} placeholder={field} value={form[field]}
          onChange={e => setForm({ ...form, [field]: e.target.value })}
          style={{ display: 'block', marginBottom: '8px', padding: '6px', width: '300px' }} />
      ))}
      <button onClick={handleCreate}
        style={{ background: '#27ae60', color: 'white', padding: '8px 16px', cursor: 'pointer' }}>
        Dodaj
      </button>

      <h3>Lista ozdób</h3>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ background: '#c0392b', color: 'white' }}>
          <tr>
            <th>Nazwa</th><th>Cena</th><th>Rozmiar</th><th>Kolor</th><th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {ornaments.map(o => (
            <tr key={o.id}>
              <td>{o.name}</td>
              <td>{o.price} zł</td>
              <td>{o.size}</td>
              <td><span style={{
                    display: 'inline-block',
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    background: COLOURS[o.colour] ?? '#ccc',
                    border: '1px solid #aaa'
                  }} /></td>
              <td>
                <button onClick={() => handleDelete(o.id)}
                  style={{ background: '#e74c3c', color: 'white', cursor: 'pointer' }}>
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}