import React from 'react'

const Search = ({ setTableData, data }) => {
    const handleSearch = (e) => {
        setTableData(data.filter(d => {
            return d.name ? d.name.toLowerCase().includes(e.target.value) : null ||
                d.email ? d.email.toLowerCase().includes(e.target.value) : null ||
                    d.phone ? d.phone.toLowerCase().includes(e.target.value) : null
        }));
    }
    return (
        <div className="search">
            <input type="text" placeholder='Search...' onChange={handleSearch} />
        </div>
    )
}

export default Search;