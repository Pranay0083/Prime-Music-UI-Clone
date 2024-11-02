import React, { useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa";
import { api } from "../../services/api";

const LikeButton = ({ song, initialLiked = false }) => {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleLikeToggle = async (e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      const response = await api.toggleFavourite(token, song._id);
      setIsLiked(response.message === "song added to favorites successfully.");
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return isLiked ? (
    <FaCheck
      className="text-green-500 w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
      onClick={handleLikeToggle}
    />
  ) : (
    <FaPlus
      className="text-white w-4 h-4 cursor-pointer hover:scale-110 transition-transform"
      onClick={handleLikeToggle}
    />
  );
};

export default LikeButton;