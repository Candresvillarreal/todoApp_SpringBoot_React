import { useEffect, useState } from 'react';
import { deleteTodoAPI, retrieveAllTodosForUsernameAPI } from './api/TodoApiService';
import { useAuth } from './security/AuthContext';
import { useNavigate } from 'react-router-dom';

function ListTodosComponent() {

    const today = new Date();
    const targetDate = new Date(today.getFullYear(), today.getMonth(), today.getDay());

    const authContext = useAuth();

    const username = authContext.username;

    const navigate = useNavigate();

    const [todos, setTodos] = useState( [] );

    const [message, setMessage] = useState( null );

    {/*
    const todos = [
                    {id: 1, description: 'Terminar el proyecto fin de Grado', done: false, targetDate: targetDate},
                    {id: 2, description: 'Terminar las prácticas en empresa', done: false, targetDate: targetDate},
                    {id: 3, description: 'Encontrar trabajo como Desarrollador Web', done: false, targetDate: targetDate},
                    {id: 4, description: 'Mejorar mi nivel de inglés', done: false, targetDate: targetDate},
                    {id: 5, description: 'Aprender Python', done: false, targetDate: targetDate},
                ];
    */}

    useEffect ( () => refreshTodos(), [] );

    //devolver todos los TODOS para un usuario

    function refreshTodos() {
        retrieveAllTodosForUsernameAPI(username)
        .then(response => {
            console.log(response.data)
            setTodos(response.data)
        })
        .catch(error => console.log(error));
    }

    function deleteTodo(id) {
        console.log('Delete todo' + id)
        deleteTodoAPI(username, id)
        .then(() => {
            setMessage(`El todo con id = ${id} ha sido eliminado con éxito`);
            refreshTodos()
        })
        .catch(error => console.log(error));
    }

    function updateTodo(id) {
        console.log('Update todo' + id)
        navigate(`/todo/${id}`);
    }

    function addNewTodo(){
        navigate(`/todo/-1`);
    }

    return (
        <div className="contaier">
            <h1>TODO List</h1>
            <div>
                Aquí tiene tu lista de cosas que quieres (o debes) hacer
            </div>
            <br/>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>¿Completado?</th>
                            <th>Fecha Prevista</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done}</td>
                                    {/* <td>{todo.targetDate.toDateString()}</td> */}
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                </tr>
                            )
                        )
                    }                      
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Añadir Todo</div>
        </div>
    )
}

export default ListTodosComponent;