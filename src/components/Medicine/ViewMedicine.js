import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import checkAuth from "../User/checkAuth";
import { Link } from "react-router-dom";

function ViewMedicine() {
    const { MedId } = useParams();
    const [Medic, setMedic] = useState({ name: '', company: '', expiry_date: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = JSON.parse(window.localStorage.getItem('user')).token;
                const response = await axios.get(`https://medicalstore.mashupstack.com/api/medicine/${MedId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMedic(response.data);
            } catch (error) {
                console.error('Error fetching medicine:', error);
            }
        };
        fetchData();
    }, [MedId]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-sm-8 col-lg-5 col-md-6">
                    <div className="card mt-5">
                        <div className="card-header text-center">
                            <h3 className="card-title">{Medic.name}</h3>
                        </div>
                        <div className="card-body text-center">
                            <p className="card-text">Company: {Medic.company}</p>
                            <p className="card-text">Expiry Date: {Medic.expiry_date}</p>
                            <Link to="/" className="btn btn-sm btn-primary">Go Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(ViewMedicine);


