import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import ListTodosComponent from './ListTodosComponent';
import LoginComponent from './LoginComponent';
import LogOutComponent from './LogoutComponent';
import './TodoApp.css';
import WelcomeComponent from './WelcomeComponent';
import AuthProvider, { useAuth } from './security/AuthContext';
import { useState } from 'react';
import TodoComponent from './TodoComponent';

function AuthenticatedRoute({children}){
    const authContext = useAuth();
    if(authContext.isAuthenticated){
            return(
                children
            )
    }else{
        return <Navigate to='/' />
    }
}

function TodoApp() {
    const [loginUser, setLoginUser] = useState("")

    const handleGetUser = (data) => {
        setLoginUser(data);
      };
    return(
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent parentUser = {loginUser}/>
                    <Routes>
                        <Route path='/' element={<LoginComponent onSendData={handleGetUser}/>}></Route>
                        <Route path='/login' element={<LoginComponent onSendData={handleGetUser}/>}></Route>
                        <Route path='/welcome/:username' 
                            element={
                                <AuthenticatedRoute>
                                    <WelcomeComponent />
                                </AuthenticatedRoute>
                                }>
                        </Route>
                        <Route path='*' element={<ErrorComponent />}></Route>
                        <Route path='/todos' 
                            element={
                                <AuthenticatedRoute>
                                    <ListTodosComponent />
                                </AuthenticatedRoute>
                            }>
                        </Route>
                        <Route path='/todo/:id' 
                            element={
                                <AuthenticatedRoute>
                                    <TodoComponent />
                                </AuthenticatedRoute>
                            }>
                        </Route>
                        <Route path='/logout' element={<AuthenticatedRoute><LogOutComponent/></AuthenticatedRoute>}></Route>
                    </Routes>
                    <FooterComponent/>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )

}

export default TodoApp;