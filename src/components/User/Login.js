import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../Store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import checkGuest from "./checkGuest";
import Navbar from "../Navbar";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function attemptLogin() {
        axios.post('https://medicalstore.mashupstack.com/api/login', {
            email: email,
            password: password
        }).then(response => {
            setErrorMessage('');
            const user = {
                email: email,
                token: response.data.token
            }
            dispatch(setUser(user));
            navigate("/");
        }).catch(error => {
            if (error.response.data.errors) { 
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            } else if (error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Failed to login user. Please contact admin');
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
                                <h2 className="card-title text-center mb-4">Login</h2>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                <form>
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
                                    <div className="d-grid">
                                        <button type="button" className="btn btn-primary" onClick={attemptLogin}>Login</button>
                                    </div>
                                </form>
                                <p className="mt-3 text-center">Don't have an account? <Link to="/Register">Register</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkGuest(Login);
