import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Carousel from './components/Carousel';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import NewsModal from './components/NewsModal';
import AuthModal from './components/AuthModal';
import ContactModal from './components/ContactModal';

// Guardamos tu URL de MockAPI en una constante para no repetirla
const API_URL = 'https://6a4361206dba791499aa8527.mockapi.io/Noticias';

function App() {
  const [user, setUser] = useState(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [authView, setAuthView] = useState('login');
  const [editIndex, setEditIndex] = useState(null);
  const [news, setNews] = useState([]);

  // --- 1. LEER (GET): Traer noticias de MockAPI al iniciar ---
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL);
        setNews(response.data);
      } catch (error) {
        console.error("Error cargando noticias desde MockAPI:", error);
      }
    };
    fetchNews();
  }, []);

  // --- 2. CREAR (POST): Agregar noticia a MockAPI ---
  const handleAddNews = async (newArticle) => {
    try {
      const response = await axios.post(API_URL, newArticle);
      setNews([...news, response.data]); 
      setIsNewsModalOpen(false);
    } catch (error) {
      console.error("Error guardando la noticia:", error);
      alert("Hubo un error al guardar en la nube.");
    }
  };

  // --- 3. ACTUALIZAR (PUT): Editar noticia en MockAPI ---
  const handleUpdateNews = async (updatedArticle) => {
    try {
      const articleId = news[editIndex].id;
      
      if (!articleId) {
        alert("Error: No se encontró el ID de esta noticia.");
        return;
      }

      const response = await axios.put(`${API_URL}/${articleId}`, updatedArticle);
      
      const updatedNews = news.map((item, index) => 
        index === editIndex ? response.data : item
      );
      setNews(updatedNews);
      setIsNewsModalOpen(false);
      setEditIndex(null);
    } catch (error) {
      console.error("Error actualizando la noticia:", error);
      alert("Hubo un error al actualizar en la nube.");
    }
  };

  // --- 4. ELIMINAR (DELETE): Borrar noticia de MockAPI ---
  const handleDeleteNews = async (index) => {
    if (!user) return alert("Debes iniciar sesión para eliminar noticias.");
    
    try {
      const articleId = news[index].id;
      
      if (!articleId) return;

      await axios.delete(`${API_URL}/${articleId}`);
      
      setNews(news.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error eliminando la noticia:", error);
      alert("Hubo un error al eliminar en la nube.");
    }
  };

  // --- LÓGICA DE SESIÓN (Local) ---
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

  const handleStartEdit = (index) => {
    if (!user) return alert("Debes iniciar sesión para editar noticias.");
    setEditIndex(index);
    setIsNewsModalOpen(true);
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