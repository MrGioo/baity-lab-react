import { useState, useEffect } from 'react';

export default function Header({ openModal }) {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="header">
            <h1>Baity Lab <span>(Beta Rota)</span></h1> 
            
            <nav className="main-nav">
                <ul>
                    <li><a href="#stats-section">Estadísticas</a></li>
                    <li><a href="#noticias">Noticias</a></li>
                    <li><a href="#caracteristicas">Características</a></li>
                    <li><a href="#faq">FAQ</a></li>
                </ul>
            </nav>

            <div className="nav-controls">
                <button 
                    className="theme-toggle" 
                    onClick={toggleTheme} 
                    aria-label="Cambiar tema"
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                <div className="auth-container">
                    <div id="guestView">
                        {/* Botón único para agregar noticias */}
                        <button onClick={openModal} className="btn">Añadir Noticia</button>
                    </div>
                </div>
            </div>
        </header>
    );
}