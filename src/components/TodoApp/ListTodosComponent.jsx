import { useEffect, useState } from "react";
import { retrieveAllTodosForUser } from "./api/TodoApiService";
import { deleteTodoForUser } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

function ListTodosComponent(){

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);
    const AuthContext = useAuth();
    const username = AuthContext.userName;
    const navigate = useNavigate();

    const refreshTodos = useCallback(() => {
        retrieveAllTodosForUser(username)
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [username]);

    useEffect(() => {
        refreshTodos();
    }, [refreshTodos]);


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
    function addNewTodo(){
        navigate(`/todo/-1`);
    }
    return(
        <div className="container">
            <h1>Things you'd like to do !</h1>
            {message && <div className="alert alert-success">{message}</div>}
            <div className="btn btn-success" onClick={addNewTodo}>
                Add new Todo
            </div>
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
                                    <td>
                                        <button className="btn btn-warning md-5" onClick={() => deleteTodo(todo.id)}>Delete</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-success md-5" onClick={() => updateTodo(todo.id)}>Update</button>
                                    </td>
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