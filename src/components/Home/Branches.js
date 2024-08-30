import React from 'react'

const Branches = () => {
    const branches = [
        { id: 1, image: 'branch1.jpg', title: 'Dharmapuri (Vijay Nagar)' },
        { id: 2, image: 'branch2.jpg', title: 'Hosur - Bagalur HUDCO' },
        { id: 3, image: 'branch3.jpg', title: 'Hosur - Bagalur' },
        { id: 4, image: 'branch4.jpg', title: 'Thirupattur (Adiyur)' },
        { id: 5, image: 'branch5.jpg', title: 'Thirupattur (Adiyur)' },
        { id: 6, image: 'branch6.jpg', title: 'Thiruvanamalai' }
    ]
    return (
        <div className='branches'>
            <h1>Campuses</h1>
            <ul>
                {
                    branches.map((branch) => {
                        return (
                            <li key={branch.id}>
                                <img src={require(`../../images/${branch.image}`)} />
                                <h3>{branch.title}</h3>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Branches