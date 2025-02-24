import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

function LoginComponent() {

    const [username, setUserName] = useState("Carlos");
    const [password, setPassword] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();

    function handleUserNameChange(event) {
        {/* console.log(event);
        console.log(event.target.value); */}
        setUserName(event.target.value);
    }

    function handlePasswordChange(event) {
        console.log(event.target.value);
        setPassword(event.target.value);
    }

    async function handleLoginSubmit() {
        if(await authContext.login(username, password)) {
            navigate(`/welcome/${username}`);
        } else {
            setShowErrorMessage(true);
        }
    }

    return (
        <div className="Login">
            <h1>Login</h1>
            <br/>
            {showErrorMessage && <div className="errorMessage">Los datos introducidos no son correctos</div>}
            <br/>
            <div className="LoginForm">
                <div>
                    <label>Usuario:</label>
                    <input type="text" name="username" value={username} onChange={handleUserNameChange}/>
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleLoginSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;