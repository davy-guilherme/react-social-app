import { Link, useNavigate } from "react-router-dom";
import "./login.scss"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })

    const [err, setError] = useState(null);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const {login} = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(inputs);
            navigate("/")
        } catch (e) {
            // setErr(e.message)
            setErr(e.response.data)
            console.log(err)
        }
        
    }

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
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        {err && (err)}
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Login;