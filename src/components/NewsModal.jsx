import { useState, useEffect } from 'react';

export default function NewsModal({ isOpen, onClose, onAdd, onUpdate, editData }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('');
    // Nuevo estado para controlar si usamos URL o Archivo
    const [imgMode, setImgMode] = useState('url'); 

    // Sincroniza los campos del formulario si se va a editar o crear
    useEffect(() => {
        if (editData) {
            setTitle(editData.title);
            setDesc(editData.desc);
            setImg(editData.img);
            // Si la imagen guardada es un archivo local (Base64), cambiamos el modo automáticamente
            setImgMode(editData.img.startsWith('data:image') ? 'file' : 'url');
        } else {
            setTitle('');
            setDesc('');
            setImg('');
            setImgMode('url');
        }
    }, [editData, isOpen]);

    if (!isOpen) return null;

    // Función para manejar la subida del archivo local
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(reader.result); // Guarda la imagen convertida a texto (Base64)
            };
            reader.readAsDataURL(file);
        }
    };

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
        setImgMode('url');
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
                    
                    {/* Selector para elegir el modo de imagen */}
                    <select 
                        value={imgMode} 
                        onChange={(e) => {
                            setImgMode(e.target.value);
                            setImg(''); // Limpiamos la imagen al cambiar de modo
                        }}
                        style={{ 
                            padding: '10px', backgroundColor: '#333', color: '#fff', 
                            border: '1px solid #555', borderRadius: '4px', fontSize: '14px' 
                        }}
                    >
                        <option value="url">Enlace URL</option>
                        <option value="file">Subir Archivo Local</option>
                    </select>

                    {/* Mostrar Input URL o Input File dependiendo de lo que eligió el usuario */}
                    {imgMode === 'url' ? (
                        <input 
                            type="url" 
                            placeholder="URL de la imagen" 
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                            required 
                        />
                    ) : (
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange}
                            required={!img} // Obligatorio solo si aún no ha subido nada
                            style={{ 
                                padding: '10px', backgroundColor: '#141414', 
                                border: '1px solid #555', color: '#fff', borderRadius: '4px' 
                            }}
                        />
                    )}

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
