import { useState, useEffect } from 'react';
import axios from 'axios';

// Reemplaza esta URL con la que te dio MockAPI para el recurso "Usuarios"
const API_USERS = 'https://6a4361206dba791499aa8527.mockapi.io/Usuarios';

export default function AuthModal({ isOpen, onClose, initialView, onAuthSuccess }) {
    const [view, setView] = useState(initialView);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setView(initialView);
        setName('');
        setEmail('');
        setPassword('');
    }, [initialView, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (view === 'register') {
                // 1. Validar nombre
                const hasLetters = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(name);
                if (!hasLetters || name.trim().length < 3) {
                    return alert('El nombre es inválido. Debe contener letras y tener al menos 3 caracteres.');
                }

                // 2. Validar correo
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl|net|org|edu|gov|io)$/i;
                if (!emailRegex.test(email)) {
                    return alert('Por favor, ingresa un correo electrónico válido.');
                }

                // 3. Validar contraseña
                if (password.length < 6) {
                    return alert('La contraseña debe tener al menos 6 caracteres.');
                }

                // CORRECCIÓN: Traemos los usuarios y comparamos el email de forma exacta en JS
                const responseUsers = await axios.get(API_USERS);
                const emailExists = responseUsers.data.some(
                    (u) => u.email && u.email.toLowerCase() === email.toLowerCase()
                );
                
                if (emailExists) {
                    return alert('Este correo ya está registrado.');
                }
                
                // AXIOS POST: Crear nuevo usuario en MockAPI
                const newUser = { name, email, password };
                const response = await axios.post(API_USERS, newUser);
                
                // Guardamos el usuario devuelto por la API en local para mantener la sesión
                localStorage.setItem('currentUser', JSON.stringify(response.data)); 
                
                alert('¡Registro exitoso en la nube!');
                onAuthSuccess(response.data);

            } else {
                // CORRECCIÓN: Buscamos coincidencia exacta de Email Y Contraseña en JS
                const response = await axios.get(API_USERS);
                const foundUser = response.data.find(
                    (u) => u.email && u.email.toLowerCase() === email.toLowerCase() && u.password === password
                );

                if (foundUser) {
                    localStorage.setItem('currentUser', JSON.stringify(foundUser));
                    alert(`¡Bienvenido de nuevo, ${foundUser.name}!`);
                    onAuthSuccess(foundUser);
                } else {
                    alert('Correo o contraseña incorrectos.');
                }
            }
        } catch (error) {
            console.error("Error al conectar con la base de datos:", error);
            alert("Hubo un error de conexión con el servidor.");
        }
    };

    return (
        <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>{view === 'login' ? 'Iniciar Sesión' : 'Registrarse'}</h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {view === 'register' && (
                        <div className="grupo-input">
                            <label htmlFor="auth-name">Nombre completo</label>
                            <input 
                                id="auth-name"
                                type="text" 
                                placeholder="Ej: John Doe" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>
                    )}
                    
                    <div className="grupo-input">
                        <label htmlFor="auth-email">Correo electrónico</label>
                        <input 
                            id="auth-email"
                            type="email" 
                            placeholder="tucorreo@ejemplo.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="grupo-input">
                        <label htmlFor="auth-password">Contraseña</label>
                        <input 
                            id="auth-password"
                            type="password" 
                            placeholder="********" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>

                    <button type="submit" className="btn btn-submit">
                        {view === 'login' ? 'Ingresar' : 'Crear cuenta'}
                    </button>

                    <p className="toggle-text">
                        {view === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
                        <span onClick={() => setView(view === 'login' ? 'register' : 'login')}>
                            {view === 'login' ? 'Regístrate aquí' : 'Inicia sesión'}
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}