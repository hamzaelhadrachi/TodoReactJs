import { apiClient } from "../api/ApiClient";
import { executeBasicAuthenticationService } from "../api/TodoApiService";

const { createContext, useState, useContext } = require("react");

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext);


export default function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [userName, setUserName] = useState(null)
    const [token, setToken] = useState(null)

    async function login(userName, password){
        const baToken = 'Basic ' + window.btoa(userName + ':' + password); 
        console.log(baToken)

        try {
            const response = await executeBasicAuthenticationService(baToken);
            if(response.status === 200){
                setAuthenticated(true)
                setUserName(userName)
                setToken(baToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = baToken
                        return config;
                    }
                )

                return true;
             
            }else{
                logout()
                return false;
            }
        } catch (error) {
            logout()
            return false;
        }

    }

    // async function login(userName, password){
    //     try {
    //         const response = await executeJwtAuthenticationService(userName, password);
    //         if(response.status === 200){
    //             const jwtToken = 'Bearer ' + response.data.token;

    //             setAuthenticated(true)
    //             setUserName(userName)
    //             setToken(jwtToken)

    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     config.headers.Authorization = jwtToken
    //                     return config;
    //                 }
    //             )

    //             return true;
                
    //         }else{
    //             logout()
    //             return false;
    //         }
    //     } catch (error) {
    //         logout()
    //         return false;
    //     }

    // }

    function logout(){
        setAuthenticated(false)
        setUserName(null)
        setToken(null)
    }

    return(
        <AuthContext.Provider value={ { isAuthenticated, login, logout,userName, token } }>
            {children}
        </AuthContext.Provider>
    )
}