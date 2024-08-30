// const handleChange = (e) => {
    //     setValues({ ...values, [e.target.name]: e.target.value });
    // }
    // const handleEditChange = (e) => {
    //     setEditFormValues({ ...editFormValues, [e.target.name]: e.target.value });
    // }
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     props.addStudent(values);

    //     setValidated(true);
    //     if (values.name === '' && values.grade === '' && values.section === '') {
    //         return false;
    //     }
    //     if (props.students.responseSuccess) {
    //         setShowModal(false);
    //         setShowToast(true);
    //         setValidated(false);
    //     }
    //     props.getStudents();
    // }


    // const handleUpdateStudent = (e) => {
    //     e.preventDefault();
    //     props.updateStudent(editFormValues);

    //     if (props.students.responseSuccess) {
    //         setShowModal(false);
    //         setShowToast(true);
    //     }
    //     props.getStudents();
    // }
    // function handleEditStudent(student) {
    //     navigate(`/students/update/${student._id}`)
    //     //setShowModal(true);
    //     //setEditForm(true);
    //     //setEditFormValues({ name: student.name, grade: student.grade, section: student.section, id: student._id, photo: student.photo })
    //     //setToggleDisplayPhoto(false);
    // }

    // const handlePhotoChange = (e) => {
    //     let image = e.target.files[0];
    //     setValues({ ...values, photo: image ? image : '' })
    //     const reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0])
    //     reader.onload = () => {
    //         setDisplayPhoto(reader.result);
    //     }
    // }

    // const handleEditPhotoChange = (e) => {
    //     let image = e.target.files[0];
    //     setValues({ ...values, photo: image ? image : '' })
    //     const reader = new FileReader();
    //     setToggleDisplayPhoto(true);
    //     reader.readAsDataURL(e.target.files[0]);
    //     reader.onload = () => {
    //         setDisplayPhoto(reader.result);
    //     }
    // }


    //api calls
    /*async function fetchStudents() {
        try {
            let response = await fetch('schools/api/students');
            let data = await response.json();
            setStudents(data);
            handleStudentsContextApi(data);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }*/
    /*async function deleteStudent(id) {
        let response = await fetch(`schools/api/students/${id}`, {
            'method': 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        if (response.ok && response.status == 200) {
            let result = await response.json();
            setResponseMessage(result.message);
            //setResponseSuccess(true);
        }
    }
    async function postStudent(data) {
        //setResponseSuccess(false);
        let response = await fetch('schools/api/students', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
        if (response.ok && response.status == 200) {
            let result = await response.json();
            setResponseMessage(result.message);
            //setResponseSuccess(true);
        }
    }
    async function updateStudentApi(formData) {
        let { id } = formData;
        let response = await fetch(`schools/api/students/${id}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json'
            }
        });
        if (response.ok && response.status == 200) {
            let result = await response.json();
            setResponseMessage(result.message);
            //setResponseSuccess(true);
        }
    }*/
    //console.log('tableData....', tableData.length)