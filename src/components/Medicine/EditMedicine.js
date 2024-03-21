import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import checkAuth from "../User/checkAuth";

function EditMedicine() {
    const { MedId } = useParams();
    const [Name, setName] = useState('');
    const [Company, setCompany] = useState('');
    const [Expdate, setExpdate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = JSON.parse(window.localStorage.getItem('user'))?.token;
                const response = await axios.get(`https://medicalstore.mashupstack.com/api/medicine/${MedId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setName(response.data.name);
                setCompany(response.data.company);
                setExpdate(response.data.expiry_date);
            } catch (error) {
                console.error('Error fetching medicine:', error);
            }
        };
        fetchData();
    }, [MedId]);

    const updateMedicine = async (event) => {
        event.preventDefault();
        try {
            const token = JSON.parse(window.localStorage.getItem('user'))?.token;
            const response = await axios.post(`https://medicalstore.mashupstack.com/api/medicine/${MedId}`, {
                name: Name,
                company: Company,
                expiry_date: Expdate
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(response.data.message);
            navigate('/');
        } catch (error) {
            console.error('Error updating medicine:', error);
        }
    }

    return (
        <div className="container">
            <div className="row mt-5 justify-content-center">
                <div className="col-sm-8 col-lg-5 col-md-6">
                    <div className="card mt-5">
                        <h3 className="card-header text-center">Edit Medicine</h3>
                        <div className="card-body">
                            <form onSubmit={updateMedicine}>
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
                                    <label htmlFor="expdate" className="form-label">Expiry Date:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="expdate"
                                        value={Expdate}
                                        onChange={(event) => setExpdate(event.target.value)}
                                    />
                                </div>
                                <div className="text-end">
                                <button className="btn btn-primary" onClick={updateMedicine}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(EditMedicine);
