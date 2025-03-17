import { useNavigate, useParams } from 'react-router-dom'
import { createTodoAPI, retrieveTodoAPI, updateTodoAPI } from './api/TodoApiService';
import { useAuth } from './security/AuthContext';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import moment from 'moment';

export function TodoComponent() {

    const {id} = useParams();

    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [done, setDone] = useState('');

    const authContext = useAuth();
    const navigate = useNavigate();
    const username = authContext.username;

    useEffect(() => retrieveTodos(), [id]);

    function retrieveTodos() {
        if(id != -1) {
            retrieveTodoAPI(username, id)
            //console.log(response)
            .then(response => {
                setDescription(response.data.description)
                setDone(response.data.done)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error));
        }
    }

    function onSubmit(values) {
        console.log(values);
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: values.done
        }
        console.log(todo);
        if(id==-1) {
            createTodoAPI(username, todo)
            .then(response => {
                navigate('/todos');
            })
            .catch(error => console.log(error));
        } else {
            updateTodoAPI(username, id, todo)
            .then(response => {
                //console.log(response);
                navigate('/todos');
            })
            .catch(error => console.log(error));
        }
    }

    function validate(values) {
        let errors = {
            //description: "Introduce una descripción",
            //targetDate: "Introduce una fecha válida"
        }
        if(values.description.length < 5) {
            errors.description = "Introduce al menos 5 caracteres";
        }

        if(values.targetDate == null || values.targetDate == "" || !moment(values.targerDate).isValid()) {
            errors.targetDate = "Introduce una fecha válida";
        }
        
        console.log(values);
        return errors;
    }

    return(
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '33%' }}>
                <h1>Introduce los detalles</h1>
                <div>
                    <Formik initialValues= { {description, targetDate} }
                        enableReinitialize={true}
                        onSubmit = { onSubmit } 
                        validate= { validate }
                        validateOnChange= { false }                     //La validación sólo se hace al pulsar el botón de submit
                        validateOnBlur= { false }
                    >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <ErrorMessage
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label><strong>Descripción</strong></label>
                                    <Field className="form-control" name="description"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label><strong>¿Completado?</strong></label>
                                    <Field as="select" className="form-control" name="done">
                                        <option value="NO">NO</option>
                                        <option value="SI">SI</option>
                                    </Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label><strong>Fecha Prevista</strong></label>
                                    <Field name="targetDate">
                                        {({ field }) => (
                                            <input
                                                type="date"
                                                {...field}
                                                className="form-control"
                                            />
                                        )}
                                    </Field>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                    </Formik>
                </div>
            </div>
        </div>
    )
}