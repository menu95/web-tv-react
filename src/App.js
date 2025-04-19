// App.js
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import channels from "./channels";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedChannelIndex, setSelectedChannelIndex] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showCategories, setShowCategories] = useState(true);
  const [showChannels, setShowChannels] = useState(true);
  const [activeMenu, setActiveMenu] = useState('categories');
  const [userActive, setUserActive] = useState(true);
  
  // Referência para o timer de inatividade
  const inactivityTimerRef = useRef(null);

  const categories = [
    "TODOS",
    "LISTA DE FAVORITOS",
    "ANIME",
    "CULTURA",
    "SÉRIES",
    "NOTÍCIAS COVID-19",
    "ESPORTE",
    "FILMES",
    "ABERTOS",
    "CANAIS DE RÁDIO",
    "ADICIONADOS RECENTEMENTE"
  ];

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

  // Função para resetar o timer de inatividade
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    setUserActive(true);
    
    // Configura novo timer para 5 segundos
    inactivityTimerRef.current = setTimeout(() => {
      // Só oculta os menus se um canal estiver selecionado
      if (selectedChannel) {
        setShowCategories(false);
        setShowChannels(false);
        setUserActive(false);
      }
    }, 5000);
  };

  // Monitora atividade do usuário
  useEffect(() => {
    // Registra eventos de atividade do usuário
    const activityEvents = ['keydown', 'mousemove', 'mousedown', 'click'];
    
    const handleUserActivity = () => {
      resetInactivityTimer();
    };
    
    // Adiciona os event listeners
    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });
    
    // Configura o timer inicial
    resetInactivityTimer();
    
    // Limpeza ao desmontar
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
      
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [selectedChannel]); // Adiciona dependência para que o timer só seja ativo quando um canal for selecionado

  const handleCategorySelect = (idx) => {
    setSelectedCategory(idx);
    setSelectedChannelIndex(null);
    setSelectedChannel(null);
    setShowChannels(true);
    setShowCategories(true);
    setActiveMenu('categories');
    resetInactivityTimer();
  };

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    setShowCategories(false);
    setShowChannels(false);
    resetInactivityTimer();
  };

  // Mostrar menus novamente
  const showMenus = () => {
    setShowCategories(true);
    setShowChannels(true);
    setActiveMenu('categories');
    resetInactivityTimer();
  };

  // Carrega HLS no vídeo
  useEffect(() => {
    const video = document.getElementById("video-player");
    if (selectedChannel?.link) {
      if (window.Hls?.isSupported()) {
        const hls = new window.Hls();
        hls.loadSource(selectedChannel.link);
        hls.attachMedia(video);
      } else {
        video.src = selectedChannel.link;
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

  // Custom keyboard hook implementation
  const handleKeyDown = (e) => {
    resetInactivityTimer();
    
    const channelsForCategory = selectedCategory === 0 ? allChannels : channels[categories[selectedCategory]] || [];
    
    // Se estiver assistindo um vídeo (menus ocultos) e pressionar Enter ou Escape
    if (!showCategories && !showChannels) {
      if (e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault();
        showMenus();
        return;
      }
      return; // Ignora outras teclas quando estiver assistindo vídeo
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
          // Se tiver um canal selecionado, para de reproduzir
          setSelectedChannel(null);
        }
        break;
      
      default:
        break;
    }
  };

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCategory, selectedChannelIndex, activeMenu, showCategories, showChannels, selectedChannel]);

  // --- AQUI FAZEMOS O FALBACK caso channels[...] seja undefined ---
  const channelsForCategory =
    selectedCategory === 0
      ? allChannels
      : channels[categories[selectedCategory]] || [];

  return (
    <div className="app" onMouseMove={resetInactivityTimer}>
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
                <span className="channel-name">{chan.name}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {selectedChannel && (
        <div className="player" onClick={showMenus}>
          <video id="video-player" controls autoPlay />
        </div>
      )}
    </div>
  );
};

export default App;
