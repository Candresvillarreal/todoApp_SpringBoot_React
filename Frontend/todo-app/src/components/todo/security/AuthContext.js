import { createContext, useContext, useState } from 'react';

//Creación del contexto

export const AuthContext = createContext();

//Creación de un hook que permite acceder a la información del contexto

export const useAuth = () => useContext(AuthContext);

//Creación del provider que permite compartir la información del contexto con otros componentes

export default function AuthProvider( { children}) {

    const [isAuthenticated, setAuthenticated] = useState(false);

    const [username, setUsername] = useState(null);

    function login(username, password) {
        if(username === 'Carlos' && password === 'dummy') {
            setAuthenticated(true);
            setUsername(username);
            return true;
        } else {
            setAuthenticated(false);
            setUsername(null);
            return false
        }
    }

    function logout() {
        setAuthenticated(false);
    }

    return (
        <AuthContext.Provider value = { { isAuthenticated, login, logout, username }}>
            { children}
        </AuthContext.Provider>
    )
}