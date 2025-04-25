import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComicCard.css';

const ComicCard = ({ comic }) => {
  const navigate = useNavigate();
  
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleRent = (e) => {
    e.stopPropagation();
    alert(`Quadrinho "${comic.title}" alugado com sucesso!`);
    // Em um cenário real, você faria uma chamada para a API
  };

  const handleReserve = (e) => {
    e.stopPropagation();
    alert(`Quadrinho "${comic.title}" reservado com sucesso!`);
    // Em um cenário real, você faria uma chamada para a API
  };

  const handleCardClick = () => {
    navigate(`/comics/${comic.id}`);
  };

  return (
    <div className="comic-card" onClick={handleCardClick}>
      <img src={comic.image} alt={comic.title} className="comic-image" />
      <div className="comic-info">
        <h3 className="comic-title">{comic.title}</h3>
        <p className="comic-author">{comic.author}</p>
        <p className="comic-price">{formatPrice(comic.price)}/mês</p>
        <div className="comic-actions">
          <button className="rent-btn" onClick={handleRent}>Alugar</button>
          <button className="reserve-btn" onClick={handleReserve}>Reservar</button>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;