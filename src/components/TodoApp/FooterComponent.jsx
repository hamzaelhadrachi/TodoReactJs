import { useAuth } from "./security/AuthContext";

function FooterComponent(){
    const authContext = useAuth()

    return(
        <footer className="footer">
            <div className="container">
                Your Footer
            </div>
        </footer>
    )
}
 
export default FooterComponent;