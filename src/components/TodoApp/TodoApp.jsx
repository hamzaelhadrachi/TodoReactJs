import './TodoApp.css';
import { BrowserRouter,Routes, Route, Navigate} from 'react-router-dom';
import LogOutComponent from './LogoutComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import ListTodosComponent from './ListTodosComponent';
import ErrorComponent from './ErrorComponent';
import LoginComponent from './LoginComponent';
import WelcomeComponent from './WelcomeComponent';
import AuthProvider, { useAuth } from './security/AuthContext';

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

    return(
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path='/' element={<LoginComponent />}></Route>
                        <Route path='/login' element={<LoginComponent />}></Route>
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
                        <Route path='/logout' element={<AuthenticatedRoute><LogOutComponent/></AuthenticatedRoute>}></Route>
                    </Routes>
                    <FooterComponent/>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )

}

export default TodoApp;