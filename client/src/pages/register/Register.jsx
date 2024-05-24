import { Link } from "react-router-dom";
import "./register.scss"
import { useState } from "react"
import axios from 'axios'

const Register = () => {

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
    })

    const [err, setErr] = useState(null)

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value})) // ??
    }

    const handleClick = async (e) => {
        e.preventDefault()

        try {
            await axios.post("http://localhost:8800/api/auth/register", inputs)
        } catch (e) {
            // setErr(e.message)
            setErr(e.response.data)
            console.log(err)
        }

    }

    console.log(inputs)

    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Lama Social.</h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex doloribus suscipit sunt magni vero aliquam, aliquid voluptas sed, earum eius exercitationem mollitia, dolore magnam neque minus totam. Voluptatum, ut vero.
                    </p>
                    <span>Don`t you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        <input type="text" placeholder="Name" name="name" onChange={handleChange} />
                        {err && (err)}
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Register;