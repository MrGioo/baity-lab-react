import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Carousel from './components/Carousel';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import NewsModal from './components/NewsModal';
import AuthModal from './components/AuthModal'; // Importar AuthModal
import ContactModal from './components/ContactModal'; // Importar ContactModal

function App() {
  const [user, setUser] = useState(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [authView, setAuthView] = useState('login');
  const [editIndex, setEditIndex] = useState(null);
  
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


  // Verificar si hay sesión activa al cargar
  useEffect(() => {
      const loggedUser = localStorage.getItem('currentUser');
      if (loggedUser) {
          setUser(JSON.parse(loggedUser));
      }
  }, []);

  const handleLogout = () => {
      localStorage.removeItem('currentUser');
      setUser(null);
  };

  const handleAuthSuccess = (userData) => {
      setUser(userData);
      setIsAuthModalOpen(false);
  };

  const handleOpenAuth = (viewType) => {
      setAuthView(viewType);
      setIsAuthModalOpen(true);
  };

  // CRUD Funciones
  const handleAddNews = (newArticle) => {
      setNews([...news, newArticle]);
      setIsNewsModalOpen(false);
  };

  const handleStartEdit = (index) => {
      if (!user) return alert("Debes iniciar sesión para editar noticias.");
      setEditIndex(index);
      setIsNewsModalOpen(true);
  };

  const handleUpdateNews = (updatedArticle) => {
      const updatedNews = news.map((item, index) => 
          index === editIndex ? updatedArticle : item
      );
      setNews(updatedNews);
      setIsNewsModalOpen(false);
      setEditIndex(null);
  };

  const handleDeleteNews = (index) => {
      if (!user) return alert("Debes iniciar sesión para eliminar noticias.");
      const filteredNews = news.filter((_, i) => i !== index);
      setNews(filteredNews);
  };

  return (
    <div className="container">
      <Header 
        user={user}
        onLogout={handleLogout}
        openNewsModal={() => { setEditIndex(null); setIsNewsModalOpen(true); }}
        openAuthModal={handleOpenAuth}
        openContactModal={() => setIsContactModalOpen(true)}
      />
      
      <main>
        <Hero />
        <Stats />
        <Carousel 
          slides={news} 
          onStartEdit={handleStartEdit} 
          onDelete={handleDeleteNews} 
          user={user}
        />
        <Features />
        <FAQ />
      </main>
      
      <Footer />

      {/* Modales */}
      <NewsModal 
        isOpen={isNewsModalOpen} 
        onClose={() => setIsNewsModalOpen(false)} 
        onAdd={handleAddNews}
        onUpdate={handleUpdateNews}
        editData={editIndex !== null ? news[editIndex] : null} 
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        initialView={authView}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        user={user}
      />
    </div>
  );
}

export default App;