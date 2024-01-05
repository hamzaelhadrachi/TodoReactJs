import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';


function LoginComponent(){

    const [username, setUsername] = useState('hamza');
    const [password, setPassword] = useState('hamza');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth()

    function handleUserNameChange (event) {
        setUsername(event.target.value);
    }
    function handlePasswordChange (event) {
        setPassword(event.target.value);
    }
    function handleSubmit(){
        if(authContext.login(username,password)){

            navigate(`welcome/${username}`)
            
        }else{
            
            setShowErrorMessage(true);
        }
    }

    return(
        <div className="Login">
            <div >
                {showErrorMessage && <div className="errorMessage">Access Denied</div>}           
            </div>

            <div className="LoginForm">
                <h1>Login !</h1>
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUserNameChange}></input>
                </div> 
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}></input>
                </div> 
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;

