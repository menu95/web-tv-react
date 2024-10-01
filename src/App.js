import React, { useEffect, useState } from "react";
import "./App.css";
import channels from "./channels"; // seu arquivo de canais

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("ANIME");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showCategories, setShowCategories] = useState(true);
  const [showChannels, setShowChannels] = useState(true);

  const categories = [
    "TODOS",
    "LISTA DE FAVORITOS",
    "TOP & NOVO",
    "ANIME",
    "UHD",
    "NOTÍCIAS COVID-19",
    "ESPORTE",
    "FILMES & SÉRIES",
    "ABERTOS",
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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedChannel(null); // Limpa o canal selecionado ao trocar de categoria
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

  return (
    <div className="app">
      {showCategories && (
        <div className="sidebar">
          {categories.map((category) => (
            <div
              key={category}
              className={`category ${
                category === selectedCategory ? "active" : ""
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </div>
          ))}
        </div>
      )}

      {showChannels && selectedCategory && (
        <div className="content">
          <h2>{selectedCategory}</h2>
          <ul className="channel-list">
            {(selectedCategory === "TODOS"
              ? allChannels
              : channels[selectedCategory]
            ).map((channel) => (
              <li
                key={channel.id}
                className="channel"
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
