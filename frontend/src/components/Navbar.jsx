import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import { useState } from "react";
import '@styles/navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('usuario')) || null;
    const userRole = user?.rol;
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutSubmit = () => {
        try {
            logout();
            sessionStorage.removeItem('usuario'); // Asegúrate de limpiar el sessionStorage también
            navigate('/auth');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className={`nav-menu ${menuOpen ? 'activado' : ''}`}>
                <ul>
                    {/* Inicio visible para todos los usuarios */}
                    <li>
                        <NavLink
                            to="/home"
                            className={({ isActive }) => isActive ? 'active' : ''}
                            onClick={() => setMenuOpen(false)}
                        >
                            Inicio
                        </NavLink>
                    </li>

                    {/* Bloques exclusivos para el rol de administrador */}
                    {userRole === 'administrador' && (
                        <>
                            <li>
                                <NavLink
                                    to="/users"
                                    className={({ isActive }) => isActive ? 'active' : ''}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Usuarios
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/empleados"
                                    className={({ isActive }) => isActive ? 'active' : ''}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Empleados
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Menú visible para todos los usuarios y administradores */}
                    <li>
                        <NavLink
                            to="/menu"
                            className={({ isActive }) => isActive ? 'active' : ''}
                            onClick={() => setMenuOpen(false)}
                        >
                            Menú
                        </NavLink>
                    </li>

                    {/* Órdenes visible para todos los usuarios y administradores */}
                    <li>
                        <NavLink
                            to="/orders"
                            className={({ isActive }) => isActive ? 'active' : ''}
                            onClick={() => setMenuOpen(false)}
                        >
                            Órdenes
                        </NavLink>
                    </li>

                    {/* Inventario exclusivo para administradores */}
                    {userRole === 'administrador' && (
                        <li>
                            <NavLink 
                                to="/batches" 
                                onClick={() => setMenuOpen(false)} 
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                Inventario
                            </NavLink>
                        </li>
                    )}

                    {/* Cerrar sesión visible para todos los usuarios */}
                    <li>
                        <NavLink
                            to="/auth"
                            className={({ isActive }) => isActive ? 'active' : ''}
                            onClick={() => {
                                logoutSubmit();
                                setMenuOpen(false);
                            }}
                        >
                            Cerrar sesión
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Ícono de la hamburguesa */}
            <div className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;
