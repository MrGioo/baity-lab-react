import { useState } from 'react';

export default function Carousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    const slides = [
        {
            img: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/07/bethesda-game-studios-1.jpg",
            title: '"It Just Works"',
            desc: "Bethesda lo ha vuelto a hacer: Skyrim para tu tostadora inteligente."
        },
        {
            img: "https://i.ytimg.com/vi/GlfuH8Q6WkE/maxresdefault.jpg",
            title: "Indie Pretencioso Starter Pack",
            desc: "Gráficos de GameBoy y mucha depresión. GOTY instantáneo."
        },
        {
            img: "https://logos-world.net/wp-content/uploads/2022/05/Activision-Symbol.png",
            title: "Crunch Time",
            desc: "¿Dormir? Eso no está en el roadmap de la empresa."
        }
    ];

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="carousel-container" id="noticias">
            <div className="carousel-slide">
                {slides.map((slide, index) => (
                    <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                        <img src={slide.img} alt={slide.title} />
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