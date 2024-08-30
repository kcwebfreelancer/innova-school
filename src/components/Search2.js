import React, { useState } from 'react'

const Search2 = ({ setFilteredStudents, studentsData }) => {
  const handleSearchInputChange = (e) => {
    let text = e.target.value;
    const filtered = text === "" ? studentsData : studentsData.filter(
      (s) =>
        s.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStudents(filtered);
  };
  return (
    <div className="search">
      <input type="text" placeholder='Search...' onChange={handleSearchInputChange} />
    </div>
  )
}

export default Search2