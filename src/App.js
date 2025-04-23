

import React, { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";
// Assumindo que o arquivo channels.js existe e exporta um objeto com as categorias e canais
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

  // Estado para controlar a camada de "placeholder" / carregamento
  const [isLoadingOrWaiting, setIsLoadingOrWaiting] = useState(false); // Mantido do original

  // Preenche TODOS sem repetição (Mantido do original)
  useEffect(() => {
    const unique = Object.values(channels)
      .flat()
      .reduce((acc, ch) => {
        if (!acc.some(x => x.id === ch.id)) acc.push(ch);
        return acc;
      }, []);
    setAllChannels(unique);
  }, []);

  // Função para resetar o timer de inatividade (Mantido do original)
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

  // Mostrar menus novamente (Mantido do original)
  const showMenus = useCallback(() => {
    setShowCategories(true);
    setShowChannels(true);
    setActiveMenu('categories');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // Funções de seleção (Mantido do original)
  const handleCategorySelect = useCallback((idx) => {
    setSelectedCategory(idx);
    setSelectedChannelIndex(null);
    setSelectedChannel(null); // Limpa o canal selecionado ao mudar de categoria
    setIsLoadingOrWaiting(false); // Garante que o placeholder está oculto ao mudar de categoria
    setShowCategories(true);
    setShowChannels(true);
    setActiveMenu('categories');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleChannelSelect = useCallback((channel) => {
    setSelectedChannel(channel);
    setIsLoadingOrWaiting(true); // Define como true ao selecionar um canal (inicia o carregamento imediatamente)
    setShowCategories(false);
    setShowChannels(false);
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // Monitora atividade do usuário (Mantido do original)
  useEffect(() => {
    const activityEvents = ['keydown', 'mousemove', 'mousedown', 'click'];
    const handleUserActivity = () => { resetInactivityTimer(); };

    activityEvents.forEach(event => window.addEventListener(event, handleUserActivity));
    resetInactivityTimer(); // Inicia o timer ao montar o componente

    return () => {
      activityEvents.forEach(event => window.removeEventListener(event, handleUserActivity));
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current); // Limpa o timer ao desmontar
    };
  }, [resetInactivityTimer]);

  // Carrega HLS no vídeo e gerencia o estado de carregamento (LÓGICA DE CARREGAMENTO AJUSTADA)
  useEffect(() => {
    const video = videoRef.current;
    let hlsInstance = null; // Variável para armazenar a instância Hls.js

    // *** AJUSTE PRINCIPAL AQUI ***
    const handlePlaybackStart = () => {
        console.log("Evento 'playing' ou 'play' disparado. Ocultando placeholder.");
        // Remove o setTimeout que fazia o overlay sumir rápido demais
        setIsLoadingOrWaiting(false); // Oculta o placeholder diretamente quando o vídeo começa a tocar
    };

    // Função original mantida
    const handleWaiting = () => {
         console.log("Evento 'waiting' disparado. Mostrando placeholder.");
         setIsLoadingOrWaiting(true); // Mostra o placeholder se o vídeo parar para bufferizar
    };

    // Função original mantida
    const handleError = (err) => {
        console.error("Erro na reprodução ou Hls.js:", err);
        // A lógica original apenas logava o erro, não alterava isLoadingOrWaiting. Mantido assim.
    };

    if (selectedChannel?.link && video) {
      // Garante que controles nativos estão desativados (Mantido do original)
      video.controls = false;
      video.controlsList = "nodownload nofullscreen noremoteplayback";
      video.disablePictureInPicture = true;
      // video.disableRemotePlayback = true; // Este pode ser redundante se controlsList já está setado

      // Adiciona listeners para controlar o estado de carregamento/espera (Mantido do original)
      video.addEventListener('playing', handlePlaybackStart); // Usa a função ajustada
      video.addEventListener('play', handlePlaybackStart); // Usa a função ajustada
      video.addEventListener('waiting', handleWaiting);
      video.addEventListener('error', handleError); // Adiciona listener para erros do vídeo nativo

      if (window.Hls?.isSupported()) {
        // Remove instância existente se houver (Mantido do original)
        if (hlsInstance) {
          hlsInstance.destroy();
        }
        
        // Configuração HLS original mantida
        hlsInstance = new window.Hls({
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          startLevel: -1, // Auto
          debug: false
        }); 
        
        hlsInstance.loadSource(selectedChannel.link);
        hlsInstance.attachMedia(video);

        hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, () => {
            console.log("Hls.js MANIFEST_PARSED. Tentando play.");
            video.play().catch(handleError); // Usa a função de erro original
        });

        // Tratamento de erro original HLS mantido
        hlsInstance.on(window.Hls.Events.ERROR, (event, data) => {
           console.error("Hls.js error event:", event, "data:", data);
           handleError(new Error(`Hls.js Error: ${data.type} - ${data.details}`)); // Usa a função de erro original
        });

      } else { // Fallback original mantido
        console.log("Hls.js não suportado. Usando src nativo.");
        video.src = selectedChannel.link;
        video.play().catch(handleError); // Usa a função de erro original
      }
    }

    // Cleanup function (Original mantida, já incluía setIsLoadingOrWaiting(false))
    return () => {
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load(); // Reseta o player
        // Remove os event listeners para evitar memory leaks
        video.removeEventListener('playing', handlePlaybackStart);
        video.removeEventListener('play', handlePlaybackStart);
        video.removeEventListener('waiting', handleWaiting);
        video.removeEventListener('error', handleError);
      }
      if (hlsInstance) {
          hlsInstance.destroy(); // Destroi a instância do Hls.js
      }
      // Certifica-se que o placeholder é *removido* se sair da tela do player
      setIsLoadingOrWaiting(false); // Garante que está oculto ao sair da tela do player
    };
  }, [selectedChannel]); // Dependency on selectedChannel (Mantido do original)

  // Desativar controles quando o mouse se movimenta sobre o vídeo (Mantido do original)
  const handleMouseMove = useCallback(() => {
    resetInactivityTimer();
    if (videoRef.current) {
      videoRef.current.controls = false;
    }
  }, [resetInactivityTimer]);

  // Hook de teclado (Lógica original mantida)
  const handleKeyDown = useCallback((e) => {
    resetInactivityTimer(); // Reseta o timer de inatividade em qualquer tecla
    const channelsForCategory =
      selectedCategory === 0
        ? allChannels
        : channels[categories[selectedCategory]] || [];

    // Se menus ocultos
    if (!showCategories && !showChannels) {
      if (e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault();
        showMenus(); // Mostra os menus novamente
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
          setSelectedChannelIndex(prev => Math.max(0, (prev ?? 0) - 1)); // Usando prev ?? 0 para tratar null inicial
        }
        break;
      case 'ArrowDown':
         e.preventDefault();
        if (activeMenu === 'categories') {
          setSelectedCategory(prev => Math.min(categories.length - 1, prev + 1));
        } else if (activeMenu === 'channels') {
          setSelectedChannelIndex(prev => Math.min(channelsForCategory.length - 1, (prev ?? -1) + 1)); // Usando prev ?? -1 para tratar null inicial
        }
        break;
      case 'ArrowRight':
         e.preventDefault();
        if (activeMenu === 'categories' && channelsForCategory.length > 0) {
          setActiveMenu('channels');
          setSelectedChannelIndex(0); // Seleciona o primeiro canal ao entrar na lista
        }
        break;
      case 'ArrowLeft':
         e.preventDefault();
        if (activeMenu === 'channels') {
          setActiveMenu('categories');
          setSelectedChannelIndex(null); // Desseleciona o canal ao voltar para categorias
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
          setIsLoadingOrWaiting(false); // Garante que o placeholder não fique visível ao sair do player
          showMenus(); // Mostra os menus novamente
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

  // Registra listener de teclado (Mantido do original)
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Desabilita controles de vídeo usando JavaScript no mousemove (Mantido do original)
  useEffect(() => {
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

  // Adiciona efeito para ajustar vídeos quando o componente montar (Mantido do original)
  useEffect(() => {
    const configureVideos = () => {
      document.querySelectorAll('video').forEach(video => {
        video.style.backgroundColor = '#000000';
        video.setAttribute('poster', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
        video.controls = false;
      });
    };
    configureVideos();
    setTimeout(configureVideos, 500);
    const interval = setInterval(configureVideos, 2000);
    return () => clearInterval(interval);
  }, []);

  // Cálculo da lista de canais (Mantido do original)
  const channelsForCategory =
    selectedCategory === 0
      ? allChannels
      : channels[categories[selectedCategory]] || [];

  return (
    <div className="app" onMouseMove={handleMouseMove}>
      {/* Overlay escuro (Mantido do original) */}
      {(showCategories || showChannels) && <div className="overlay" />}

      {/* Renderização das categorias (Mantido do original) */}
      {showCategories && (
        <nav className="sidebar">
          {categories.map((cat, i) => (
            <div
              key={cat} // Usando cat como chave original
              className={`category ${i === selectedCategory && activeMenu === 'categories' ? "active" : ""}`}
              onClick={() => handleCategorySelect(i)}
            >
              {cat}
            </div>
          ))}
        </nav>
      )}

      {/* Renderização dos canais (Mantido do original, garantindo chan.id) */}
      {showChannels && (
        <section className="content">
          <header className="content-header">
            {categories[selectedCategory]}
          </header>
          <ul className="channel-list">
            {channelsForCategory.map((chan, idx) => (
              <li
                key={chan.id} // Usando ID do canal como chave
                className={`channel ${
                  idx === selectedChannelIndex && activeMenu === 'channels' ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedChannelIndex(idx);
                  setActiveMenu('channels');
                  handleChannelSelect(chan); // Chama a função de seleção de canal
                }}
              >
                    {/* *** GARANTINDO O USO DE chan.id *** */}
                <span className="channel-id">{chan.id}</span>
                {chan.logo && <img src={chan.logo} alt={`${chan.name} logo`} className="channel-logo" />}
                <span className="channel-name">{chan.name}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Área do Player (Mantido do original) */}
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
            poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          />
          {/* Camada de placeholder/carregamento com mensagem (Mantido do original) */}
          <div className={`loading-overlay ${!isLoadingOrWaiting ? "hidden" : ""}`}>
            <div className="loading-message">
              Carregando canal... Por favor, aguarde alguns segundos.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
