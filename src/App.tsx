import { useState, useRef, type CSSProperties } from 'react';

// --- INTERFACES ---
interface Hada {
  id: number;
  icono: string;
  x: number;
  y: number;
  rotacion: number;
  retraso: number;
  color: string;
}

interface EstiloMagico extends CSSProperties {
  '--x'?: string;
  '--y'?: string;
  '--r'?: string;
}

function App() {
  const [confirmado, setConfirmado] = useState<boolean>(false);
  const [hadas, setHadas] = useState<Hada[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const numeroTelefono = "527294914453"; 
  const mensajeWhatsApp = "¡Hola! ✨ Confirmo mi asistencia a la fiesta de Fernandita. ¡Ahí nos vemos! 🧚‍♀️🌹";

  const manejarConfirmacion = () => {
    if (confirmado) return;
    setConfirmado(true);
    
    if (audioRef.current) {
      audioRef.current.play().catch(() => console.log("Audio bloqueado"));
    }

    const nuevasHadas: Hada[] = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      icono: ['🧚‍♀️', '🧚‍♂️', '🦋', '✨', '🌸', '💫', '🌹'][Math.floor(Math.random() * 7)],
      x: (Math.random() - 0.5) * (window.innerWidth < 600 ? 300 : 800), 
      y: (Math.random() - 0.8) * 600, 
      rotacion: (Math.random() - 0.5) * 720,
      retraso: Math.random() * 0.5, 
      color: ['#FF85A1', '#FFEAA7', '#A29BFE', '#FFFFFF'][Math.floor(Math.random() * 4)]
    }));
    setHadas(nuevasHadas);

    setTimeout(() => {
      const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensajeWhatsApp)}`;
      window.open(url, '_blank');
    }, 2000);

    setTimeout(() => setHadas([]), 4000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Poppins:wght@300;400;600&display=swap');
        
        body, html { margin: 0; padding: 0; overflow: hidden; background: #000; width: 100%; height: 100%; position: fixed; }

        .fairy-body { 
          min-height: 100vh; width: 100vw; 
          display: flex; align-items: center; justify-content: center; 
          font-family: 'Poppins', sans-serif; 
          position: relative; overflow: hidden; 
        }

        /* FONDO DE VIDEO RESPONSIVE */
        .video-background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
        .video-background iframe { 
          position: absolute; top: 50%; left: 50%; 
          width: 100vw; height: 100vh; 
          transform: translate(-50%, -50%) scale(1.5); 
          object-fit: cover; border: none; opacity: 0.6;
        }

        .overlay-magico { 
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
          background: linear-gradient(rgba(26, 15, 46, 0.5), rgba(45, 27, 78, 0.6)); 
          z-index: 2; pointer-events: none; 
        }

        /* TARJETA AJUSTADA A MÓVIL */
        .fairy-card { 
          background: rgba(45, 27, 78, 0.8); 
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); 
          border-radius: 40px 10px; padding: 25px; 
          max-width: 340px; width: 88%; text-align: center; 
          box-shadow: 0 0 40px rgba(123, 97, 255, 0.5); 
          z-index: 10; color: white; border: 1.5px solid rgba(255, 234, 167, 0.3); 
          margin-top: -20px;
        }

        .nombre-festejada { 
          font-family: 'Cinzel Decorative', cursive; 
          font-size: 2.2rem; /* Más pequeño para celular */
          color: #ffeaa7; margin: 5px 0; text-shadow: 0 0 15px #7B61FF; 
        }

        .fairy-info { 
          text-align: left; background: rgba(255,255,255,0.08); 
          padding: 15px; border-radius: 15px; margin: 15px 0; 
          border-left: 3px solid #FF85A1; 
        }

        .info-item { margin: 6px 0; color: #E0BBE4; font-size: 0.85rem; font-weight: 500; }

        .pd-regalo { 
          background: rgba(255, 133, 161, 0.2); padding: 8px; 
          border-radius: 10px; font-size: 0.75rem; color: #ffeaa7; 
          border: 1px dashed #FF85A1; margin-bottom: 15px; 
        }

        .fairy-btn { 
          background: linear-gradient(45deg, #7B61FF, #FF85A1); 
          color: white; border: none; padding: 15px; 
          border-radius: 50px; font-weight: 600; font-size: 0.9rem;
          text-transform: uppercase; cursor: pointer; width: 100%; 
          box-shadow: 0 5px 15px rgba(123, 97, 255, 0.4); 
        }

        .fairy-btn.confirmed { background: #44bd32; }

        /* HADAS VOLADORAS */
        .hada-gigante { 
          position: absolute; width: 150px; height: auto; 
          pointer-events: none; z-index: 1; opacity: 0.4; 
        }
        .h1 { top: 5%; left: -180px; animation: pasarD 18s linear infinite; }
        .h2 { bottom: 10%; right: -180px; animation: pasarI 22s linear infinite; }

        @keyframes pasarD { 0% { left: -180px; } 100% { left: 110vw; } }
        @keyframes pasarI { 0% { right: -180px; transform: scaleX(-1); } 100% { right: 110vw; transform: scaleX(-1); } }

        .explosion-wrapper { position: absolute; top: 50%; left: 50%; pointer-events: none; z-index: 100; }
        .hada-voladora { position: absolute; font-size: 1.8rem; opacity: 0; animation: estallidoMagico 2s forwards; }
        
        @keyframes estallidoMagico { 
          0% { opacity: 0; transform: translate(0, 0) scale(0.3); } 
          30% { opacity: 1; } 
          100% { opacity: 0; transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(2); } 
        }

        @media (min-width: 600px) {
          .fairy-card { max-width: 380px; padding: 35px; }
          .nombre-festejada { font-size: 2.8rem; }
          .info-item { font-size: 0.95rem; }
        }
      `}</style>

      <div className="fairy-body">
        <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/03/15/audio_27914619d9.mp3" />
        
        <div className="video-background">
          <iframe 
            src="https://www.youtube.com/embed/1P-lKf2AaIQ?autoplay=1&mute=1&loop=1&playlist=1P-lKf2AaIQ&controls=0&showinfo=0&rel=0" 
            allow="autoplay; encrypted-media" 
            title="video"
          />
        </div>

        <img src="https://www.gifsanimados.org/data/media/489/hada-imagen-animada-0028.gif" className="hada-gigante h1" alt="hada" />
        <img src="https://png.pngtree.com/png-vector/20250709/ourmid/pngtree-adorable-watercolor-illustration-of-a-cute-fairy-with-wings-and-leaf-png-image_16620748.webp" className="hada-gigante h2" alt="hada" />

        <div className="overlay-magico"></div>

        <div className="fairy-card">
          <div className="explosion-wrapper">
            {hadas.map((h) => (
              <span key={h.id} className="hada-voladora" style={{
                  '--x': `${h.x}px`, '--y': `${h.y}px`, '--r': `${h.rotacion}deg`,
                  animationDelay: `${h.retraso}s`, textShadow: `0 0 20px ${h.color}`
                } as EstiloMagico}> {h.icono} </span>
            ))}
          </div>

          <p style={{fontFamily: 'Cinzel Decorative', color: '#ffeaa7', margin: 0, fontSize: '1rem'}}>🌹 ¡Estás Invitado! 🌹</p>
          <h1 className="nombre-festejada">Fernandita</h1>
          
          <div className="fairy-info">
            <div className="info-item">📅 Martes 03 de Marzo</div>
            <div className="info-item">⏰ 3:00 PM</div>
            <div className="info-item">📍 Calle Ignacio López Rayón</div>
            <p style={{fontSize: '0.7rem', margin: '0 0 0 22px', color: '#E0BBE4'}}>(atrás de Plaza Mía)</p>
            <div className="info-item">🧚 Temática: Hada</div>
          </div>

          <div className="pd-regalo">
            🌟 Si vas disfrazado te daremos un regalito 🌟
          </div>

          <button className={`fairy-btn ${confirmado ? 'confirmed' : ''}`} onClick={manejarConfirmacion}>
            {confirmado ? '💖 ¡NOS VEMOS PRONTO! 💖' : 'Confirmar Asistencia'}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;