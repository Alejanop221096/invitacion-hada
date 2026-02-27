import React, { useState } from 'react';
import './App.css';

const InvitacionHadas = () => {
  const [rsvp, setRsvp] = useState(false);

  return (
    <div className="fairy-container">
      {/* Capa de polvo de estrellas */}
      <div className="fairy-dust"></div>

      <div className="fairy-card">
        <h1 className="fairy-title">Portal de Hadas</h1>
        <p style={{ color: 'var(--soft-lavender)', fontSize: '0.9rem', fontStyle: 'italic' }}>
          "Bajo la luz de la luna amatista, la magia comienza..."
        </p>

        <div className="fairy-info">
          <div className="info-row">✨ <strong>Fecha:</strong> 25 de Octubre</div>
          <div className="info-row">🌙 <strong>Hora:</strong> 20:00 PM</div>
          <div className="info-row">📍 <strong>Lugar:</strong> El Claro de los Deseos</div>
        </div>

        <button 
          className={`fairy-btn ${rsvp ? 'confirmed' : ''}`}
          onClick={() => setRsvp(!rsvp)}
        >
          {rsvp ? '¡Invocación Aceptada!' : 'Aceptar Invitación'}
        </button>

        {rsvp && (
          <p style={{ color: 'var(--star-gold)', marginTop: '15px', fontSize: '0.8rem' }}>
            Tu nombre ha sido escrito en las estrellas.
          </p>
        )}
      </div>
    </div>
  );
};

export default InvitacionHadas;