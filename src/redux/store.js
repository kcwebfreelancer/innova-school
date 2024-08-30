//redux react-redux redux-thunk axios @reduxjs/toolkit

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { studentsReducer } from "./studentsReducer";
import logger from 'redux-logger';

const rootReducer = combineReducers({
    students: studentsReducer
})
const store = configureStore({
    reducer: rootReducer, 
    middleware:() =>[thunk]
});

export default store;

