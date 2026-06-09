import { useState } from 'react'; // <-- Importa useState
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Carousel from './components/Carousel';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal'; // <-- Importa el Modal

function App() {
  // Estados para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState('login'); // 'login' o 'register'

  // Función para abrir el modal
  const handleOpenModal = (viewType) => {
    setModalView(viewType);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      {/* Le pasamos la función al Header */}
      <Header openModal={handleOpenModal} />
      
      <main>
        <Hero />
        <Stats />
        <Carousel />
        <Features />
        <FAQ />
      </main>
      
      <Footer />

      {/* Aquí renderizamos el Modal flotante */}
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        initialView={modalView} 
      />
    </div>
  );
}

export default App;