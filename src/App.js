// App.js
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
  const [isLoadingOrWaiting, setIsLoadingOrWaiting] = useState(false);

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

  // Monitora atividade do usuário
  useEffect(() => {
    const activityEvents = ['keydown', 'mousemove', 'mousedown', 'click'];
    const handleUserActivity = () => { resetInactivityTimer(); };

    activityEvents.forEach(event => window.addEventListener(event, handleUserActivity));
    resetInactivityTimer(); // Inicia o timer ao montar o componente

    return () => {
      activityEvents.forEach(event => window.removeEventListener(event, handleUserActivity));
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current); // Limpa o timer ao desmontar
    };
  }, [resetInactivityTimer]); // Dependência correta

  // Carrega HLS no vídeo e gerencia o estado de carregamento
  useEffect(() => {
    const video = videoRef.current;
    let hlsInstance = null; // Variável para armazenar a instância Hls.js

    const handlePlaybackStart = () => {
        console.log("Evento 'playing' ou 'play' disparado. Ocultando placeholder.");
        // Adiciona um pequeno atraso antes de ocultar o overlay para garantir que o vídeo esteja realmente exibindo conteúdo
        setTimeout(() => {
            setIsLoadingOrWaiting(false); // Oculta o placeholder quando o vídeo começa a tocar
        }, 300);
    };

    const handleWaiting = () => {
         console.log("Evento 'waiting' disparado. Mostrando placeholder.");
         setIsLoadingOrWaiting(true); // Mostra o placeholder se o vídeo parar para bufferizar
    };

    // Função para lidar com erros de reprodução e Hls.js
    const handleError = (err) => {
        console.error("Erro na reprodução ou Hls.js:", err);
        // Manter o placeholder visível em caso de erro para indicar que algo deu errado
        // Pode ser modificado para mostrar uma mensagem de erro específica
    };

    if (selectedChannel?.link && video) {
      // Garante que controles nativos estão desativados
      video.controls = false;

      // Configura atributos adicionais para evitar controles
      video.controlsList = "nodownload nofullscreen noremoteplayback";
      video.disablePictureInPicture = true;
      video.disableRemotePlayback = true;

      // Adiciona listeners para controlar o estado de carregamento/espera
      video.addEventListener('playing', handlePlaybackStart);
      video.addEventListener('play', handlePlaybackStart);
      video.addEventListener('waiting', handleWaiting);
      video.addEventListener('error', handleError); // Adiciona listener para erros do vídeo nativo

      if (window.Hls?.isSupported()) {
        // Remove instância existente se houver
        if (hlsInstance) {
          hlsInstance.destroy();
        }
        
        hlsInstance = new window.Hls({
          // Configurações otimizadas para melhor desempenho em WebView
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          startLevel: -1, // Auto
          debug: false
        }); 
        
        hlsInstance.loadSource(selectedChannel.link);
        hlsInstance.attachMedia(video);

        hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, () => {
            console.log("Hls.js MANIFEST_PARSED. Tentando play.");
            video.play().catch(handleError); // Usa a função de erro
        });

        // Adiciona tratamento de erro do Hls.js
        hlsInstance.on(window.Hls.Events.ERROR, (event, data) => {
           console.error("Hls.js error event:", event, "data:", data);
           // Dependendo do erro, pode ser necessário mostrar uma mensagem de erro ao usuário
           handleError(new Error(`Hls.js Error: ${data.type} - ${data.details}`)); // Usa a função de erro
        });

      } else {
        console.log("Hls.js não suportado. Usando src nativo.");
        video.src = selectedChannel.link;
        video.play().catch(handleError); // Usa a função de erro
      }
    }

    // Cleanup function
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
      // Certifica-se que o placeholder é mostrado se sair da tela do player
      setIsLoadingOrWaiting(false); // Garante que está oculto ao sair da tela do player
    };
  }, [selectedChannel]); // Dependency on selectedChannel

  // Desativar controles quando o mouse se movimenta sobre o vídeo
  const handleMouseMove = useCallback(() => {
    resetInactivityTimer();
    if (videoRef.current) {
      videoRef.current.controls = false;
    }
  }, [resetInactivityTimer]);

  // Hook de teclado
  const handleKeyDown = useCallback((e) => {
    resetInactivityTimer(); // Reseta o timer de inatividade em qualquer tecla
    const channelsForCategory =
      selectedCategory === 0
        ? allChannels
        : channels[categories[selectedCategory]] || [];

    // Se menus ocultos
    if (!showCategories && !showChannels) {
      if (e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault(); // Previne o comportamento padrão da tecla
        showMenus(); // Mostra os menus novamente
      }
      return; // Sai da função pois os menus estão ocultos
    }

    // Se menus visíveis
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault(); // Previne scroll da página
        if (activeMenu === 'categories') {
          setSelectedCategory(prev => Math.max(0, prev - 1));
        } else if (activeMenu === 'channels') {
          setSelectedChannelIndex(prev => Math.max(0, prev - 1));
        }
        break;
      case 'ArrowDown':
         e.preventDefault(); // Previne scroll da página
        if (activeMenu === 'categories') {
          setSelectedCategory(prev => Math.min(categories.length - 1, prev + 1));
        } else if (activeMenu === 'channels') {
          setSelectedChannelIndex(prev => Math.min(channelsForCategory.length - 1, prev + 1));
        }
        break;
      case 'ArrowRight':
         e.preventDefault(); // Previne scroll da página
        if (activeMenu === 'categories' && channelsForCategory.length > 0) {
          setActiveMenu('channels');
          setSelectedChannelIndex(0); // Seleciona o primeiro canal ao entrar na lista
        }
        break;
      case 'ArrowLeft':
         e.preventDefault(); // Previne scroll da página
        if (activeMenu === 'channels') {
          setActiveMenu('categories');
          setSelectedChannelIndex(null); // Desseleciona o canal ao voltar para categorias
        }
        break;
      case 'Enter':
        e.preventDefault(); // Previne o comportamento padrão (ex: submit de form)
        if (activeMenu === 'channels' && selectedChannelIndex !== null) {
           // Verifica se há um canal válido selecionado
          if (channelsForCategory[selectedChannelIndex]) {
             handleChannelSelect(channelsForCategory[selectedChannelIndex]);
          }
        } else if (activeMenu === 'categories') {
            // Opcional: Tratar Enter na categoria se quiser algum comportamento
            // No seu caso, a seleção da categoria já é feita com ArrowDown/Up e Right para entrar nos canais
             if (channelsForCategory.length > 0) {
                 setActiveMenu('channels');
                 setSelectedChannelIndex(0);
             }
        }
        break;
      case 'Escape':
         e.preventDefault(); // Previne o comportamento padrão (ex: sair do fullscreen)
        if (selectedChannel) {
          // Se um canal está tocando, Escape volta para a lista de canais/categorias
          setSelectedChannel(null);
          setIsLoadingOrWaiting(false); // Garante que o placeholder não fique visível ao sair do player
          showMenus(); // Mostra os menus novamente
        }
        break;
      default:
        // Para outras teclas, não faz nada
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
  }, [handleKeyDown]); // Dependência correta

  // Desabilita controles de vídeo usando JavaScript no mousemove
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

  // Adiciona efeito para ajustar vídeos quando o componente montar
  useEffect(() => {
    // Função para garantir que todos os vídeos sejam configurados corretamente
    const configureVideos = () => {
      document.querySelectorAll('video').forEach(video => {
        video.style.backgroundColor = '#000000';
        video.setAttribute('poster', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
        video.controls = false;
      });
    };
    
    // Executa inicialmente
    configureVideos();
    
    // Também configura após um pequeno atraso para garantir
    setTimeout(configureVideos, 500);
    
    // E configura periodicamente para casos de WebView que possam redefinir
    const interval = setInterval(configureVideos, 2000);
    
    return () => clearInterval(interval);
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
                  handleChannelSelect(chan); // Chama a função de seleção de canal
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
            className="no-controls"
            poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          />
          {/* Camada de placeholder/carregamento com mensagem - sempre visível inicialmente quando um canal é selecionado */}
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
