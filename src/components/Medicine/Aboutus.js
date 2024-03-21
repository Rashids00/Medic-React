import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from '../Navbar';

function Aboutus() {
    const user = useSelector(store => store.auth.user);
    return (
        <div>
            <Navbar />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-sm-10 col-md-9 col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title text-center mb-4">Welcome to Medic</h1>
                                <p className="card-text text-center">
                                    We prioritize accessibility and affordability, ensuring that essential medications and healthcare products are readily available to all. Our convenient location, flexible hours, and efficient service aim to make your shopping experience as seamless as possible.
                                </p>
                                <div className="text-center mt-4">
                                    {user ? (
                                        <Link to="/" className="btn btn-primary">Go Home</Link>
                                    ) : (
                                        <Link to="/Login" className="btn btn-primary">Go to Login</Link>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Aboutus;
