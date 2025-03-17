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
        <div className="Login d-flex justify-content-center">
            <div style={{ width: '33%' }}>
                <h1>Introduce tus datos:</h1>
                <br/>
                <br/>
                {showErrorMessage && <div className="errorMessage">Los datos introducidos no son correctos</div>}
                <br/>
                <div className="LoginForm">
                    <div className="mb-4 d-flex align-items-center">
                        {/* <label className="fw-bold me-4">Usuario:</label>
                        <input type="text" className="form-control" style={{ borderWidth: "2px", borderColor: "black" }} name="username" value={username} onChange={handleUserNameChange}/> */}
                        <div class="input-group-prepend">
                            <span className="input-group-text fw-bold text-white" style={{ borderWith: "1px", borderColor: "black", backgroundColor: "rgb(13, 110, 253)" }} id="user">Usuario</span>
                        </div>
                        <input type="text" className="form-control" style={{ borderWith: "1px", borderColor: "black" }} placeholder="Usuario" aria-label="Usaurio" aria-describedby="user" value={username} onChange={handleUserNameChange} />
                    </div>
                    <div className="mb-4 d-flex align-items-center">
                        {/* <label className="fw-bold me-2">Contraseña:</label>
                        <input type="password" className="form-control" style={{ borderWidth: "2px", borderColor: "black" }}  name="password" value={password} onChange={handlePasswordChange}/> */}
                        <input type="password" className="form-control" style={{ borderWidth: "1px", borderColor: "black" }}  placeholder="Introduce tu contraseña" aria-label="Usuario" aria-describedby="password" value={password} onChange={handlePasswordChange}/>
                        <div class="input-group-append">
                            <span className="input-group-text fw-bold text-white" style={{ borderWith: "1px", borderColor: "black", backgroundColor: "rgb(13, 110, 253)" }} id="password">Password</span>
                        </div>
                    </div>
                    <div className="d-grid gap-2 col-12 mx-auto">
                        <button type="button" className="btn btn-primary btn-lg fw-bold" name="login" onClick={handleLoginSubmit}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;