import { useState } from 'react';

export default function ContactModal({ isOpen, onClose, user }) {
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const existingMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        
        const newContactEntry = {
            id: Date.now(),
            name: user.name,
            email: user.email,
            message: message,
            date: new Date().toLocaleString()
        };

        existingMessages.push(newContactEntry);
        localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
        
        alert('¡Mensaje enviado con éxito! Lo hemos guardado en localStorage.');
        setMessage('');
        onClose();
    };

    return (
        <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-content" style={{ width: '400px' }}>
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>Formulario de Contacto</h2>
                <p className="form-desc" style={{ marginBottom: '15px', color: '#aaa' }}>
                    Envíanos tus quejas o reportes de bugs (probablemente los ignoremos).
                </p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="grupo-input">
                        <label htmlFor="contact-name">Nombre</label>
                        <input 
                            id="contact-name" 
                            type="text" 
                            value={user?.name || ''} 
                            disabled 
                            style={{ backgroundColor: '#222', color: '#888' }}
                        />
                    </div>

                    <div className="grupo-input">
                        <label htmlFor="contact-email">Correo</label>
                        <input 
                            id="contact-email" 
                            type="email" 
                            value={user?.email || ''} 
                            disabled 
                            style={{ backgroundColor: '#222', color: '#888' }}
                        />
                    </div>

                    <div className="grupo-input">
                        <label htmlFor="contact-message">Mensaje</label>
                        <textarea 
                            id="contact-message" 
                            rows="4"
                            placeholder="Describe tu problema aquí..." 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required 
                        />
                    </div>

                    <button type="submit" className="btn btn-submit">Enviar Mensaje</button>
                </form>
            </div>
        </div>
    );
}