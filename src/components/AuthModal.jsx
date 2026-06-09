import { useState, useEffect } from 'react';

export default function AuthModal({ isOpen, onClose, initialView }) {
    // Estado para saber si mostramos 'login' o 'register'
    const [view, setView] = useState(initialView);

    // Cuando el modal se abre, nos aseguramos de mostrar la vista correcta que pidió el botón
    useEffect(() => {
        setView(initialView);
    }, [initialView, isOpen]);

    // Si el modal no está abierto, no renderizamos nada
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Simulando ${view}... ¡Aquí conectaremos la base de datos después!`);
        onClose(); // Cierra el modal después de "enviar"
    };

    return (
        <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>{view === 'login' ? 'Iniciar Sesión' : 'Registrarse'}</h2>

                {view === 'login' ? (
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input type="email" placeholder="Correo electrónico" required />
                        <input type="password" placeholder="Contraseña" required />
                        <button type="submit" className="btn">Ingresar</button>
                        <p className="toggle-text">
                            ¿No tienes cuenta? <span onClick={() => setView('register')}>Regístrate aquí</span>
                        </p>
                    </form>
                ) : (
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Nombre completo" required />
                        <input type="email" placeholder="Correo electrónico" required />
                        <input type="password" placeholder="Contraseña" required />
                        <button type="submit" className="btn">Crear cuenta</button>
                        <p className="toggle-text">
                            ¿Ya tienes cuenta? <span onClick={() => setView('login')}>Inicia sesión</span>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}