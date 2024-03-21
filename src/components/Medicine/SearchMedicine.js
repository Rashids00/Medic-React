import React, { useState } from "react";

function SearchMedicine({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search medicine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="input-group-append">
                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
}

export default SearchMedicine;