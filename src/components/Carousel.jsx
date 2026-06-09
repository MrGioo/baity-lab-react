import { useState, useEffect } from 'react';

export default function Carousel({ slides, onStartEdit, onDelete }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!slides || slides.length === 0) return;

        // Si se elimina el último elemento, ajustamos el índice para evitar errores
        if (activeIndex >= slides.length) {
            setActiveIndex(slides.length - 1);
        }

        const intervalId = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [slides, activeIndex]);

    // R - READ: Si vacías el CRUD, muestra un estado elegante sin romper el diseño
    if (!slides || slides.length === 0) {
        return (
            <section className="carousel-container" id="noticias" style={{ padding: '4rem 2rem', textAlignment: 'center' }}>
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', width: '100%' }}>
                    <h3>No hay noticias en el vertedero</h3>
                    <p style={{ marginTop: '10px' }}>Usa el botón superior para agregar una nueva noticia.</p>
                </div>
            </section>
        );
    }

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="carousel-container" id="noticias">
            <div className="carousel-slide">
                {slides.map((slide, index) => (
                    <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                        <img src={slide.img} alt={slide.title} />
                        
                        {/* Controles CRUD para la noticia en pantalla */}
                        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 30, display: 'flex', gap: '10px' }}>
                            <button 
                                onClick={() => onStartEdit(index)} 
                                className="btn" 
                                style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#f39c12', color: '#fff', margin: 0 }}
                            >
                                Editar
                            </button>
                            <button 
                                onClick={() => onDelete(index)} 
                                className="btn" 
                                style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#e74c3c', color: '#fff', margin: 0 }}
                            >
                                Eliminar
                            </button>
                        </div>

                        <div className="carousel-caption">
                            <h3>{slide.title}</h3>
                            <p>{slide.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-prev" onClick={prevSlide}>&#10094;</button>
            <button className="carousel-next" onClick={nextSlide}>&#10095;</button>
            <div className="carousel-indicators">
                {slides.map((_, index) => (
                    <button 
                        key={index}
                        className={`dot ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    ></button>
                ))}
            </div>
        </section>
    );
}