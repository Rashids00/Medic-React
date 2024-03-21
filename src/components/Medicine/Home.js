import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ListMedicine from "./ListMedicine";
import Navbar from "../Navbar";
import checkAuth from "../User/checkAuth";
import "./Home.css";
import SearchMedicine from "./SearchMedicine";
import Pagination from "./Pagination";

function Home() {
    const [medicineList, setMedicineList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;
    const [totalPages, setTotalPages] = useState(1);

    const fetchMedicine = useCallback(async (searchQuery = "") => {
        try {
            const token = JSON.parse(window.localStorage.getItem('user')).token;
            let url = 'https://medicalstore.mashupstack.com/api/medicine';
            if (searchQuery) {
                url += `/search?keyword=${searchQuery}`;
            }
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            const paginatedData = paginateData(response.data, currentPage, limit);
            setMedicineList(paginatedData);
            setTotalPages(Math.ceil(response.data.length / limit));
        } catch (error) {
            console.error("Error fetching medicine:", error);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchMedicine();
    }, [fetchMedicine]);

    function paginateData(data, pageNumber, pageSize) {
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return data.slice(startIndex, endIndex);
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-sm-8">
                        <h1 className="text-center mb-4">Medicines</h1>
                        <div className="row justify-content-between mb-3">
                            <div className="col">
                                <SearchMedicine onSearch={fetchMedicine} />
                            </div>
                            <div className="col-auto">
                                <Link to="Add" className="btn btn-primary ml-2">Add Medicine</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Company</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicineList.map(med => <ListMedicine key={med.id} med={med} refresh={fetchMedicine} />)}
                                </tbody>
                            </table>
                        </div>
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onNextPage={nextPage} 
                            onPrevPage={prevPage} 
                            onPageChange={handlePageChange} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(Home);
