import { useState } from 'react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        { q: "¿Tiene el juego lootboxes?", a: "No las llamamos lootboxes, las llamamos 'mecánicas de sorpresa ética' y cuestan 2,50€ la tirada." },
        { q: "¿Cuándo sale el parche de rendimiento?", a: "Cuando el becario aprenda a optimizar el código espagueti que heredó de 2004." },
        { q: "¿Puedo pedir reembolso?", a: "Claro, pero nuestro sistema de tickets casualmente estará 'en mantenimiento' durante los próximos 10 años." }
    ];

    return (
        <section className="faq-section" id="faq">
            <h2>Preguntas (No) Frecuentes</h2>
            {faqs.map((faq, index) => (
                <div key={index} className={`faq-item ${openIndex === index ? 'active' : ''}`}>
                    <button className="faq-btn" onClick={() => toggleFAQ(index)}>
                        {faq.q} <span>+</span>
                    </button>
                    <div className="faq-answer">
                        <p>{faq.a}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}