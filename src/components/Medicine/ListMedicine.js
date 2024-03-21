import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function ListMedicine(props) {
    const [showModal, setShowModal] = useState(false);

    async function deleteMedicine() {
        try {
            const token = JSON.parse(window.localStorage.getItem('user')).token;
            await axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${props.med.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            props.refresh();
            setShowModal(false);
        } catch (error) {
            console.error('Error deleting medicine:', error);
        }
    }

    return (
        <tr>
            <td>{props.med.id}</td>
            <td>{props.med.name}</td>
            <td>{props.med.company}</td>
            <td className=" justify-content-center align-items-center">
                <div>
                    <Link to={"/" + props.med.id} className="btn btn-sm  btn-primary  me-2">View</Link>
                    <Link to={"/" + props.med.id + "/edit"} className="btn btn-sm btn-info me-2">Edit</Link>
                    <button className="btn btn-sm btn-danger me-2" onClick={() => setShowModal(true)}>Delete</button>
                </div>
            </td>

            {showModal && (
                <div className="modal fade show" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this medicine?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={deleteMedicine}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </tr>
    );
}

export default ListMedicine;
