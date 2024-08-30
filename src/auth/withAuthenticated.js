import React from 'react'

const withAuthenticated = (Component) => {
    let is_authenticated = true;
    let obj={
        name: "Moorthy",
        age:30,
        location:"Chennai",
        desigination:"Data Scienence"
    }
  return ()=>{
    if(!is_authenticated){
        return (
            <>
                <h1>Profile</h1>
                <p>User is not authenticated...</p>
            </>
        )
    }else{
        return <Component data={obj}/>
    }
  }
}

export default withAuthenticated;