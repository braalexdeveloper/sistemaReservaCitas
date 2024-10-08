import { combineReducers,configureStore } from "@reduxjs/toolkit";

import pacienteReducer from '../slices/pacienteSlice';

const rootReducer=combineReducers({
    paciente:pacienteReducer
})

export const store=configureStore({
    reducer:rootReducer
});

export default store;