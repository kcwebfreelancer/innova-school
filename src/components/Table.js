import React from 'react';
import Table from 'react-bootstrap/Table';

const CustomTable = ({ data, columns, loading }) => {
    return (
        <>
            {
                loading ? <p>Loading!!!</p> :
                    <Table striped bordered hover className='table'>
                        <thead>
                            <tr>
                                
                                {
                                    columns.map(header => {
                                        return(<th>{header.header}</th>)
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.length > 0 ? data.map((row, index) => {
                                    return (
                                        <tr key={index}>
                                            {
                                                columns.map(col => <td>{row[col.column]}</td>)
                                            }

                                        </tr>
                                    )
                                }) : <tr><td colSpan={4} align='center'><p>No results found</p></td></tr>
                            }
                        </tbody>
                    </Table>
            }
        </>
    )
}

export default CustomTable;