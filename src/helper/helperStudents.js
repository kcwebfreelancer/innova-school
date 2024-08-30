const helper = {
    async fetchStudents({setStudents, handleStudentsContextApi, setLoading}){
        console.log('fetching students data...')
        //async function fetchStudents() {
            try {
                let response = await fetch('schools/api/students');
                let data = await response.json();
                setStudents(data);
                handleStudentsContextApi(data);
                setLoading(false);
                console.log('data from helper...', data)
            } catch (error) {
                console.log(error)
            }
        //}
    }
}

export default helper;