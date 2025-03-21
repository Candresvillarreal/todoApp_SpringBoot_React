import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { retrieveHelloWorldBean, retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

function WelcomeComponent() {

    const { username } = useParams();
    {/*console.log(username);
    console.log(params.username); */}

    const [message, setMessage] = useState(null);

    const authContext = useAuth();

    const navigate = useNavigate();

    function callHelloWorldApi() {
        console.log("called");
        //retrieveHelloWorldBean()
        //    .then( (response) => successfulResponse(response) )
        //    .catch( (error) => errorResponse(error) )
        //    .finally( () => console.log('cleanup'));
        
        retrieveHelloWorldPathVariable("Carlos", authContext.token)
            .then( (response) => successfulResponse(response) )
            .catch( (error) => errorResponse(error) )
            .finally( () => console.log('cleanup'));

        //axios.get("http://localhost:8080/hello-world")
        //    .then( (response) => successfulResponse(response) )
        //    .catch( (error) => errorResponse(error) )
        //    .finally( () => console.log('cleanup'));
        //axios.get("http://localhost:8080/hello-world-bean")
        //    .then( (response) => successfulResponse(response) )
        //   .catch( (error) => errorResponse(error) )
        //    .finally( () => console.log('cleanup'));
    }

    function successfulResponse(response) {
        console.log(response);
        //setMessage(response.data);
        setMessage(response.data.message);
    }

    function errorResponse(error) {
        console.log(error);
    }

    function reachMyTodos() {
        navigate(`/todos`);
    }

    return (
        <div className="Welcome">
            <h1>Bienvenido {username}</h1>
            <br/>
            <div>
                <p>¿Quieres gestionar tus tareas?</p>
                <button className="btn btn-success m-5" onClick={ () => reachMyTodos() }>Ver mis Tareas</button>
            </div>
        </div>
    )
}

export default WelcomeComponent;