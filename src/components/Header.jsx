import { useState, useEffect } from 'react';

export default function Header({ 
    user, 
    onLogout, 
    openNewsModal, 
    openAuthModal, 
    openContactModal 
}) {
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
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                
                <div className="auth-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {user ? (
                        <>
                            <span id="userGreeting" style={{ marginRight: '10px' }}>Hola, {user.name}</span>
                            <button onClick={openNewsModal} className="btn" style={{ margin: '0' }}>Añadir Noticia</button>
                            <button onClick={openContactModal} className="btn btn-outline" style={{ margin: '0' }}>Contacto</button>
                            <button onClick={onLogout} className="btn-logout">Salir</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => openAuthModal('login')} className="btn" style={{ margin: '0' }}>Iniciar Sesión</button>
                            <button onClick={() => openAuthModal('register')} className="btn btn-outline" style={{ margin: '0' }}>Registrarse</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}