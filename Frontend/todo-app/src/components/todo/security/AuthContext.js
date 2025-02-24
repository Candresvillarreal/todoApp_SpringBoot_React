import { createContext, useContext, useState } from 'react';
import { executeBasicAuthenticationService } from '../api/HelloWorldApiService';
import { apiClient } from '../api/ApiClient';

//Creación del contexto

export const AuthContext = createContext();

//Creación de un hook que permite acceder a la información del contexto

export const useAuth = () => useContext(AuthContext);

//Creación del provider que permite compartir la información del contexto con otros componentes

export default function AuthProvider( { children}) {

    const [isAuthenticated, setAuthenticated] = useState(false);

    const [username, setUsername] = useState(null);

    const [token, setToken] = useState(null);

    /*function login(username, password) {
        if(username === 'Carlos' && password === 'dummy') {
            setAuthenticated(true);
            setUsername(username);
            return true;
        } else {
            setAuthenticated(false);
            setUsername(null);
            return false
        }
    }*/

    async function login(username, password) {

        const basicAuthToken = 'Basic ' + window.btoa( username + ":" + password );

        try{

            const response = await executeBasicAuthenticationService(basicAuthToken)
            
            if(response.status == 200) {
                setAuthenticated(true);
                setUsername(username);
                setToken(basicAuthToken);   
                //Añadir el token a todas las peticiones 
                apiClient.interceptors.request.use( config => {
                    console.log("Intecepting and adding a token");
                    config.headers.Authorization = basicAuthToken;
                    return config;
                });
                return true
            } else {
                //En lugar de setAthenticated(false), setUsername(null) y setToken(null) se puede llmar a logout() que ejecuta las tres instrucciones
                setAuthenticated(false);
                setUsername(null);
                setToken(null);
                return false
            }

        } catch(error) {
            //En lugar de setAthenticated(false), setUsername(null) y setToken(null) se puede llmar a logout() que ejecuta las tres instrucciones
            setAuthenticated(false);
            setUsername(null);
            setToken(null);
            return false
        }
        
    }

    function logout() {
        setAuthenticated(false);
        setToken(null);
        setUsername(null);
    }

    return (
        <AuthContext.Provider value = { { isAuthenticated, login, logout, username, token }}>
            { children}
        </AuthContext.Provider>
    )
}