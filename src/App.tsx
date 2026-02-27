import { useState, useRef, type CSSProperties } from 'react';

// --- INTERFACES PARA EVITAR ERRORES DE TYPESCRIPT ---
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

  // --- CONFIGURACIÓN DE WHATSAPP ---
  const numeroTelefono = "527294914453"; 
  const mensajeWhatsApp = "¡Hola! ✨ Confirmo mi asistencia a la fiesta de Fernandita. ¡Ahí nos vemos! 🧚‍♀️🌹";

  const manejarConfirmacion = () => {
    if (confirmado) return;
    setConfirmado(true);
    
    // Reproducir audio mágico
    if (audioRef.current) {
      audioRef.current.play().catch(() => console.log("Audio bloqueado"));
    }

    // Explosión de elementos mágicos
    const nuevasHadas: Hada[] = Array.from({ length: 85 }).map((_, i) => ({
      id: i,
      icono: ['🧚‍♀️', '🧚‍♂️', '🦋', '✨', '🌸', '💫', '🌹'][Math.floor(Math.random() * 7)],
      x: (Math.random() - 0.5) * 1200, 
      y: (Math.random() - 0.8) * 1000, 
      rotacion: (Math.random() - 0.5) * 1000,
      retraso: Math.random() * 0.5, 
      color: ['#FF85A1', '#FFEAA7', '#A29BFE', '#FFFFFF'][Math.floor(Math.random() * 4)]
    }));
    setHadas(nuevasHadas);

    // Redirección a WhatsApp
    setTimeout(() => {
      const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensajeWhatsApp)}`;
      window.open(url, '_blank');
    }, 1800);

    // Limpiar hadas
    setTimeout(() => setHadas([]), 4000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Poppins:wght@300;400;600&display=swap');
        body, html { margin: 0; padding: 0; overflow: hidden; background: #000; width: 100vw; height: 100vh; }
        .fairy-body { min-height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; position: relative; overflow: hidden; }
        .video-background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
        .video-background iframe { position: absolute; top: 50%; left: 50%; width: 100vw; height: 56.25vw; min-height: 100vh; min-width: 177.77vh; transform: translate(-50%, -50%) scale(1.4); border: none; }
        .overlay-magico { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(26, 15, 46, 0.4), rgba(45, 27, 78, 0.5)); z-index: 2; pointer-events: none; }
        .hada-gigante { position: absolute; width: 220px; height: auto; pointer-events: none; z-index: 1; filter: drop-shadow(0 0 15px rgba(255, 234, 167, 0.5)); opacity: 0.5; }
        .h1 { top: 10%; left: -250px; animation: pasarD 22s linear infinite; }
        .h2 { bottom: 15%; right: -250px; animation: pasarI 28s linear infinite; animation-delay: 5s; }
        @keyframes pasarD { 0% { left: -250px; transform: translateY(0) rotate(5deg); } 50% { transform: translateY(-30px) rotate(-5deg); } 100% { left: 110vw; transform: translateY(0) rotate(5deg); } }
        @keyframes pasarI { 0% { right: -250px; transform: scaleX(-1) translateY(0) rotate(-5deg); } 50% { transform: scaleX(-1) translateY(40px) rotate(5deg); } 100% { right: 110vw; transform: scaleX(-1) translateY(0) rotate(-5deg); } }
        .sparkles-container { position: absolute; width: 100%; height: 100%; top: 0; left: 0; pointer-events: none; z-index: 3; }
        .sparkle { position: absolute; background: white; border-radius: 50%; opacity: 0; animation: twinkle 3s infinite; }
        @keyframes twinkle { 0%, 100% { opacity: 0; transform: scale(0); } 50% { opacity: 0.7; transform: scale(1); box-shadow: 0 0 10px white; } }
        .fairy-card { background: rgba(45, 27, 78, 0.75); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-radius: 50px 15px; padding: 35px; max-width: 380px; width: 85%; text-align: center; box-shadow: 0 0 50px rgba(123, 97, 255, 0.6); z-index: 10; color: white; border: 2px solid rgba(255, 234, 167, 0.4); animation: cardEntry 1s ease-out; }
        @keyframes cardEntry { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .nombre-festejada { font-family: 'Cinzel Decorative', cursive; font-size: 2.8rem; color: #ffeaa7; margin: 10px 0; text-shadow: 0 0 20px #7B61FF; }
        .fairy-info { text-align: left; background: rgba(255,255,255,0.1); padding: 20px; border-radius: 20px; margin: 20px 0; border-left: 4px solid #FF85A1; }
        .info-item { margin: 8px 0; color: #E0BBE4; font-size: 0.95rem; font-weight: 500; }
        .pd-regalo { background: rgba(255, 133, 161, 0.25); padding: 10px; border-radius: 10px; font-size: 0.85rem; color: #ffeaa7; border: 1px dashed #FF85A1; margin-bottom: 20px; }
        .fairy-btn { background: linear-gradient(45deg, #7B61FF, #FF85A1); color: white; border: none; padding: 18px; border-radius: 50px; font-weight: 600; text-transform: uppercase; cursor: pointer; width: 100%; transition: 0.3s; box-shadow: 0 5px 20px rgba(123, 97, 255, 0.5); }
        .fairy-btn.confirmed { background: #44bd32; box-shadow: 0 0 30px #44bd32; }
        .explosion-wrapper { position: absolute; top: 50%; left: 50%; pointer-events: none; z-index: 100; }
        .hada-voladora { position: absolute; font-size: 2.5rem; opacity: 0; animation: estallidoMagico 2s forwards; }
        @keyframes estallidoMagico { 0% { opacity: 0; transform: translate(0, 0) scale(0.3); } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(2.8); } }
      `}</style>

      <div className="fairy-body">
        <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/03/15/audio_27914619d9.mp3" />
        
        <div className="video-background">
          <iframe 
            src="https://www.youtube.com/embed/1P-lKf2AaIQ?autoplay=1&mute=1&loop=1&playlist=1P-lKf2AaIQ&controls=0&showinfo=0&rel=0&iv_load_policy=3" 
            allow="autoplay; encrypted-media" 
            title="background"
          />
        </div>

        <img src="https://www.gifsanimados.org/data/media/489/hada-imagen-animada-0028.gif" className="hada-gigante h1" alt="hada" />
        <img src="https://png.pngtree.com/png-vector/20250709/ourmid/pngtree-adorable-watercolor-illustration-of-a-cute-fairy-with-wings-and-leaf-png-image_16620748.webp" className="hada-gigante h2" alt="hada" />

        <div className="overlay-magico"></div>

        <div className="sparkles-container">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="sparkle" style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 5}s`
              }} />
          ))}
        </div>

        <div className="fairy-card">
          <div className="explosion-wrapper">
            {hadas.map((h) => (
              <span key={h.id} className="hada-voladora" style={{
                  '--x': `${h.x}px`, '--y': `${h.y}px`, '--r': `${h.rotacion}deg`,
                  animationDelay: `${h.retraso}s`, textShadow: `0 0 30px ${h.color}`
                } as EstiloMagico}> {h.icono} </span>
            ))}
          </div>

          <p style={{fontFamily: 'Cinzel Decorative', color: '#ffeaa7', margin: 0, fontSize: '1.2rem'}}>🌹 ¡Estás Invitado! 🌹</p>
          <h1 className="nombre-festejada">Fernandita</h1>
          
          <div className="fairy-info">
            <div className="info-item">📅 Martes 03 de Marzo</div>
            <div className="info-item">⏰ 3:00 PM</div>
            <div className="info-item">📍 Calle Ignacio López Rayón</div>
            <p style={{fontSize: '0.75rem', margin: '0 0 0 25px', color: '#E0BBE4'}}>(atrás de Plaza Mía)</p>
            <div className="info-item">🧚 Temática: Hada</div>
          </div>

          <div className="pd-regalo">
            🌟 Si vas disfrazado te daremos un regalito 🌟
          </div>

          <button className={`fairy-btn ${confirmado ? 'confirmed' : ''}`} onClick={manejarConfirmacion}>
            {confirmado ? '💖 ¡ABRIENDO WHATSAPP! 💖' : 'Confirmar Asistencia'}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;