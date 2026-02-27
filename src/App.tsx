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

    const nuevasHadas: Hada[] = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      icono: ['🧚‍♀️', '🧚‍♂️', '🦋', '✨', '🌸', '💫', '🌹'][Math.floor(Math.random() * 7)],
      x: (Math.random() - 0.5) * (window.innerWidth < 600 ? 250 : 600), 
      y: (Math.random() - 0.8) * 500, 
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
        
        body, html { 
          margin: 0; padding: 0; overflow: hidden; 
          background: #1a0f2e; /* Color de respaldo por si el video tarda */
          width: 100%; height: 100%; position: fixed; 
        }

        .fairy-body { 
          min-height: 100vh; width: 100vw; 
          display: flex; align-items: center; justify-content: center; 
          font-family: 'Poppins', sans-serif; 
          position: relative; overflow: hidden; 
        }

        /* CONTENEDOR DE VIDEO MEJORADO */
        .video-wrapper {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 0; pointer-events: none;
          overflow: hidden;
        }

        .video-wrapper iframe {
          position: absolute;
          top: 50%; left: 50%;
          width: 100vw;
          height: 100vh;
          transform: translate(-50%, -50%);
          border: none;
          opacity: 0.8;
        }

        /* Ajuste para que el video siempre cubra el fondo sin importar el tamaño */
        @media (min-aspect-ratio: 16/9) {
          .video-wrapper iframe { height: 56.25vw; }
        }
        @media (max-aspect-ratio: 16/9) {
          .video-wrapper iframe { width: 177.78vh; }
        }

        .overlay-magico { 
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
          background: radial-gradient(circle, rgba(45, 27, 78, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%);
          z-index: 2; pointer-events: none; 
        }

        .fairy-card { 
          background: rgba(30, 15, 50, 0.7); 
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); 
          border-radius: 30px; padding: 25px; 
          max-width: 280px; width: 85%; 
          text-align: center; z-index: 10; color: white; 
          border: 1px solid rgba(255, 255, 255, 0.1); 
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          animation: flotar 4s ease-in-out infinite;
        }

        @keyframes flotar {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .nombre-festejada { 
          font-family: 'Cinzel Decorative', cursive; 
          font-size: 2rem; color: #ffeaa7; margin: 10px 0; 
          text-shadow: 0 0 15px #7B61FF; 
        }

        .info-item { margin: 5px 0; color: #E0BBE4; font-size: 0.85rem; }

        .fairy-btn { 
          background: linear-gradient(45deg, #7B61FF, #FF85A1); 
          color: white; border: none; padding: 14px; 
          border-radius: 50px; font-weight: 600; width: 100%; 
          margin-top: 15px; cursor: pointer;
        }

        .hada-gigante { position: absolute; width: 100px; z-index: 1; opacity: 0.6; pointer-events: none; }
        .h1 { top: 15%; left: -150px; animation: pasarD 20s linear infinite; }
        .h2 { bottom: 20%; right: -150px; animation: pasarI 25s linear infinite; }

        @keyframes pasarD { 0% { left: -150px; } 100% { left: 110vw; } }
        @keyframes pasarI { 0% { right: -150px; transform: scaleX(-1); } 100% { right: 110vw; transform: scaleX(-1); } }

        .explosion-wrapper { position: absolute; top: 50%; left: 50%; z-index: 100; }
        .hada-voladora { position: absolute; font-size: 1.5rem; animation: estallido 2s forwards; }
        @keyframes estallido { 
          100% { transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(2); opacity: 0; } 
        }
      `}</style>

      <div className="fairy-body">
        <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/03/15/audio_27914619d9.mp3" />
        
        <div className="video-wrapper">
          <iframe 
            src="https://www.youtube.com/embed/1P-lKf2AaIQ?autoplay=1&mute=1&loop=1&playlist=1P-lKf2AaIQ&controls=0&showinfo=0&rel=0&enablejsapi=1&origin=http://localhost:5173" 
            allow="autoplay; encrypted-media" 
            title="video-fondo"
          />
        </div>

        <div className="overlay-magico"></div>

        <img src="https://www.gifsanimados.org/data/media/489/hada-imagen-animada-0028.gif" className="hada-gigante h1" alt="hada" />
        <img src="https://png.pngtree.com/png-vector/20250709/ourmid/pngtree-adorable-watercolor-illustration-of-a-cute-fairy-with-wings-and-leaf-png-image_16620748.webp" className="hada-gigante h2" alt="hada" />

        <div className="fairy-card">
          <div className="explosion-wrapper">
            {hadas.map((h) => (
              <span key={h.id} className="hada-voladora" style={{
                  '--x': `${h.x}px`, '--y': `${h.y}px`, '--r': `${h.rotacion}deg`,
                  animationDelay: `${h.retraso}s`
                } as EstiloMagico}> {h.icono} </span>
            ))}
          </div>

          <p style={{fontFamily: 'Cinzel Decorative', color: '#ffeaa7', margin: 0, fontSize: '0.9rem'}}>✨ Estás Invitado ✨</p>
          <h1 className="nombre-festejada">Fernandita</h1>
          
          <div style={{margin: '15px 0'}}>
            <div className="info-item">📅 Martes 03 de Marzo</div>
            <div className="info-item">⏰ 3:00 PM</div>
            <div className="info-item">📍 Calle Ignacio López Rayón</div>
            <div className="info-item">🧚 Temática: Hadas</div>
          </div>

          <button className="fairy-btn" onClick={manejarConfirmacion}>
            {confirmado ? '💖 ¡LISTO! 💖' : 'Confirmar Asistencia'}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;