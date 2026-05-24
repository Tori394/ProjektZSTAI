import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function CatalogPage() {
  const [ornaments, setOrnaments] = useState([]);

  useEffect(() => {
    api.get('/api/ornaments').then(res => setOrnaments(res.data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>🎄 Katalog ozdób świątecznych</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ background: '#c0392b', color: 'white' }}>
          <tr>
            <th>Nazwa</th>
            <th>Cena</th>
            <th>Rozmiar</th>
            <th>Kolor (nr)</th>
          </tr>
        </thead>
        <tbody>
          {ornaments.map(o => (
            <tr key={o.id}>
              <td>{o.name}</td>
              <td>{o.price} zł</td>
              <td>{o.size}</td>
              <td>{o.colour}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}