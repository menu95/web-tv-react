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

  // Estado para controlar a camada de carregamento/espera
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
    setSelectedChannel(null); // Limpa o canal selecionado
    // Não precisamos setar isLoadingOrWaiting para false aqui, pois o player desaparece
    // e o estado será gerenciado ao selecionar um novo canal.
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
    const activityEvents = ['keydown', 'mousemove', 'mousedown', 'click'];
    const handleUserActivity = () => { resetInactivityTimer(); };

    activityEvents.forEach(event => window.addEventListener(event, handleUserActivity));
    resetInactivityTimer(); // Inicia o timer ao montar o componente

    return () => {
      activityEvents.forEach(event => window.removeEventListener(event, handleUserActivity));
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current); // Limpa o timer ao desmontar
    };
  }, [resetInactivityTimer]);

  // Carrega HLS no vídeo e gerencia o estado de carregamento
  useEffect(() => {
    const video = videoRef.current;
    let hlsInstance = null; // Variável para armazenar a instância Hls.js

    // Handlers de eventos do vídeo
    const handlePlaybackStart = () => {
        console.log("Playback started ('playing' or 'play'). Setting isLoadingOrWaiting(false).");
        // Oculta o placeholder quando o vídeo começa a tocar efetivamente
        setIsLoadingOrWaiting(false);
    };

    const handleWaiting = () => {
         console.log("Video waiting/buffering. Setting isLoadingOrWaiting(true).");
         // Mostra o placeholder se o vídeo parar para bufferizar
         setIsLoadingOrWaiting(true);
    };

    // Handler geral para erros de reprodução e Hls.js
    const handleError = (eventOrError) => {
       console.error("Playback error or Hls.js error:", eventOrError);
       // Oculta o placeholder em caso de erro para não ficar travado na tela de loading
       setIsLoadingOrWaiting(false);
       // TODO: Implementar lógica para mostrar uma mensagem de erro mais amigável ao usuário
       // (ex: Canal indisponível, erro de rede, etc.)
       // Você pode adicionar um novo estado para a mensagem de erro e exibi-la condicionalmente.
    };

    // --- Lógica de Carregamento ---
    if (selectedChannel?.link && video) {
      console.log("useEffect triggered for channel:", selectedChannel.name, "Link:", selectedChannel.link);

      // Garante que controles nativos estão desativados
      video.controls = false;
      video.controlsList = "nodownload nofullscreen noremoteplayback";
      video.disablePictureInPicture = true;
      video.disableRemotePlayback = true;

      // Adiciona listeners ANTES de setar o src ou attachar Hls para capturar eventos iniciais
      video.addEventListener('playing', handlePlaybackStart);
      video.addEventListener('play', handlePlaybackStart);
      video.addEventListener('waiting', handleWaiting);
      video.addEventListener('error', handleError); // Adiciona listener para erros do vídeo nativo
      // Opcional: Adicionar listener para 'pause' se quiser que o placeholder apareça ao pausar manualmente
      // video.addEventListener('pause', () => setIsLoadingOrWaiting(true));


      if (window.Hls?.isSupported()) {
        console.log("Hls.js is supported. Attaching Hls.js.");
        hlsInstance = new window.Hls();
        // Adiciona tratamento de erro do Hls.js
         hlsInstance.on(window.Hls.Events.ERROR, (event, data) => {
           console.error("Hls.js error event:", event, "data:", data);
           let error = new Error(`Hls.js Error: ${data.type} - ${data.details}`);
           handleError(error); // Passa o erro do Hls para o nosso handler geral
         });

        hlsInstance.loadSource(selectedChannel.link);
        hlsInstance.attachMedia(video);

        // Hls.js vai disparar o MANIFEST_PARSED e depois o 'play'/'playing' no elemento vídeo
        // O estado isLoadingOrWaiting será atualizado pelos listeners 'play'/'playing'/'waiting'
        // Adicionar um handler para MANIFEST_PARSED é útil para debug ou lógica adicional
         hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, () => {
             console.log("Hls.js MANIFEST_PARSED.");
             // Não precisamos chamar video.play() explicitamente aqui se autoplay está no elemento.
             // Deixe o autoplay ou confie que os eventos 'play'/'playing' serão disparados
             // quando o Hls.js estiver pronto. Se o autoplay causar problemas, remova-o
             // e chame video.play().catch(handleError); aqui.
             // Exemplo se remover autoplay do JSX:
             // video.play().catch(handleError);
         });


      } else {
        console.log("Hls.js not supported. Using native src.");
        video.src = selectedChannel.link;
         // Para reprodução nativa, os eventos 'play'/'playing'/'waiting'/'error' devem funcionar.
         // O estado isLoadingOrWaiting será atualizado pelos listeners.
         // Se autoplay estiver no JSX, o navegador tentará tocar.
         // Se remover autoplay, chame video.play().catch(handleError); aqui.
         // Exemplo se remover autoplay do JSX:
         // video.play().catch(handleError);
      }
    } else {
        // Se selectedChannel é null ou link está faltando (ex: mudou de categoria),
        // garante que o estado de carregamento está desligado.
        console.log("selectedChannel is null or link is missing. Clearing video source and state.");
        if(video){
            video.pause();
            video.removeAttribute("src");
            video.load(); // Reseta o player
        }
        setIsLoadingOrWaiting(false);
    }

    // --- Função de Limpeza ---
    return () => {
      console.log("Cleaning up video player useEffect.");
      // Remove os event listeners para evitar memory leaks
      if (video) {
        video.removeEventListener('playing', handlePlaybackStart);
        video.removeEventListener('play', handlePlaybackStart);
        video.removeEventListener('waiting', handleWaiting);
        video.removeEventListener('error', handleError);
        // Se adicionou 'pause', remova também:
        // video.removeEventListener('pause', () => setIsLoadingOrWaiting(true));

        // Pausa e reseta o vídeo ao sair
        video.pause();
        video.removeAttribute("src");
        video.load(); // Reseta o player state
      }
      // Destroi a instância do Hls.js se existir
      if (hlsInstance) {
          hlsInstance.destroy();
          hlsInstance = null;
      }
      // Garante que o estado de carregamento é resetado ao desmontar ou mudar de canal
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
    resetInactivityTimer(); // Reseta o timer de inatividade em qualquer tecla
    const channelsForCategory =
      selectedCategory === 0
        ? allChannels
        : channels[categories[selectedCategory]] || [];

    // Se menus ocultos (tela cheia com player)
    if (!showCategories && !showChannels) {
      if (e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault(); // Previne o comportamento padrão da tecla
        showMenus(); // Mostra os menus novamente
      }
      // Opcional: Adicionar controle de play/pause, volume, etc. com outras teclas aqui se menus ocultos.
      // Por exemplo: e.key === ' ' (espaço) para play/pause
       if (e.key === ' ') {
           e.preventDefault();
           if (videoRef.current) {
               if (videoRef.current.paused) {
                   videoRef.current.play().catch(console.error);
               } else {
                   videoRef.current.pause();
               }
           }
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
           // Verifica se há um canal válido selecionado na posição atual
          if (channelsForCategory[selectedChannelIndex]) {
             handleChannelSelect(channelsForCategory[selectedChannelIndex]);
          }
        } else if (activeMenu === 'categories') {
            // Ao pressionar Enter em uma categoria, move para a lista de canais
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
          setSelectedChannel(null); // Isso dispara o useEffect de limpeza
          // isLoadingOrWaiting já é setado para false na limpeza do useEffect
          showMenus(); // Mostra os menus novamente
        } else {
           // Se já está na tela de menus, Escape não faz nada (a menos que você queira fechar o app ou algo similar)
           // A lógica no início da função já cobre o caso de menus ocultos e mostra-os com Escape.
        }
        break;
      default:
        // Para outras teclas, não faz nada se os menus estão visíveis
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
    selectedChannel, // Dependência: usada para saber se o player está ativo
    showMenus, // Dependência: usada para mostrar menus
    handleChannelSelect // Dependência: usada para selecionar canal
  ]);

  // Registra listener de teclado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]); // Dependência correta: handleKeyDown é uma useCallback

  // Desabilita controles de vídeo usando JavaScript no mousemove (manter)
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


  const channelsForCategory =
    selectedCategory === 0
      ? allChannels
      : channels[categories[selectedCategory]] || [];

  return (
    <div className="app" onMouseMove={handleMouseMove}>
      {/* Overlay que escurece o fundo quando os menus estão visíveis */}
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
            autoPlay // Mantido, mas o estado isLoadingOrWaiting controla a visibilidade
            muted={false} // Cuidado com autoplay e som ligado em alguns ambientes
            playsInline // Importante para iOS e alguns Androids para tocar inline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            // Adiciona a classe 'hidden' quando isLoadingOrWaiting é true
            className={`no-controls ${isLoadingOrWaiting ? 'hidden' : ''}`}
            // Os listeners de 'play', 'playing', 'waiting', 'error' foram movidos para o useEffect
          />
          {/* Camada de placeholder/carregamento com mensagem */}
          {isLoadingOrWaiting && (
            <div className="loading-overlay">
              <div className="loading-message">
                Carregando canal... Por favor, aguarde alguns segundos.
                 {/* Opcional: Adicione um spinner abaixo da mensagem */}
                 {/* <div className="spinner"></div> */}
              </div>
              {/* Opcional: Adicionar aqui um elemento para exibir mensagens de erro (se o handleError for atualizado para isso) */}
              {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
