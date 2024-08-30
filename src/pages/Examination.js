import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import Search from '../components/Search';
import BodyHeader from '../components/BodyHeader';

const Examination = () => {
  const [tableData, setTableData] = useState([]);
  const [tableDataSearch, setTableDataSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUsers();
  }, [])
  const getUsers = async () => {
    try {
      let response = await fetch('https://jsonplaceholder.typicode.com/users');
      let data = await response.json();
      setTableData(data);
      setTableDataSearch(data);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }
  const columns = [
    { column: "id", header: "ID" },
    { column: "name", header: "Name" },
    { column: "email", header: "Email" },
    { column: "phone", header: "Phone" }
  ]
  return (
    <div className='container'>
      <div className='content-body'>
        <BodyHeader title="Exams" />
        <div className='content-body-container'>
          <p>Content is in progress....</p>
          {/* <Search data={tableDataSearch} setTableData={setTableData} /> */}
          {/* <Table data={tableData} columns={columns} loading={loading} /> */}
        </div>
      </div>
    </div>
  )
}

export default Examination;
