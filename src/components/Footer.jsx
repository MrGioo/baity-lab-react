export default function Footer() {
    const triggerEasterEgg = () => {
        document.body.classList.add('efecto-teletransporte');
        setTimeout(() => {
            window.open('https://youtu.be/bi6Q_lzaIow?si=ZsdpVNqZ3gk0J8bK', '_blank');
            document.body.classList.remove('efecto-teletransporte');
        }, 1500);
    };

    return (
        <footer className="footer-bottom">
            <p>Matias Tello - Victor Vasquez - Programacion Front End - C2</p>
            <p>© 2026 Baity Lab - "It Just Works". 
                <button 
                    id="ojos-secretos" 
                    title="¿Buscas el DLC?" 
                    onClick={triggerEasterEgg}
                >
                    👀
                </button>
            </p>
        </footer>
    );
}