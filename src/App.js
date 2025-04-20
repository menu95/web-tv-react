// App.js
import React, { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";
import channels from "./channels";

// Constantes de categorias fora do componente para manter identidade estável
const categories = [
  "TODOS",
  "LISTA DE FAVORITOS",
  "ANIME",
  "DESENHOS",
  "CULTURA",
  "SÉRIES",
  "NOTÍCIAS",
  "ESPORTE",
  "FILMES",
  "DOCUMENTÁRIOS",
  "ABERTOS",
  "CANAIS DE RÁDIO",
  "ADICIONADOS RECENTEMENTE"
];

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedChannelIndex, setSelectedChannelIndex] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showCategories, setShowCategories] = useState(true);
  const [showChannels, setShowChannels] = useState(true);
  const [activeMenu, setActiveMenu] = useState('categories');
  const videoRef = useRef(null);

  const inactivityTimerRef = useRef(null);
  const [allChannels, setAllChannels] = useState([]);

  // Preenche TODOS sem repetição
  useEffect(() => {
    const unique = Object.values(channels)
      .flat()
      .reduce((acc, ch) => {
        if (!acc.some(x => x.id === ch.id)) acc.push(ch);
        return acc;
      }, []);
    setAllChannels(unique);
  }, []);

  // Função para resetar o timer de inatividade (memoizada)
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      if (selectedChannel) {
        setShowCategories(false);
        setShowChannels(false);
      }
    }, 5000);
  }, [selectedChannel]);

  // Mostrar menus novamente (memoizado)
  const showMenus = useCallback(() => {
    setShowCategories(true);
    setShowChannels(true);
    setActiveMenu('categories');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // Funções de seleção memoizadas para usar em callbacks
  const handleCategorySelect = useCallback((idx) => {
    setSelectedCategory(idx);
    setSelectedChannelIndex(null);
    setSelectedChannel(null);
    setShowCategories(true);
    setShowChannels(true);
    setActiveMenu('categories');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleChannelSelect = useCallback((channel) => {
    setSelectedChannel(channel);
    setShowCategories(false);
    setShowChannels(false);
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // Monitora atividade do usuário
  useEffect(() => {
    const activityEvents = ['keydown', 'mousemove', 'mousedown', 'click'];
    const handleUserActivity = () => { resetInactivityTimer(); };

    activityEvents.forEach(event => window.addEventListener(event, handleUserActivity));
    resetInactivityTimer();

    return () => {
      activityEvents.forEach(event => window.removeEventListener(event, handleUserActivity));
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer]);

  // Carrega HLS no vídeo
  useEffect(() => {
    const video = videoRef.current;
    
    if (selectedChannel?.link && video) {
      // Garante que controles nativos estão desativados
      video.controls = false;
      
      // Configura atributos adicionais para evitar controles
      video.controlsList = "nodownload nofullscreen noremoteplayback";
      video.disablePictureInPicture = true;
      video.disableRemotePlayback = true;
      
      if (window.Hls?.isSupported()) {
        const hls = new window.Hls();
        hls.loadSource(selectedChannel.link);
        hls.attachMedia(video);
        hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(err => console.log("Erro ao iniciar reprodução:", err));
        });
      } else {
        video.src = selectedChannel.link;
        video.play().catch(err => console.log("Erro ao iniciar reprodução:", err));
      }
    }
    
    return () => {
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    };
  }, [selectedChannel]);

  // Desativar controles quando o mouse se movimenta sobre o vídeo
  const handleMouseMove = useCallback(() => {
    resetInactivityTimer();
    if (videoRef.current) {
      videoRef.current.controls = false;
    }
  }, [resetInactivityTimer]);

  // Hook de teclado (memoizado)
  const handleKeyDown = useCallback((e) => {
    resetInactivityTimer();
    const channelsForCategory =
      selectedCategory === 0
        ? allChannels
        : channels[categories[selectedCategory]] || [];

    // Se menus ocultos
    if (!showCategories && !showChannels) {
      if (e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault();
        showMenus();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
        if (activeMenu === 'categories') {
          setSelectedCategory(prev => Math.max(0, prev - 1));
        } else if (activeMenu === 'channels') {
          setSelectedChannelIndex(prev => Math.max(0, prev - 1));
        }
        break;
      case 'ArrowDown':
        if (activeMenu === 'categories') {
          setSelectedCategory(prev => Math.min(categories.length - 1, prev + 1));
        } else if (activeMenu === 'channels') {
          setSelectedChannelIndex(prev => Math.min(channelsForCategory.length - 1, prev + 1));
        }
        break;
      case 'ArrowRight':
        if (activeMenu === 'categories' && channelsForCategory.length > 0) {
          setActiveMenu('channels');
          setSelectedChannelIndex(0);
        }
        break;
      case 'ArrowLeft':
        if (activeMenu === 'channels') {
          setActiveMenu('categories');
          setSelectedChannelIndex(null);
        }
        break;
      case 'Enter':
        if (activeMenu === 'channels' && selectedChannelIndex !== null) {
          handleChannelSelect(channelsForCategory[selectedChannelIndex]);
        }
        break;
      case 'Escape':
        if (selectedChannel) {
          setSelectedChannel(null);
        }
        break;
      default:
        break;
    }
  }, [
    resetInactivityTimer,
    selectedCategory,
    allChannels,
    showCategories,
    showChannels,
    activeMenu,
    selectedChannelIndex,
    selectedChannel,
    showMenus,
    handleChannelSelect
  ]);

  // Registra listener de teclado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Desabilita controles de vídeo usando JavaScript
  useEffect(() => {
    // Impedir que o navegador mostrar controles ao passar mouse
    const preventControls = (e) => {
      if (videoRef.current) {
        videoRef.current.controls = false;
      }
    };
    
    document.addEventListener('mousemove', preventControls);
    
    return () => {
      document.removeEventListener('mousemove', preventControls);
    };
  }, []);

  const channelsForCategory =
    selectedCategory === 0
      ? allChannels
      : channels[categories[selectedCategory]] || [];

  return (
    <div className="app" onMouseMove={handleMouseMove}>
      {(showCategories || showChannels) && <div className="overlay" />}      
      {showCategories && (
        <nav className="sidebar">
          {categories.map((cat, i) => (
            <div
              key={cat}
              className={`category ${i === selectedCategory && activeMenu === 'categories' ? "active" : ""}`}
              onClick={() => handleCategorySelect(i)}
            >
              {cat}
            </div>
          ))}
        </nav>
      )}

      {showChannels && (
        <section className="content">
          <header className="content-header">
            {categories[selectedCategory]}
          </header>
          <ul className="channel-list">
            {channelsForCategory.map((chan, idx) => (
              <li
                key={chan.id}
                className={`channel ${
                  idx === selectedChannelIndex && activeMenu === 'channels' ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedChannelIndex(idx);
                  setActiveMenu('channels');
                  handleChannelSelect(chan);
                }}
              >
                <span className="channel-id">{chan.id}</span>
                {chan.logo && <img src={chan.logo} alt={`${chan.name} logo`} className="channel-logo" />}
                <span className="channel-name">{chan.name}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {selectedChannel && (
        <div className="player" onClick={showMenus}>
          <video 
            ref={videoRef}
            id="video-player" 
            autoPlay
            muted={false}
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className="no-controls"
          />
        </div>
      )}
    </div>
  );
};

export default App;
