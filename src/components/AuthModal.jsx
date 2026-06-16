import { useState, useEffect } from 'react';

export default function AuthModal({ isOpen, onClose, initialView, onAuthSuccess }) {
    const [view, setView] = useState(initialView);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setView(initialView);
        // Limpiar campos al abrir
        setName('');
        setEmail('');
        setPassword('');
    }, [initialView, isOpen]);

    if (!isOpen) return null;

const handleSubmit = (e) => {
        e.preventDefault();
        
        // Obtener usuarios existentes o iniciar un arreglo vacío
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (view === 'register') {
            // La expresión regular verifica que exista al menos una letra (incluyendo acentos y ñ)
            const hasLetters = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(name);
            if (!hasLetters || name.trim().length < 3) {
                alert('El nombre es inválido. Debe contener letras y tener al menos 3 caracteres.');
                return; // Detiene la ejecución
            }

            // 2. Validar Correo: Debe tener un formato de email válido (ej: texto@texto.com)
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl|net|org|edu|gov|io)$/i;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un correo electrónico válido con un dominio real (ej: .com, .cl, .net).');
                return;
            }

            // 3. Validar Contraseña: No puede ser 1 solo dígito, exigiremos mínimo 6 caracteres
            if (password.length < 6) {
                alert('La contraseña es muy débil. Debe tener al menos 6 caracteres.');
                return;
            }

            // Verificar si el correo ya existe
            const userExists = users.find(u => u.email === email);
            if (userExists) {
                alert('Este correo ya está registrado.');
                return;
            }
            
            // Si pasa todas las validaciones, guardar nuevo usuario
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser)); 
            
            alert('¡Registro exitoso!');
            onAuthSuccess(newUser);
        } else {
            // Lógica de Login
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert(`¡Bienvenido de nuevo, ${user.name}!`);
                onAuthSuccess(user);
            } else {
                alert('Correo o contraseña incorrectos.');
            }
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