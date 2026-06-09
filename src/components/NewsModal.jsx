import { useState, useEffect } from 'react';

export default function NewsModal({ isOpen, onClose, onAdd, onUpdate, editData }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('');

    // Sincroniza los campos del formulario si se va a editar o crear
    useEffect(() => {
        if (editData) {
            setTitle(editData.title);
            setDesc(editData.desc);
            setImg(editData.img);
        } else {
            setTitle('');
            setDesc('');
            setImg('');
        }
    }, [editData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && desc && img) {
            if (editData) {
                // U - UPDATE: Envía los datos actualizados
                onUpdate({ title, desc, img });
            } else {
                // C - CREATE: Envía la nueva noticia
                onAdd({ title, desc, img });
            }
            handleClose();
        }
    };

    const handleClose = () => {
        setTitle('');
        setDesc('');
        setImg('');
        onClose();
    };

    return (
        <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
                <span className="close-btn" onClick={handleClose}>&times;</span>
                <h2>{editData ? 'Editar Noticia' : 'Agregar Nueva Noticia'}</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Título de la noticia" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required 
                    />
                    <input 
                        type="url" 
                        placeholder="URL de la imagen" 
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        required 
                    />
                    <textarea 
                        placeholder="Descripción corta" 
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required 
                        style={{
                            width: '100%', padding: '10px', backgroundColor: '#333', 
                            border: '1px solid #555', color: '#fff', borderRadius: '4px', 
                            fontSize: '14px', resize: 'vertical', minHeight: '80px', marginTop: '10px'
                        }}
                    />
                    <button type="submit" className="btn">
                        {editData ? 'Guardar Cambios' : 'Publicar Noticia'}
                    </button>
                </form>
            </div>
        </div>
    );
}