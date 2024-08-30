import axios from "axios"
import {
    FAILED_REQUEST,
    FETCH_STUDENTS,
    ADD_STUDENT,
    SET_RESPONSE_SUCCESS,
    DELETE_STUDENT,
    UPDATE_STUDENT,
    GET_STUDENT_DETAILS_BY_ID
} from "./actionTypes"

export const fetchStudentsAction = (data) => {
    return {
        type: FETCH_STUDENTS,
        payload: data
    }
}

export const failedRequest = (error) => {
    return {
        type: FAILED_REQUEST,
        payload: error
    }
}

export const addStudent = (data) => {
    return {
        type: ADD_STUDENT,
        payload: {
            isError: data.isError ? true : false,
            responseMessage: data.message
        }
    }
}
export const deleteStudentAction = (data) => {
    return {
        type: DELETE_STUDENT,
        payload: {
            isError: data.isError ? true : false,
            responseMessage: data.message
        }
    }
}

export const updateStudentAction = (data) => {
    return {
        type: UPDATE_STUDENT,
        payload: {
            isError: data.isError ? true : false,
            responseMessage: data.message
        }
    }
}

export const getStudentDetailsAction = (data) => {
    return {
        type: GET_STUDENT_DETAILS_BY_ID,
        payload: data
    }
}

//CRUD - Api Calls
export const getStudentsApi = () => {
    let path = window.location.pathname.slice(17);
    return async (dispatch) => {
        try {
            let response = await axios.get('/schools/api/students');
            dispatch(fetchStudentsAction(response.data));
        } catch (error) {
            //dispatch(failedRequest(error.message))
        }

    }
}

export const postStudentApi = (formData) => {
    return async (dispatch) => {
        let form_data = new FormData();
        form_data.append("photo", formData.photo ? formData.photo : '');
        form_data.append("name", formData.name);
        form_data.append("gender", formData.gender);
        form_data.append("grade", formData.grade);
        form_data.append("section", formData.section);
        form_data.append("fathername", formData.fathername);
        form_data.append("mothername", formData.mothername);
        form_data.append("primarycontact", formData.primarycontact);
        form_data.append("secondarycontact", formData.secondarycontact);
        form_data.append("dateofadmission", formData.dateofadmission);
        form_data.append("address1", formData.address1);
        form_data.append("address2", formData.address2);
        form_data.append("city", formData.city);
        form_data.append("state", formData.state);
        form_data.append("country", formData.country);
        form_data.append("pincode", formData.pincode);
        
        const config = {
            baseURL: '/',
            headers: { 'Content-Type': `multipart/form-data; boundary=test` }
        }
        try {
            let response = await axios.post('schools/api/students', form_data, config);
            dispatch(addStudent({ message: response.data.message }));
        } catch (error) {
            dispatch(addStudent({ message: error.response.data.message, isError: true }))
        }
    }
}

export const deleteStudentApi = (id) => {
    let path = window.location.pathname.slice(17);
    return async (dispatch) => {
        try {
            let response = await axios.delete(`${path}/schools/api/students/${id}`);
            dispatch(deleteStudentAction({ message: response.data.message }));
        } catch (error) {
            dispatch(deleteStudentAction({ message: error.response.data.message, isError: true }))
        }
    }
}

export const updateStudentApi = (formData) => {
    //let path = window.location.pathname.slice(23);
    let form_data = new FormData();
        form_data.append("photo", formData.photo ? formData.photo : '');
        form_data.append("name", formData.name);
        form_data.append("gender", formData.gender);
        form_data.append("grade", formData.grade);
        form_data.append("section", formData.section);
        form_data.append("fathername", formData.fathername);
        form_data.append("mothername", formData.mothername);
        form_data.append("primarycontact", formData.primarycontact);
        form_data.append("secondarycontact", formData.secondarycontact);
        form_data.append("dateofadmission", formData.dateofadmission);
        form_data.append("address1", formData.address1);
        form_data.append("address2", formData.address2);
        form_data.append("city", formData.city);
        form_data.append("state", formData.state);
        form_data.append("country", formData.country);
        form_data.append("pincode", formData.pincode);

    return async (dispatch) => {
        try {
            let { _id } = formData;
            //let id = 123;
            const config = {
                baseURL: '/',
                headers: { 'Content-Type': 'multipart/form-data; boundary=test' }
            }
            let response = await axios.put(`/schools/api/students/${_id}`, form_data, config);

            dispatch(updateStudentAction({ message: response.data.message }));
        } catch (error) {
            dispatch(updateStudentAction({ message: error.response.data.message, isError: true }))
        }
    }
}

export const getStudentDetailsApi = (id) => {
    let path = window.location.pathname.slice(23);

    return async (dispatch) => {
        try {
            let response = await axios.get(`/schools/api/students/${id}`);
            dispatch(getStudentDetailsAction(response.data))
        } catch (error) {
            dispatch(getStudentDetailsAction({message: error.response.data.message, isError:true}))
        }
    }
}