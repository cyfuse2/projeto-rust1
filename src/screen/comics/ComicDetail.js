import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './ComicDetail.css';

// Dados de exemplo para simular a resposta da API
const mockComics = [
  {
    id: 1,
    title: "Batman: O Cavaleiro das Trevas",
    author: "Frank Miller",
    price: 15.90,
    image: "https://via.placeholder.com/250x350/1a1a1a/ffffff?text=Batman",
    description: "Uma das histórias mais icônicas do Batman, onde Bruce Wayne retorna da aposentadoria para combater o crime em uma Gotham City distópica.",
    publisher: "DC Comics",
    year: 1986,
    pages: 224,
    genre: "Super-heróis, Ação, Drama"
  },
  {
    id: 2,
    title: "Watchmen",
    author: "Alan Moore",
    price: 18.50,
    image: "https://via.placeholder.com/250x350/4a6899/ffffff?text=Watchmen",
    description: "Uma história revolucionária que desconstruiu o gênero de super-heróis, explorando temas como poder, moralidade e a condição humana.",
    publisher: "DC Comics",
    year: 1986,
    pages: 416,
    genre: "Super-heróis, Drama, Ficção Científica"
  },
  // Outros quadrinhos...
];

const ComicDetail = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulando uma chamada de API
    const fetchComic = () => {
      setLoading(true);
      setTimeout(() => {
        const foundComic = mockComics.find(c => c.id === parseInt(id));
        setComic(foundComic || null);
        setLoading(false);
      }, 500);
    };

    fetchComic();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleRent = () => {
    alert(`Quadrinho "${comic.title}" alugado com sucesso!`);
    // Em um cenário real, você faria uma chamada para a API
  };

  const handleReserve = () => {
    alert(`Quadrinho "${comic.title}" reservado com sucesso!`);
    // Em um cenário real, você faria uma chamada para a API
  };

  if (loading) {
    return (
      <div className="comic-detail-container">
        <Navbar onLogout={handleLogout} />
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  if (!comic) {
    return (
      <div className="comic-detail-container">
        <Navbar onLogout={handleLogout} />
        <div className="not-found">
          <h2>Quadrinho não encontrado</h2>
          <button onClick={() => navigate('/home')} className="back-btn">
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="comic-detail-container">
      <Navbar onLogout={handleLogout} />
      
      <div className="comic-detail">
        <div className="comic-detail-left">
          <img src={comic.image} alt={comic.title} className="comic-detail-image" />
        </div>
        
        <div className="comic-detail-right">
          <h1 className="comic-detail-title">{comic.title}</h1>
          <p className="comic-detail-author">por {comic.author}</p>
          
          <div className="comic-detail-info">
            <div className="info-item">
              <span className="info-label">Editora:</span>
              <span className="info-value">{comic.publisher}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Ano:</span>
              <span className="info-value">{comic.year}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Páginas:</span>
              <span className="info-value">{comic.pages}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Gênero:</span>
              <span className="info-value">{comic.genre}</span>
            </div>
          </div>
          
          <div className="comic-detail-description">
            <h3>Descrição</h3>
            <p>{comic.description}</p>
          </div>
          
          <div className="comic-detail-price">
            <span className="price-label">Preço de aluguel:</span>
            <span className="price-value">{formatPrice(comic.price)}/mês</span>
          </div>
          
          <div className="comic-detail-actions">
            <button className="action-btn rent-btn" onClick={handleRent}>Alugar</button>
            <button className="action-btn reserve-btn" onClick={handleReserve}>Reservar</button>
            <button className="action-btn back-btn" onClick={() => navigate('/home')}>Voltar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicDetail;