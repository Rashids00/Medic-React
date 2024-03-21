import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeUser } from "./Store/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const user = useSelector(store => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout() {
        if (user) {
            const confirmed = window.confirm("Are you sure you want to logout?");
            if (confirmed) {
                axios.post('https://medicalstore.mashupstack.com/api/logout', {}, {
                    headers: { 'Authorization': "Bearer " + user.token }
                }).then(() => {
                    dispatch(removeUser());
                    navigate('/login');
                }).catch(error => {
                    console.error('Logout failed:', error);
                });
            }
        }
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark container-fluid">
            <div className="navbar-brand">
                <h4>Medic</h4>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                {user && (
                    <li className="nav-item">
                        <NavLink to={"/"} className="nav-link" activeclassname="active">
                            Home
                        </NavLink>
                    </li>
                )}
                    <li className="nav-item">
                        <NavLink to={"/aboutus"} className="nav-link" activeclassname="active">
                            About us
                        </NavLink>
                    </li>
                    {user && (
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
                        </li>
                    )}
                    
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;