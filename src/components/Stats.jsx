import { useEffect, useRef, useState } from 'react';

export default function Stats() {
    const statsRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    
    // Estados para los contadores
    const [precio, setPrecio] = useState(0);
    const [bugs, setBugs] = useState(0);
    const [vacas, setVacas] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                animateCounter(80, setPrecio);
                animateCounter(15000, setBugs);
                animateCounter(15, setVacas);
                setHasAnimated(true);
            }
        }, { threshold: 0.5 });

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) observer.unobserve(statsRef.current);
        };
    }, [hasAnimated]);

    const animateCounter = (target, setter) => {
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += increment;
            if (current < target) {
                setter(Math.ceil(current));
                requestAnimationFrame(update);
            } else {
                setter(target);
            }
        };
        update();
    };

    return (
        <section className="stats" id="stats-section" ref={statsRef}>
            <div className="stat-item">
                <div className="stat-number">{precio}€</div>
                <div className="stat-label">Precio Edición Estándar</div>
            </div>
            <div className="stat-item">
                <div className="stat-number">{bugs}+</div>
                <div className="stat-label">Bugs del Día 1</div>
            </div>
            <div className="stat-item">
                <div className="stat-number">{vacas}</div>
                <div className="stat-label">Cuantas Vacas Tengo</div>
            </div>
        </section>
    );
}