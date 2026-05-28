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

  .catalog-root {
    min-height: 100vh;
    background: #0d1a0d;
    font-family: 'DM Sans', sans-serif;
    color: #f0e8d8;
    padding: 0 0 60px;
  }

  .catalog-hero {
    background: linear-gradient(180deg, #162916 0%, #0d1a0d 100%);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 48px 40px 40px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  .catalog-hero-left {}

  .catalog-eyebrow {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #e07b6e;
    margin-bottom: 10px;
  }

  .catalog-title {
    font-family: 'Playfair Display', serif;
    font-size: 40px;
    font-weight: 700;
    line-height: 1.1;
    margin: 0;
  }

  .catalog-count {
    color: rgba(240,232,216,0.35);
    font-size: 13px;
    margin-top: 8px;
    font-weight: 300;
  }

  .catalog-body {
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
  }

  .orn-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    animation: fadeUp 0.4s ease both;
  }

  .orn-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.4);
    border-color: rgba(192,57,43,0.35);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .orn-swatch {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 42px;
    position: relative;
  }

  .orn-swatch::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(13,26,13,0.6));
  }

  .orn-body {
    padding: 16px;
  }

  .orn-name {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 600;
    margin: 0 0 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .orn-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .orn-price {
    font-size: 18px;
    font-weight: 500;
    color: #f0e8d8;
  }

  .orn-price span {
    font-size: 12px;
    color: rgba(240,232,216,0.45);
    font-weight: 300;
  }

  .orn-tags {
    display: flex;
    gap: 6px;
    margin-top: 10px;
    flex-wrap: wrap;
  }

  .orn-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(255,255,255,0.06);
    border-radius: 6px;
    padding: 3px 8px;
    font-size: 11px;
    color: rgba(240,232,216,0.55);
    font-weight: 400;
  }

  .orn-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 1px solid rgba(255,255,255,0.25);
  }

  .catalog-empty {
    text-align: center;
    padding: 80px 20px;
    color: rgba(240,232,216,0.3);
  }

  .catalog-empty p { font-size: 40px; margin-bottom: 12px; }

  @media (max-width: 600px) {
    .catalog-hero { padding: 32px 20px 28px; }
    .catalog-body { padding: 24px 16px; }
    .catalog-title { font-size: 30px; }
  }
`;

export default function CatalogPage() {
  const [ornaments, setOrnaments] = useState([]);

  useEffect(() => {
    api.get('/api/ornaments').then(res => setOrnaments(res.data));
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="catalog-root">
        <div className="catalog-hero">
          <div className="catalog-hero-left">
            <div className="catalog-eyebrow">🎄 Kolekcja</div>
            <h1 className="catalog-title">Ozdoby Świąteczne</h1>
            <p className="catalog-count">{ornaments.length} {ornaments.length === 1 ? 'przedmiot' : 'przedmiotów'} w katalogu</p>
          </div>
        </div>

        <div className="catalog-body">
          {ornaments.length === 0 ? (
            <div className="catalog-empty">
              <p>🎁</p>
              <div>Brak ozdób w katalogu</div>
            </div>
          ) : (
            <div className="catalog-grid">
              {ornaments.map((o, i) => {
                const colour = COLOURS[o.colour] ?? { hex: '#ccc', name: 'Inny' };
                return (
                  <div className="orn-card" key={o.id} style={{ animationDelay: `${i * 0.04}s` }}>
                    <div className="orn-swatch" style={{ background: `${colour.hex}22` }}>
                      🎄
                    </div>
                    <div className="orn-body">
                      <div className="orn-name">{o.name}</div>
                      <div className="orn-meta">
                        <div className="orn-price">{o.price} <span>zł</span></div>
                      </div>
                      <div className="orn-tags">
                        <span className="orn-tag">
                          <span className="orn-dot" style={{ background: colour.hex }} />
                          {colour.name}
                        </span>
                        <span className="orn-tag">rozmiar {o.size}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}