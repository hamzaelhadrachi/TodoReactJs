import { useEffect, useState } from "react";
import { retrieveAllTodosForUser } from "./api/TodoApiService";
import { deleteTodoForUser } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent(){

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);
    const AuthContext = useAuth();
    const username = AuthContext.userName;
    const navigate = useNavigate();

    useEffect(
        () => refreshTodos(), []
    )

    function refreshTodos(){
        retrieveAllTodosForUser(username)
        .then(
            response => {
                setTodos(response.data);
            }
        ).catch(
            error => {
                console.log(error);
            }
        )
    }

    function deleteTodo(id){
        console.log('delete todo with id: ' + id);
        // Call the API to delete the todo
        deleteTodoForUser(username, id)
        .then(
            () => {
                // Refresh the todos after deletion
                setMessage(`Delete of Todo ${id} Successful`);
                refreshTodos();
                // Clear the message after 5 seconds
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
                }

        ).catch(
            error => {
                console.log(error);
            }
        )
    }
    function updateTodo(id){
        console.log('updating todo with id: ' + id);
        // Redirect to the TodoComponent with the id
        navigate(`/todo/${id}`);

        // Call the API to delete the todo
    }
    return(
        <div className="container">
            <h1>Things you'd like to do !</h1>
            {message && <div className="alert alert-success">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th><strong>DESCRIPTION</strong></th>
                            <th><strong>DONE</strong></th>
                            <th><strong>TARGETDATE</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <button className="btn btn-warning md-5" onClick={() => deleteTodo(todo.id)}>Delete</button>
                                    <button className="btn btn-success md-5" onClick={() => updateTodo(todo.id)}>Update</button>
                                </tr>  
                            )
                        )
                    }
                    </tbody>
                </table>
            </div> 
        </div>
    )
}

export default ListTodosComponent;