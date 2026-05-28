import { useEffect, useState } from 'react';
import api from '../api/axios';

const COLOURS = {
  0: { hex: '#e74c3c', name: 'Czerwony' },
  1: { hex: '#27ae60', name: 'Zielony' },
  2: { hex: '#f1c40f', name: 'Złoty' },
  3: { hex: '#bdc3c7', name: 'Srebrny' },
  4: { hex: '#2980b9', name: 'Niebieski' },
  5: { hex: '#f5f5f5', name: 'Biały' },
};

const empty = { name: '', price: '', size: '', colour: '0' };

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

   html, body {
       margin: 0;
       padding: 0;
       background: #0f1a0f;
     }

     * {
       box-sizing: border-box;
     }

  .admin-root {
    min-height: 100vh;
    background: #0d1a0d;
    font-family: 'DM Sans', sans-serif;
    color: #f0e8d8;
    padding: 0 0 60px;
  }

  .admin-header {
    background: #111d11;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 32px 40px;
  }

  .admin-eyebrow {
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #e07b6e;
    margin-bottom: 8px;
  }

  .admin-title {
    font-family: 'Playfair Display', serif;
    font-size: 34px;
    font-weight: 700;
    margin: 0;
  }

  .admin-body {
    padding: 40px;
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 32px;
    align-items: start;
  }

  /* ── Form panel ── */
  .admin-panel {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 28px;
    position: sticky;
    top: 24px;
  }

  .admin-panel-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 22px;
  }

  .admin-field {
    margin-bottom: 14px;
  }

  .admin-label {
    display: block;
    color: rgba(240,232,216,0.55);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .admin-input, .admin-select {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #f0e8d8;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 10px 12px;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }

  .admin-select { cursor: pointer; appearance: none; }
  .admin-select option { background: #1a2e1a; color: #f0e8d8; }

  .admin-input::placeholder { color: rgba(240,232,216,0.25); }
  .admin-input:focus, .admin-select:focus {
    border-color: rgba(192,57,43,0.7);
    background: rgba(192,57,43,0.07);
  }

  .colour-picker {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 6px;
    margin-top: 4px;
  }

  .colour-opt {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 8px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: transform 0.15s, border-color 0.15s;
  }

  .colour-opt:hover { transform: scale(1.1); }
  .colour-opt.selected { border-color: #f0e8d8; transform: scale(1.12); }

  .admin-add-btn {
    width: 100%;
    background: linear-gradient(135deg, #27ae60, #1a7a43);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    padding: 12px;
    cursor: pointer;
    margin-top: 6px;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 4px 16px rgba(39,174,96,0.3);
  }

  .admin-add-btn:hover { opacity: 0.88; transform: translateY(-1px); }

  .admin-error {
    background: rgba(192,57,43,0.18);
    border: 1px solid rgba(192,57,43,0.35);
    border-radius: 8px;
    color: #ff9e96;
    font-size: 12px;
    padding: 8px 12px;
    margin-bottom: 14px;
  }

  /* ── Table panel ── */
  .admin-table-wrap {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    overflow: hidden;
  }

  .admin-table-header {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .admin-table-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  .admin-badge {
    background: rgba(192,57,43,0.2);
    color: #e07b6e;
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
  }

  table.admin-table {
    width: 100%;
    border-collapse: collapse;
  }

  .admin-table thead tr {
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .admin-table th {
    text-align: left;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(240,232,216,0.35);
    padding: 12px 20px;
  }

  .admin-table td {
    padding: 14px 20px;
    font-size: 14px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    vertical-align: middle;
  }

  .admin-table tbody tr:last-child td { border-bottom: none; }

  .admin-table tbody tr:hover td {
    background: rgba(255,255,255,0.025);
  }

  .colour-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.06);
    border-radius: 6px;
    padding: 3px 8px 3px 5px;
    font-size: 12px;
    color: rgba(240,232,216,0.65);
  }

  .colour-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.2);
    flex-shrink: 0;
  }

  .admin-del-btn {
    background: rgba(192,57,43,0.15);
    border: 1px solid rgba(192,57,43,0.3);
    color: #e07b6e;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    padding: 5px 12px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }

  .admin-del-btn:hover {
    background: rgba(192,57,43,0.35);
    color: #fff;
  }

  .admin-empty {
    padding: 48px 20px;
    text-align: center;
    color: rgba(240,232,216,0.25);
    font-size: 14px;
  }

  @media (max-width: 860px) {
    .admin-body { grid-template-columns: 1fr; padding: 20px 16px; }
    .admin-panel { position: static; }
    .admin-header { padding: 24px 20px; }
  }
`;

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
    <>
      <style>{styles}</style>
      <div className="admin-root">
        <div className="admin-header">
          <div className="admin-eyebrow">⚙ Panel administracyjny</div>
          <h1 className="admin-title">Zarządzanie ozdobami</h1>
        </div>

        <div className="admin-body">
          {/* Add form */}
          <div className="admin-panel">
            <h2 className="admin-panel-title">Dodaj ozdobę</h2>
            {error && <div className="admin-error">⚠ {error}</div>}

            {[
              { key: 'name',  label: 'Nazwa',    placeholder: 'np. Bombka klasyczna' },
              { key: 'price', label: 'Cena (zł)', placeholder: '19.99' },
              { key: 'size',  label: 'Rozmiar',   placeholder: '1 – 10' },
            ].map(({ key, label, placeholder }) => (
              <div className="admin-field" key={key}>
                <label className="admin-label">{label}</label>
                <input
                  className="admin-input"
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            ))}

            <div className="admin-field">
              <label className="admin-label">Kolor</label>
              <div className="colour-picker">
                {Object.entries(COLOURS).map(([idx, { hex, name }]) => (
                  <button
                    key={idx}
                    title={name}
                    className={`colour-opt${form.colour === idx ? ' selected' : ''}`}
                    style={{ background: hex }}
                    onClick={() => setForm({ ...form, colour: idx })}
                  />
                ))}
              </div>
            </div>

            <button className="admin-add-btn" onClick={handleCreate}>+ Dodaj ozdobę</button>
          </div>

          {/* Table */}
          <div className="admin-table-wrap">
            <div className="admin-table-header">
              <h2 className="admin-table-title">Lista ozdób</h2>
              <span className="admin-badge">{ornaments.length} szt.</span>
            </div>

            {ornaments.length === 0 ? (
              <div className="admin-empty">Brak ozdób — dodaj pierwszą 🎄</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nazwa</th>
                    <th>Cena</th>
                    <th>Rozmiar</th>
                    <th>Kolor</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {ornaments.map(o => {
                    const c = COLOURS[o.colour] ?? { hex: '#ccc', name: 'Inny' };
                    return (
                      <tr key={o.id}>
                        <td style={{ fontWeight: 500 }}>{o.name}</td>
                        <td>{o.price} zł</td>
                        <td>{o.size}</td>
                        <td>
                          <span className="colour-chip">
                            <span className="colour-dot" style={{ background: c.hex }} />
                            {c.name}
                          </span>
                        </td>
                        <td>
                          <button className="admin-del-btn" onClick={() => handleDelete(o.id)}>
                            Usuń
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}