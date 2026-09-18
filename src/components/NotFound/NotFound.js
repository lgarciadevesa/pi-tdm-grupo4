import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <section className="not-found">
            <h2>404 - Página no encontrada</h2>
            <p>El contenido que estás buscando no existe o ha sido movido.</p>
            <Link to="/">Volver al inicio</Link>
        </section>
    );
}

export default NotFound;