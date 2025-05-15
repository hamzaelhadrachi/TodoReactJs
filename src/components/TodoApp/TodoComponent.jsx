import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./security/AuthContext";
import { useState } from "react";
import { retrieveTodoForUser } from "./api/TodoApiService";

export default function TodoComponent() {

    const { id } = useParams();
    const AuthContext = useAuth();
    const username = AuthContext.userName;
    const [description, setDescription] = useState([]);

    useEffect(
        () => {
            if (id !== -1) {
                retrieveTodos(id);
            }
        }, [id]
    )

    function retrieveTodos(id) {
        console.log('retrieve todo with id: ' + id);
        
        retrieveTodoForUser(username, id)
        .then(
           response => {
            setDescription(response.data.description);
           }
        ).catch(
            error => {
                console.log(error);
            }
        )
    }

    return (
        <div className="TodoComponentContainer">
            <h1>Enter Todo Details</h1>
            <div>
                Description: {description}
            </div>
        </div>
    );
}