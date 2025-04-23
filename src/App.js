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
  // Estado para mensagem de erro (opcional, mas recomendado)
  const [errorMessage, setErrorMessage] = useState('');


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
    }, 5000); // 5 segundos de inatividade
  }, [selectedChannel]);

  // Mostrar menus novamente (memoizado)
  const showMenus = useCallback(() => {
    if (selectedChannel) { // Só mostra menus se um canal estiver selecionado (tela do player)
        setShowCategories(true);
        setShowChannels(true);
        setActiveMenu('channels'); // Foca na lista de canais ao reabrir
        // Opcional: focar no canal ativo na lista ao reabrir
        const currentCategoryKey = categories[selectedCategory];
        const channelsForCurrentCategory = selectedCategory === 0 ? allChannels : channels[currentCategoryKey] || [];
        const currentIndex = channelsForCurrentCategory.findIndex(ch => ch.id === selectedChannel.id);
        if (currentIndex !== -1) {
            setSelectedChannelIndex(currentIndex);
        } else {
             setSelectedChannelIndex(0); // Ou foca no primeiro se não encontrar
        }
        resetInactivityTimer();
    }
  }, [selectedChannel, selectedCategory, allChannels, resetInactivityTimer]);

  // Funções de seleção memoizadas para usar em callbacks
  const handleCategorySelect = useCallback((idx) => {
    setSelectedCategory(idx);
    setSelectedChannelIndex(null); // Limpa índice do canal
    // Não limpa selectedChannel aqui, pois queremos poder voltar pra lista sem interromper vídeo
    // setIsLoadingOrWaiting(false); // Não mexe no loading aqui
    setErrorMessage(''); // Limpa erro ao mudar categoria
    setShowCategories(true);
    setShowChannels(true);
    setActiveMenu('categories');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleChannelSelect = useCallback((channel) => {
    if (channel?.id !== selectedChannel?.id) { // Só recarrega se for um canal diferente
        setSelectedChannel(channel);
        setIsLoadingOrWaiting(true); // Define como true ao selecionar um NOVO canal
        setErrorMessage(''); // Limpa mensagens de erro anteriores
        setShowCategories(false); // Esconde menus ao iniciar playback
        setShowChannels(false);
    } else {
        // Se for o mesmo canal, apenas esconde os menus
        setShowCategories(false);
        setShowChannels(false);
    }
    resetInactivityTimer();
  }, [resetInactivityTimer, selectedChannel]); // Adiciona selectedChannel como dependência

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
    let hlsInstance = null;

    // --- Funções de Callback para Eventos do Vídeo ---
    const handlePlaybackStarted = () => {
        console.log("Evento 'playing' disparado. Ocultando placeholder.");
        setIsLoadingOrWaiting(false); // Oculta o placeholder diretamente
        setErrorMessage(''); // Garante que não há mensagem de erro
    };

    const handleWaitingForData = () => {
        console.log("Evento 'waiting' disparado. Mostrando placeholder.");
        if (!errorMessage) { // Só mostra 'carregando' se não houver erro
             setIsLoadingOrWaiting(true);
        }
    };

    const handleVideoError = (err, hlsErrorData = null) => {
        console.error("Erro no vídeo ou Hls.js:", err, "HLS Data:", hlsErrorData);
        let msg = "Erro ao carregar o canal.";
        if (hlsErrorData) {
            if (hlsErrorData.type === window.Hls.ErrorTypes.NETWORK_ERROR) {
                msg = "Erro de rede ao carregar o canal. Verifique sua conexão.";
            } else if (hlsErrorData.type === window.Hls.ErrorTypes.MEDIA_ERROR) {
                msg = "Erro de mídia. O formato pode não ser suportado ou o stream está corrompido.";
            }
        }
        setErrorMessage(msg);
        setIsLoadingOrWaiting(true); // Mantém o overlay visível com a mensagem de erro
    };
    // --- Fim das Funções de Callback ---


    if (selectedChannel?.link && video) {
        console.log(`Carregando canal: ${selectedChannel.name} - URL: ${selectedChannel.link}`);
        // Reset antes de carregar novo
        if (hlsInstance) {
            hlsInstance.destroy();
        }
        video.removeAttribute("src");
        video.load(); // Força reset do estado do player

        // Garante que controles nativos estão desativados
        video.controls = false;
        video.controlsList = "nodownload nofullscreen noremoteplayback";
        video.disablePictureInPicture = true;

        // Adiciona listeners ANTES de definir a fonte
        video.addEventListener('playing', handlePlaybackStarted);
        video.addEventListener('waiting', handleWaitingForData);
        video.addEventListener('error', (e) => handleVideoError(e, null)); // Erro nativo

        // --- Carregamento com HLS.js ou Nativo ---
        if (window.Hls && window.Hls.isSupported()) {
            console.log("Hls.js é suportado. Inicializando HLS...");
            hlsInstance = new window.Hls({
                maxBufferLength: 30,
                maxMaxBufferLength: 60,
                startLevel: -1,
                debug: false // Mude para true para debug detalhado do HLS
            });

            hlsInstance.loadSource(selectedChannel.link);
            hlsInstance.attachMedia(video);

            hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, () => {
                console.log("Hls.js: MANIFEST_PARSED. Tentando play...");
                video.play().catch(e => handleVideoError(new Error(`Falha ao iniciar play: ${e.message}`), null));
            });

            hlsInstance.on(window.Hls.Events.ERROR, (event, data) => {
                handleVideoError(new Error(`Hls.js Error: ${data.type}`), data);
                // Tentativa de recuperação para alguns erros fatais
                if (data.fatal) {
                    switch(data.type) {
                        case window.Hls.ErrorTypes.NETWORK_ERROR:
                            console.log("Hls.js: Erro de rede fatal, tentando recuperar...");
                            hlsInstance.startLoad();
                            break;
                        case window.Hls.ErrorTypes.MEDIA_ERROR:
                            console.log("Hls.js: Erro de mídia fatal, tentando recuperar...");
                            hlsInstance.recoverMediaError();
                            break;
                        default:
                            console.log("Hls.js: Erro fatal não recuperável, destruindo HLS.");
                            hlsInstance.destroy();
                            break;
                    }
                }
            });

        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
             console.log("Hls.js não suportado, mas navegador suporta HLS nativamente.");
             video.src = selectedChannel.link;
             video.play().catch(e => handleVideoError(new Error(`Falha ao iniciar play nativo: ${e.message}`), null));
        }
         else {
            console.error("Hls.js não suportado e HLS nativo também não. Tentando como vídeo normal (pode falhar).");
             video.src = selectedChannel.link; // Pode não funcionar para HLS
             handleVideoError(new Error("Formato HLS não suportado pelo navegador."), null);
         }

    } else {
        // Se não há canal selecionado, garante que o loading está falso
        setIsLoadingOrWaiting(false);
        setErrorMessage('');
    }

    // --- Função de Limpeza ---
    return () => {
        console.log("Limpando player para o canal:", selectedChannel?.name);
        if (video) {
            video.removeEventListener('playing', handlePlaybackStarted);
            video.removeEventListener('waiting', handleWaitingForData);
            video.removeEventListener('error', (e) => handleVideoError(e, null)); // Precisa referenciar a mesma função ou usar wrapper para remover
            video.pause();
            video.removeAttribute("src");
            video.load();
        }
        if (hlsInstance) {
            console.log("Destruindo instância Hls.js");
            hlsInstance.destroy();
        }
        // Não resetar isLoadingOrWaiting aqui na limpeza geral,
        // pois pode ser chamado enquanto um novo canal está para ser carregado.
        // O reset acontece no handleChannelSelect ou quando o vídeo começa a tocar.
    };
}, [selectedChannel]); // Dependência principal é o canal selecionado


  // Desativar controles quando o mouse se movimenta sobre o vídeo (já tratado no CSS e atributos)
  const handleMouseMove = useCallback(() => {
    resetInactivityTimer();
    // Mostra menus se estiverem ocultos e houver movimento sobre o player
    if (!showCategories && !showChannels && selectedChannel) {
         //showMenus(); // Descomente se quiser que QUALQUER movimento mostre os menus
    }
  }, [resetInactivityTimer, showCategories, showChannels, selectedChannel /*, showMenus*/]);

  // Hook de teclado
  const handleKeyDown = useCallback((e) => {
    resetInactivityTimer(); // Reseta o timer de inatividade em qualquer tecla

    const channelsForCategory =
      selectedCategory === 0
        ? allChannels
        : channels[categories[selectedCategory]] || [];

    const currentCategoryKey = categories[selectedCategory];
    const currentChannels = selectedCategory === 0 ? allChannels : channels[currentCategoryKey] || [];

    // Se menus ocultos (está assistindo)
    if (!showCategories && !showChannels && selectedChannel) {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' ) {
        e.preventDefault();
        showMenus(); // Mostra os menus novamente com Enter ou Escape
      }
      return;
    }

    // Se menus visíveis
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (activeMenu === 'categories') {
          const nextIndex = Math.max(0, selectedCategory - 1);
            if(nextIndex !== selectedCategory) handleCategorySelect(nextIndex);
        } else if (activeMenu === 'channels') {
          setSelectedChannelIndex(prev => Math.max(0, (prev ?? 0) - 1));
        }
        break;
      case 'ArrowDown':
         e.preventDefault();
        if (activeMenu === 'categories') {
          const nextIndex = Math.min(categories.length - 1, selectedCategory + 1);
            if(nextIndex !== selectedCategory) handleCategorySelect(nextIndex);
        } else if (activeMenu === 'channels') {
          setSelectedChannelIndex(prev => Math.min(currentChannels.length - 1, (prev ?? -1) + 1));
        }
        break;
      case 'ArrowRight':
         e.preventDefault();
        if (activeMenu === 'categories' && currentChannels.length > 0) {
          setActiveMenu('channels');
            // Se já houver um canal tocando e ele pertence a essa categoria, seleciona ele
            const playingChannelIndex = currentChannels.findIndex(ch => ch.id === selectedChannel?.id);
            if (playingChannelIndex !== -1) {
                 setSelectedChannelIndex(playingChannelIndex);
            } else {
                setSelectedChannelIndex(0); // Senão, seleciona o primeiro
            }
        }
        break;
      case 'ArrowLeft':
         e.preventDefault();
        if (activeMenu === 'channels') {
          setActiveMenu('categories');
          // setSelectedChannelIndex(null); // Não deseleciona visualmente ao voltar
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (activeMenu === 'channels' && selectedChannelIndex !== null && currentChannels[selectedChannelIndex]) {
          handleChannelSelect(currentChannels[selectedChannelIndex]);
        } else if (activeMenu === 'categories' && currentChannels.length > 0) {
            // Ao pressionar Enter na categoria, entra na lista de canais
             setActiveMenu('channels');
             const playingChannelIndex = currentChannels.findIndex(ch => ch.id === selectedChannel?.id);
             setSelectedChannelIndex(playingChannelIndex !== -1 ? playingChannelIndex : 0);
        }
        break;
      case 'Escape':
         e.preventDefault();
        if (activeMenu === 'channels') {
            // Se na lista de canais, volta para categorias
            setActiveMenu('categories');
        } else if (activeMenu === 'categories' && selectedChannel) {
             // Se nas categorias e um canal está tocando, esconde os menus
             setShowCategories(false);
             setShowChannels(false);
        }
        // Se um canal estiver tocando e menus visíveis, Escape não faz nada (ou poderia parar o canal?)
        // A lógica atual: Se menus estão visíveis, Escape navega para trás (canais -> categorias)
        // Se menus ocultos, Escape os mostra (tratado no início da função)
        break;
      default:
        break;
    }
  }, [
    resetInactivityTimer,
    selectedCategory,
    selectedChannelIndex,
    selectedChannel,
    allChannels,
    showCategories,
    showChannels,
    activeMenu,
    showMenus,
    handleCategorySelect,
    handleChannelSelect
  ]);

  // Registra listener de teclado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Adiciona efeito para ajustar vídeos quando o componente montar (boa prática)
  useEffect(() => {
    const configureVideos = () => {
      document.querySelectorAll('video').forEach(video => {
        if (video.style.backgroundColor !== 'rgb(0, 0, 0)') { // Evita redefinições desnecessárias
             video.style.backgroundColor = '#000000';
        }
        if (!video.hasAttribute('poster') || video.getAttribute('poster') === '') {
             video.setAttribute('poster', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
        }
        if (video.controls) {
             video.controls = false;
        }
        if (!video.hasAttribute('playsInline')) {
             video.setAttribute('playsInline', '');
        }
         if (!video.hasAttribute('disablePictureInPicture')) {
             video.setAttribute('disablePictureInPicture', '');
         }
         if (!video.hasAttribute('controlsList')) {
             video.setAttribute('controlsList', 'nodownload nofullscreen noremoteplayback');
         }
      });
    };
    configureVideos(); // Executa ao montar
    // Considerar remover o intervalo se não houver problemas de redefinição pelo WebView
    // const interval = setInterval(configureVideos, 3000);
    // return () => clearInterval(interval);
  }, []);


  const channelsForCategory =
    selectedCategory === 0
      ? allChannels
      : channels[categories[selectedCategory]] || [];

  return (
    <div className="app" onMouseMove={handleMouseMove}>
      {/* Overlay escuro sobre o vídeo quando menus estão visíveis */}
      {(showCategories || showChannels) && selectedChannel && <div className="overlay" />}

      {/* --- Coluna da Sidebar (Categorias) --- */}
      {showCategories && (
        <nav className="sidebar">
          {categories.map((cat, i) => (
            <div
              key={cat + i} // Chave única
              className={`category ${i === selectedCategory && activeMenu === 'categories' ? "active" : ""}`}
              onClick={() => handleCategorySelect(i)}
                ref={el => { // Scroll para o item ativo
                    if (i === selectedCategory && activeMenu === 'categories' && el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }}
            >
              {cat}
            </div>
          ))}
        </nav>
      )}

      {/* --- Coluna de Conteúdo (Canais) --- */}
      {showChannels && (
        <section className="content">
          <header className="content-header">
            {categories[selectedCategory]} ({channelsForCategory.length})
          </header>
          <ul className="channel-list">
            {channelsForCategory.length > 0 ? channelsForCategory.map((chan, idx) => (
              <li
                key={chan.id} // Usar ID do canal como chave
                className={`channel ${idx === selectedChannelIndex && activeMenu === 'channels' ? "active" : ""}`}
                onClick={() => {
                  setSelectedChannelIndex(idx);
                  setActiveMenu('channels'); // Garante foco nos canais
                  handleChannelSelect(chan);
                }}
                ref={el => { // Scroll para o item ativo
                    if (idx === selectedChannelIndex && activeMenu === 'channels' && el) {
                         el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }}
              >
                <span className="channel-id">{idx + 1}</span> {/* Ou chan.id se preferir */}
                <img
                      src={chan.logo || 'placeholder.png'} // Usa placeholder se não houver logo
                      alt="" // Alt vazio é aceitável para logos decorativos
                      className="channel-logo"
                      onError={(e) => e.target.src='placeholder.png'} // Fallback se logo falhar
                  />
                <span className="channel-name">{chan.name}</span>
              </li>
            )) : (
                <li className="channel-name" style={{padding: '20px', textAlign: 'center'}}>Nenhum canal nesta categoria.</li>
             )}
          </ul>
        </section>
      )}

      {/* --- Player de Vídeo em Background --- */}
       {/* Renderiza o player container sempre que houver um canal selecionado,
           mesmo que os menus estejam visíveis por cima */}
      {selectedChannel && (
        <div className="player" onClick={showMenus} > {/* Click no player mostra menus */}
          <video
            ref={videoRef}
            id="video-player"
            autoPlay
            muted={false} // Começa com som
            playsInline // Essencial para iOS e alguns WebViews
            // Atributos para tentar desabilitar controles/interações
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className="no-controls" // Classe CSS para ocultar controles via pseudo-seletores
            poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" // Poster transparente
          />

          {/* Camada de placeholder/carregamento/erro */}
          {/* Mostra se isLoadingOrWaiting for true */}
          <div className={`loading-overlay ${!isLoadingOrWaiting ? "hidden" : ""}`}>
            <div className="loading-message">
              {/* Exibe mensagem de erro ou de carregamento */}
              {errorMessage ? errorMessage : "Carregando canal... Por favor, aguarde."}
            </div>
            {/* Opcional: Adicionar um spinner CSS aqui */}
            {!errorMessage && <div className="spinner"></div> /* Adicione CSS para .spinner */}
          </div>
        </div>
      )}

       {/* Elemento para depuração (opcional) */}
       {/* <pre style={{position: 'absolute', bottom: 0, left: 0, color: 'lime', zIndex: 100, background: 'rgba(0,0,0,0.5)', fontSize: '10px'}}>
            isLoading: {isLoadingOrWaiting.toString()}, error: {errorMessage}, channel: {selectedChannel?.name}
       </pre> */}

    </div>
  );
};

export default App;

// Adicione este CSS para o spinner (exemplo simples) em App.css
/*
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-top: 15px; // Espaçamento da mensagem
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/
