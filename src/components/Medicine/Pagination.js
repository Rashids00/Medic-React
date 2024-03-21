import React, { useState, useEffect } from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const [startPage, setStartPage] = useState(1);

    useEffect(() => {
        if (currentPage <= startPage) {
            setStartPage(Math.max(1, currentPage - 1)); // Ensure startPage is at least 1
        } else if (currentPage > startPage + 2 && startPage < totalPages - 3) {
            setStartPage(currentPage - 2);
        } else if (currentPage === totalPages) {
            setStartPage(Math.max(1, totalPages - 2)); // Ensure startPage is at least 1
        }
    }, [currentPage, startPage, totalPages]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        onPageChange(pageNumber);
        if (pageNumber >= 3 && pageNumber <= totalPages - 2) {
            setStartPage(pageNumber - 1);
        } else if (pageNumber > totalPages - 2) {
            setStartPage(Math.max(1, totalPages - 2)); // Ensure startPage is at least 1
        } else {
            setStartPage(1);
        }

        if (startPage < 1) {
            setStartPage(1);
        }
    };
    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={"page-item " + (currentPage === 1 ? "disabled" : "")}>
                    <button className="page-link prev-next" onClick={prevPage} disabled={currentPage === 1}>
                        {"<<"}
                    </button>
                </li>
                {[...Array(Math.min(totalPages, 3))].map((_, index) => (
                    <li key={startPage + index} className={"page-item " + (currentPage === startPage + index ? "active" : "")}>
                        <button className="page-link" onClick={() => handlePageClick(startPage + index)}>
                            {startPage + index}
                        </button>
                    </li>
                ))}
                <li className={"page-item " + (currentPage === totalPages ? "disabled" : "")}>
                    <button className="page-link prev-next" onClick={nextPage} disabled={currentPage === totalPages}>
                        {">>"}
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;