import { Link } from "react-router-dom";
import "./login.scss"

const Login = () => {
    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Hello World.</h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex doloribus suscipit sunt magni vero aliquam, aliquid voluptas sed, earum eius exercitationem mollitia, dolore magnam neque minus totam. Voluptatum, ut vero.
                    </p>
                    <span>Don`t you have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />

                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Login;