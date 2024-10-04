// useKeyboardNavigation.js
import { useEffect } from "react";

const useKeyboardNavigation = ({
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
}) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        if (showCategories) {
          setShowCategories(false);
          setShowChannels(false);
          handleChannelSelect(
            (selectedCategory === 0
              ? allChannels
              : channels[categories[selectedCategory]])[selectedChannelIndex]
          );
        } else {
          setShowCategories(true);
          setShowChannels(true);
        }
      }

      // Navegação para cima e para baixo
      if (event.key === "ArrowDown") {
        if (showCategories) {
          setSelectedCategory((prev) =>
            prev < categories.length - 1 ? prev + 1 : prev
          );
        } else {
          setSelectedChannelIndex((prev) =>
            prev <
            (selectedCategory === 0
              ? allChannels.length - 1
              : channels[categories[selectedCategory]].length - 1)
              ? prev + 1
              : prev
          );
        }
      }

      if (event.key === "ArrowUp") {
        if (showCategories) {
          setSelectedCategory((prev) => (prev > 0 ? prev - 1 : prev));
        } else {
          setSelectedChannelIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
      }

      // Navegação para a esquerda e direita entre categorias e canais
      if (event.key === "ArrowLeft") {
        setShowCategories(true);
        setShowChannels(true);
      }

      if (event.key === "ArrowRight") {
        setShowCategories(false);
        setShowChannels(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    selectedCategory,
    selectedChannelIndex,
    showCategories,
    categories,
    allChannels,
    channels,
    setSelectedCategory,
    setSelectedChannelIndex,
    setShowCategories,
    setShowChannels,
    handleChannelSelect,
  ]);
};

export default useKeyboardNavigation;
