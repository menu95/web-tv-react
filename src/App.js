// App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import channels from "./channels";
import useKeyboardNavigation from "./useKeyboardNavigation"; // Importa o hook de navegação

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedChannelIndex, setSelectedChannelIndex] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showCategories, setShowCategories] = useState(true);
  const [showChannels, setShowChannels] = useState(true);

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
    "CANAIS DE RADIO",
  ];

  const [allChannels, setAllChannels] = useState([]);

  // Calcula todos os canais sem repetição para a categoria "TODOS"
  useEffect(() => {
    const uniqueChannels = Object.values(channels)
      .flat()
      .reduce((acc, channel) => {
        if (!acc.some((c) => c.id === channel.id)) {
          acc.push(channel);
        }
        return acc;
      }, []);
    setAllChannels(uniqueChannels);
  }, []);

  const handleCategorySelect = (index) => {
    setSelectedCategory(index);
    setSelectedChannelIndex(0); // Reseta o canal selecionado quando muda de categoria
    setSelectedChannel(null); // Limpa o canal selecionado
  };

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    setShowCategories(false);
    setShowChannels(false);
  };

  useEffect(() => {
    const video = document.getElementById("video-player");

    if (selectedChannel && selectedChannel.link) {
      if (window.Hls.isSupported()) {
        const hls = new window.Hls();
        hls.loadSource(selectedChannel.link);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = selectedChannel.link; // Caso suporte nativo HLS
      }
    }

    return () => {
      if (video) {
        video.pause();
        video.removeAttribute("src"); // Remove o link do vídeo
        video.load();
      }
    };
  }, [selectedChannel]);

  // Usa o hook para a navegação por teclado
  useKeyboardNavigation({
    selectedCategory,
    setSelectedCategory,
    selectedChannelIndex,
    setSelectedChannelIndex,
    categories,
    allChannels,
    channels,
    showCategories,
    setShowCategories,
    setShowChannels,
    handleChannelSelect,
  });

  return (
    <div className="app">
      {showCategories && (
        <div className="sidebar">
          {categories.map((category, index) => (
            <div
              key={category}
              className={`category ${
                index === selectedCategory ? "active" : ""
              }`}
              onClick={() => handleCategorySelect(index)}
            >
              {category}
            </div>
          ))}
        </div>
      )}

      {showChannels && selectedCategory >= 0 && (
        <div className="content">
          <h2>{categories[selectedCategory]}</h2>
          <ul className="channel-list">
            {(selectedCategory === 0
              ? allChannels
              : channels[categories[selectedCategory]]
            ).map((channel, index) => (
              <li
                key={channel.id}
                className={`channel ${
                  index === selectedChannelIndex ? "active" : ""
                }`}
                onClick={() => handleChannelSelect(channel)}
              >
                {channel.id} - {channel.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedChannel && (
        <div className="player">
          <video id="video-player" controls autoPlay>
            Seu navegador não suporta o player de vídeo.
          </video>
        </div>
      )}
    </div>
  );
};

export default App;
