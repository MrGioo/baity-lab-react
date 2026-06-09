import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Carousel from './components/Carousel';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import NewsModal from './components/NewsModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Guarda el índice de la noticia a modificar
  
  const [news, setNews] = useState([
      {
          img: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/07/bethesda-game-studios-1.jpg",
          title: '"It Just Works"',
          desc: "Bethesda lo ha vuelto a hacer: Skyrim para tu tostadora inteligente."
      },
      {
          img: "https://i.ytimg.com/vi/GlfuH8Q6WkE/maxresdefault.jpg",
          title: "Indie Pretencioso Starter Pack",
          desc: "Gráficos de GameBoy y mucha depresión. GOTY instantáneo."
      },
      {
          img: "https://static.wikia.nocookie.net/callofduty/images/5/59/Activision-Symbol.png/revision/latest/scale-to-width-down/1200?cb=20240104172851&path-prefix=fr",
          title: "Crunch Time",
          desc: "¿Dormir? Eso no está en el roadmap de la empresa."
      }
  ]);

  // C - CREATE: Añade el nuevo objeto al estado
  const handleAddNews = (newArticle) => {
      setNews([...news, newArticle]);
      setIsModalOpen(false);
  };

  // U - UPDATE (Parte 1): Abre el modal cargando el índice seleccionado
  const handleStartEdit = (index) => {
      setEditIndex(index);
      setIsModalOpen(true);
  };

  // U - UPDATE (Parte 2): Reemplaza la noticia vieja con los datos modificados
  const handleUpdateNews = (updatedArticle) => {
      const updatedNews = news.map((item, index) => 
          index === editIndex ? updatedArticle : item
      );
      setNews(updatedNews);
      setIsModalOpen(false);
      setEditIndex(null);
  };

  // D - DELETE: Filtra el arreglo excluyendo el índice seleccionado
  const handleDeleteNews = (index) => {
      const filteredNews = news.filter((_, i) => i !== index);
      setNews(filteredNews);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
      setEditIndex(null);
  };

  return (
    <div className="container">
      {/* Al presionar Añadir Noticia desde el Header, nos aseguramos de limpiar el índice de edición */}
      <Header openModal={() => { setEditIndex(null); setIsModalOpen(true); }} />
      
      <main>
        <Hero />
        <Stats />
        
        {/* R - READ: Pasa las noticias y las acciones U y D al carrusel */}
        <Carousel 
          slides={news} 
          onStartEdit={handleStartEdit} 
          onDelete={handleDeleteNews} 
        />
        
        <Features />
        <FAQ />
      </main>
      
      <Footer />

      <NewsModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onAdd={handleAddNews}
        onUpdate={handleUpdateNews}
        editData={editIndex !== null ? news[editIndex] : null} // Envía los datos correspondientes si existe edición activa
      />
    </div>
  );
}

export default App;