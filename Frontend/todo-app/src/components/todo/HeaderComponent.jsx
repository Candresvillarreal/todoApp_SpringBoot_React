import { Link } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

function HeaderComponent() {

    //const authContext = useContext(AuthContext);
    const authContext = useAuth();
    const isAuthenticated = authContext.isAuthenticated;

    function logout() {
        authContext.logout();
    }

    //console.log(authContext.number);
    console.log(authContext);

    return (
        <header className="border-bottom border-dark border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                            <a className="navbar-brand ms-2 fs-2 fw-bold text-black">Todo App</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    {isAuthenticated && <Link className="nav-link" to="/welcome/Carlos">Inicio</Link>}
                                </li>
                                <li className="nav-item">
                                    {isAuthenticated && <Link className="nav-link" to="/todos">Mis tareas</Link>}
                                </li>
                            </ul>
                        </div>
                            <ul className="navbar-nav">
                                {!isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/login">Acceder</Link></li>}
                                {isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/logout" onClick={ logout }>Desconectar</Link></li>}
                            </ul>
                        <hr/>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default HeaderComponent;