import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./security/AuthContext";
import { useState } from "react";
import { retrieveTodoForUser, updateTodoForUser,createTodoForUser } from "./api/TodoApiService";
import { Formik, Form, Field, ErrorMessage} from "formik";
import { useNavigate } from "react-router-dom";

export default function TodoComponent() {

    const { id } = useParams();
    const AuthContext = useAuth();
    const username = AuthContext.userName;
    const [description, setDescription] = useState([]);
    const [targetDate, setTargetDate] = useState('');
    const navigate = useNavigate();

    useEffect(
        () => {
            if (id !== -1) {
                retrieveTodos(id);
            }
        }, [id]
    )

    function retrieveTodos(id) {
        console.log('retrieve todo with id: ' + id);
        if (id != -1) {
            retrieveTodoForUser(username, id)
            .then(
               response => {
                setDescription(response.data.description);
                setTargetDate(response.data.targetDate);
               }
            ).catch(
                error => {
                    console.log(error);
                }
            )
        }else {
            createTodoForUser(username, id).then(
                response => {
                    navigate('/todos');
                }
            ).catch(
                error => {
                    console.log(error);
                }
            )
        }

    }

    function onSubmit(values) {
        console.log(values);
        let todo = {
            id: id,
            userName: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        updateTodoForUser(username, id, todo).then(
            response => {
                // Redirect to the ListTodosComponent
                navigate('/todos');
            }
        ).catch(
            error => {
                console.log(error);
            }
        )
        console.log(todo);
    }
    function validate(values) {
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }
        if (values.description.length < 5) {
            errors.description = 'Enter a valid description';
        }
        console.log(values);
        return errors;
    }
    return (
        <div className="TodoComponentContainer">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{ description, targetDate }} 
                enableReinitialize={true} 
                onSubmit={onSubmit} 
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
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
    );
}