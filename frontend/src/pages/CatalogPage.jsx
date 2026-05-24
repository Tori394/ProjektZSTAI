import { useEffect, useState } from 'react';
import api from '../api/axios';

const COLOURS = {
  0: '#e74c3c',  // czerwony
  1: '#27ae60',  // zielony
  2: '#f1c40f',  // złoty
  3: '#bdc3c7',  // srebrny
  4: '#2980b9',  // niebieski
  5: '#ffffff',  // biały
};

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
              <td><span style={{
                    display: 'inline-block',
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    background: COLOURS[o.colour] ?? '#ccc',
                    border: '1px solid #aaa'
                  }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}