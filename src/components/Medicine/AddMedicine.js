import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkAuth from "../User/checkAuth";

function CreateMedicine() {
    const [Name, setName] = useState('');
    const [Company, setCompany] = useState('');
    const [Expdate, setExpdate] = useState('');
    const navigate = useNavigate();

    async function addMedicine() {
        try {
            const token = JSON.parse(window.localStorage.getItem('user')).token;
            await axios.post('https://medicalstore.mashupstack.com/api/medicine', {
                name: Name,
                company: Company,
                expiry_date: Expdate
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/');
        } catch (error) {
            console.error('Error adding medicine:', error);
        }
    }

    return (
        <div className="container">
            <div className="row mt-5 justify-content-center">
                <div className="col-sm-8 col-lg-5 col-md-6">
                    <div className="card mt-5">
                        <h3 className="card-header text-center">Add Medicine</h3>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="name"
                                        value={Name} 
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="company" className="form-label">Company:</label>
                                    <input
                                        type="text"
                                        className="form-control" 
                                        id="company"
                                        value={Company} 
                                        onChange={(event) => setCompany(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="expiry_date" className="form-label">Expiry Date:</label>
                                    <input
                                        type="text"
                                        className="form-control" 
                                        id="expiry_date"
                                        value={Expdate} 
                                        onChange={(event) => setExpdate(event.target.value)}
                                    />
                                </div>
                                <div className="text-end">
                                    <button type="button" className="btn btn-primary" onClick={addMedicine}>Add Medicine</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(CreateMedicine);
