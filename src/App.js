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

  // Estado para controlar a camada de carregamento/espera
  const [isLoadingOrWaiting, setIsLoadingOrWaiting] = useState(false);

  // Adicionado log para rastrear mudanças no estado de carregamento
  useEffect(() => {
      console.log("isLoadingOrWaiting changed to:", isLoadingOrWaiting);
  }, [isLoadingOrWaiting]);


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
    console.log("Showing menus.");
    setShowCategories(true);
    setShowChannels(true);
    setActiveMenu('categories');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // Funções de seleção memoizadas para usar em callbacks
  const handleCategorySelect = useCallback((idx) => {
    console.log("Category selected:", categories[idx]);
    setSelectedCategory(idx);
    setSelectedChannelIndex(null);
    setSelectedChannel(null);
    // isLoadingOrWaiting será setado para false via cleanup do useEffect
    setShowCategories(true);
    setShowChannels(true);
    setActiveMenu('categories');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleChannelSelect = useCallback((channel) => {
    console.log("Channel selected:", channel);
    setSelectedChannel(channel);
    // Define como true IMEDIATAMENTE ao selecionar um canal
    setIsLoadingOrWaiting(true);
    setShowCategories(false);
    setShowChannels(false);
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // Monitora atividade do usuário
  useEffect(() => {
    console.log("Setting up user activity listeners.");
    const activityEvents = ['keydown', 'mousemove', 'mousedown', 'click'];
    const handleUserActivity = () => { resetInactivityTimer(); };

    activityEvents.forEach(event => window.addEventListener(event, handleUserActivity));
    resetInactivityTimer();

    return () => {
      console.log("Cleaning up user activity listeners.");
      activityEvents.forEach(event => window.removeEventListener(event, handleUserActivity));
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer]);

  // Carrega HLS no vídeo e gerencia o estado de carregamento
  useEffect(() => {
    const video = videoRef.current;
    let hlsInstance = null;

    console.log("useEffect [selectedChannel] triggered. selectedChannel:", selectedChannel);

    // Handlers de eventos do vídeo
    const handlePlaybackStart = () => {
        console.log("Event 'playing' or 'play' fired. Setting isLoadingOrWaiting(false).");
        setIsLoadingOrWaiting(false);
    };

    const handleWaiting = () => {
         console.log("Event 'waiting' fired. Setting isLoadingOrWaiting(true).");
         setIsLoadingOrWaiting(true);
    };

    const handleError = (eventOrError) => {
       console.error("Video playback error:", eventOrError);
       setIsLoadingOrWaiting(false); // Oculta o placeholder em caso de erro
       // TODO: Display a user-friendly error message
    };

    // --- Lógica de Carregamento ---
    if (selectedChannel?.link && video) {
      console.log("Loading video for channel:", selectedChannel.name);

      video.controls = false;
      video.controlsList = "nodownload nofullscreen noremoteplayback";
      video.disablePictureInPicture = true;
      video.disableRemotePlayback = true;

      // Remove listeners antigos antes de adicionar novos (importante para o cleanup funcionar bem)
      // Embora o cleanup no return já faça isso, ser explícito aqui pode ajudar em alguns casos
      video.removeEventListener('playing', handlePlaybackStart);
      video.removeEventListener('play', handlePlaybackStart);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('error', handleError);

      // Adiciona listeners ANTES de setar o src ou attachar Hls
      video.addEventListener('playing', handlePlaybackStart);
      video.addEventListener('play', handlePlaybackStart);
      video.addEventListener('waiting', handleWaiting);
      video.addEventListener('error', handleError);

      if (window.Hls?.isSupported()) {
        console.log("Hls.js is supported. Attaching Hls.js.");
        hlsInstance = new window.Hls();

         hlsInstance.on(window.Hls.Events.ERROR, (event, data) => {
           console.error("Hls.js error event:", event, "data:", data);
           let error = new Error(`Hls.js Error: ${data.type} - ${data.details}`);
           handleError(error); // Passa o erro do Hls para o nosso handler geral
         });

        hlsInstance.loadSource(selectedChannel.link);
        hlsInstance.attachMedia(video);

         hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, () => {
             console.log("Hls.js MANIFEST_PARSED. Attempting play via autoplay or explicit call.");
             // Se autoplay estiver no JSX, ele tentará tocar aqui.
             // Se removeu autoplay:
             // video.play().catch(handleError);
         });


      } else {
        console.log("Hls.js not supported. Using native src.");
        video.src = selectedChannel.link;
        // Se autoplay estiver no JSX, ele tentará tocar aqui.
        // Se removeu autoplay:
        // video.play().catch(handleError);
      }
    } else {
        console.log("selectedChannel is null or link is missing. Clearing video and state.");
        if(video){
            video.pause();
            video.removeAttribute("src");
            video.load(); // Reseta o player
             // Garante que os listeners são removidos mesmo que o canal seja null/undefined
             video.removeEventListener('playing', handlePlaybackStart);
             video.removeEventListener('play', handlePlaybackStart);
             video.removeEventListener('waiting', handleWaiting);
             video.removeEventListener('error', handleError);
        }
        setIsLoadingOrWaiting(false);
    }

    // --- Função de Limpeza ---
    return () => {
      console.log("Cleaning up video player useEffect.");
      // Remove os event listeners
      if (video) {
        video.removeEventListener('playing', handlePlaybackStart);
        video.removeEventListener('play', handlePlaybackStart);
        video.removeEventListener('waiting', handleWaiting);
        video.removeEventListener('error', handleError);
      }
      // Destroi a instância do Hls.js
      if (hlsInstance) {
          hlsInstance.destroy();
          hlsInstance = null;
      }
      // Garante que o estado de carregamento é resetado ao desmontar ou mudar de canal
      // Esta linha é crucial para garantir que a overlay suma quando o componente player não está ativo
       setIsLoadingOrWaiting(false);
       console.log("Cleanup complete. isLoadingOrWaiting set to false.");
    };
  }, [selectedChannel]); // Dependência: este efeito roda sempre que selectedChannel muda

  // Desativar controles quando o mouse se movimenta sobre o vídeo (manter)
  const handleMouseMove = useCallback(() => {
    resetInactivityTimer();
    if (videoRef.current) {
      videoRef.current.controls = false;
    }
  }, [resetInactivityTimer]);

  // Hook de teclado (manter e revisar)
  const handleKeyDown = useCallback((e) => {
    resetInactivityTimer();
    const channelsForCategory =
      selectedCategory === 0
        ? allChannels
        : channels[categories[selectedCategory]] || [];

    // Se menus ocultos (tela cheia com player)
    if (!showCategories && !showChannels) {
      if (e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault();
        showMenus();
      }
       if (e.key === ' ') { // Play/Pause com espaço
           e.preventDefault();
           if (videoRef.current) {
               if (videoRef.current.paused) {
                   videoRef.current.play().catch(console.error);
               } else {
                   videoRef.current.pause();
               }
           }
       }
      return;
    }

    // Se menus visíveis
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (activeMenu === 'categories') {
          setSelectedCategory(prev => Math.max(0, prev - 1));
        } else if (activeMenu === 'channels') {
          setSelectedChannelIndex(prev => Math.max(0, prev - 1));
        }
        break;
      case 'ArrowDown':
         e.preventDefault();
        if (activeMenu === 'categories') {
          setSelectedCategory(prev => Math.min(categories.length - 1, prev + 1));
        } else if (activeMenu === 'channels') {
          setSelectedChannelIndex(prev => Math.min(channelsForCategory.length - 1, prev + 1));
        }
        break;
      case 'ArrowRight':
         e.preventDefault();
        if (activeMenu === 'categories' && channelsForCategory.length > 0) {
          setActiveMenu('channels');
          setSelectedChannelIndex(0);
        }
        break;
      case 'ArrowLeft':
         e.preventDefault();
        if (activeMenu === 'channels') {
          setActiveMenu('categories');
          setSelectedChannelIndex(null);
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (activeMenu === 'channels' && selectedChannelIndex !== null) {
          if (channelsForCategory[selectedChannelIndex]) {
             handleChannelSelect(channelsForCategory[selectedChannelIndex]);
          }
        } else if (activeMenu === 'categories') {
             if (channelsForCategory.length > 0) {
                 setActiveMenu('channels');
                 setSelectedChannelIndex(0);
             }
        }
        break;
      case 'Escape':
         e.preventDefault();
        if (selectedChannel) {
          setSelectedChannel(null);
          // isLoadingOrWaiting já é setado para false na limpeza do useEffect
          showMenus();
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
    console.log("Setting up keydown listener.");
    window.addEventListener('keydown', handleKeyDown);
    return () => {
        console.log("Cleaning up keydown listener.");
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Desabilita controles de vídeo usando JavaScript no mousemove (manter)
   useEffect(() => {
     console.log("Setting up mousemove listener for controls.");
     const preventControls = (e) => {
       if (videoRef.current) {
         videoRef.current.controls = false;
       }
     };

     document.addEventListener('mousemove', preventControls);

     return () => {
       console.log("Cleaning up mousemove listener for controls.");
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

      {/* Renderização das categorias */}
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

      {/* Renderização dos canais */}
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

      {/* Área do Player */}
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
            // Adiciona a classe 'hidden' quando isLoadingOrWaiting é true para escondê-lo
            className={`no-controls ${isLoadingOrWaiting ? 'hidden' : ''}`}
            // Event listeners agora estão no useEffect
          />
          {/* Camada de placeholder/carregamento com mensagem */}
          {isLoadingOrWaiting && (
            <div className="loading-overlay">
              <div className="loading-message">
                Carregando canal... Por favor, aguarde alguns segundos.
                 {/* Opcional: Adicione um spinner abaixo da mensagem */}
                 {/* <div className="spinner"></div> */}
              </div>
              {/* Opcional: Adicionar aqui um elemento para exibir mensagens de erro */}
              {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
