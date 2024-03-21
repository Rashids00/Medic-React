import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Navbar";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    function registerUser() {
        const user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConf
        }
        axios.post('https://medicalstore.mashupstack.com/api/register', user)
            .then(response => {
                setErrorMessage('');
                alert('Successfully Registered');
                navigate('/Login');
            })
            .catch(error => {
                if (error.response.data.errors) {
                    setErrorMessage(Object.values(error.response.data.errors).join(' '));
                } else {
                    setErrorMessage('Failed to connect to API');
                }
            });
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-7 col-lg-4 col-md-5">
                        <div className="card mt-5">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Register</h2>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                <form>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirm Password"
                                            value={passwordConf}
                                            onChange={(event) => setPasswordConf(event.target.value)}
                                        />
                                    </div>
                                    <div className="d-grid">
                                        <button type="button" className="btn btn-primary" onClick={registerUser}>Submit</button>
                                    </div>
                                </form>
                                <p className="mt-3 text-center">Already have an account? <Link to="/Login">Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
