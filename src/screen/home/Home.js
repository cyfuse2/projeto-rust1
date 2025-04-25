import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ComicCard from '../../components/ComicCard';
import './Home.css';

// Dados de exemplo para simular a resposta da API
const mockComics = [
    {
        id: 1,
        title: "Batman: O Cavaleiro das Trevas",
        author: "Frank Miller",
        price: 15.90,
        image: "https://m.media-amazon.com/images/I/81Q26VNallL._AC_UL320_.jpg"
      },
      {
        id: 2,
        title: "Watchmen",
        author: "Alan Moore",
        price: 18.50,
        image: "https://m.media-amazon.com/images/I/81SXU0TTdxL._AC_UL320_.jpg"
      },
      {
        id: 3,
        title: "Sandman",
        author: "Neil Gaiman",
        price: 22.90,
        image: "https://m.media-amazon.com/images/I/81YUGMBd0aL._AC_UL320_.jpg"
      },
      {
        id: 4,
        title: "Turma da Mônica Jovem",
        author: "Mauricio de Sousa",
        price: 12.50,
        image: "https://m.media-amazon.com/images/I/91CjuqOgbDL._AC_UL320_.jpg"
      },
      {
        id: 5,
        title: "One Piece Vol. 1",
        author: "Eiichiro Oda",
        price: 19.90,
        image: "https://m.media-amazon.com/images/I/716EGgqzyOL._AC_UL320_.jpg"
      },
      {
        id: 6,
        title: "Naruto Vol. 1",
        author: "Masashi Kishimoto",
        price: 17.90,
        image: "https://m.media-amazon.com/images/I/91xUwI2UEVL._AC_SY741_.jpg"
      },
      {
        id: 7,
        title: "Homem-Aranha: De Volta ao Lar",
        author: "Marvel Comics",
        price: 16.50,
        image: "https://m.media-amazon.com/images/I/81yhhjdThoS._AC_UL320_.jpg"
      },
      {
        id: 8,
        title: "Saga Vol. 1",
        author: "Brian K. Vaughan",
        price: 24.90,
        image: "https://m.media-amazon.com/images/I/81s49EEptML._AC_UL320_.jpg"
      }
    ];

const Home = () => {
  const [comics, setComics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulando uma chamada de API
    fetchComics();
  }, []);

  const fetchComics = () => {
    // Em um cenário real, você faria uma chamada fetch para a API
    setTimeout(() => {
      setComics(mockComics);
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredComics = mockComics.filter(comic => 
      comic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      comic.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setComics(filteredComics);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    // Em um cenário real, você filtraria com base no gênero
    // Por enquanto, apenas recarregamos os quadrinhos
    fetchComics();
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    let sortedComics = [...comics];
    
    switch(e.target.value) {
      case 'preco-asc':
        sortedComics.sort((a, b) => a.price - b.price);
        break;
      case 'preco-desc':
        sortedComics.sort((a, b) => b.price - a.price);
        break;
      default:
        // Sem ordenação específica
        break;
    }
    
    setComics(sortedComics);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <Navbar onLogout={handleLogout} />
      
      <section className="hero">
        <h2>Bem-vindo à Biblioteca de Quadrinhos</h2>
        <p>Explore nossa coleção e alugue seus quadrinhos favoritos!</p>
      </section>

      <section className="filters">
        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Buscar quadrinhos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
        <div className="filter-options">
          <select value={selectedGenre} onChange={handleGenreChange}>
            <option value="">Todos os gêneros</option>
            <option value="acao">Ação</option>
            <option value="aventura">Aventura</option>
            <option value="comedia">Comédia</option>
            <option value="drama">Drama</option>
            <option value="ficcao">Ficção Científica</option>
            <option value="manga">Mangá</option>
          </select>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">Ordenar por</option>
            <option value="recentes">Mais recentes</option>
            <option value="populares">Mais populares</option>
            <option value="preco-asc">Preço: menor para maior</option>
            <option value="preco-desc">Preço: maior para menor</option>
          </select>
        </div>
      </section>

      <section className="comics-grid">
        {comics.length > 0 ? (
          comics.map(comic => (
            <ComicCard 
              key={comic.id} 
              comic={comic} 
            />
          ))
        ) : (
          <p className="no-results">Nenhum quadrinho encontrado.</p>
        )}
      </section>
    </div>
  );
};

export default Home;