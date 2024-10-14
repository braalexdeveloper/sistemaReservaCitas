import { combineReducers,configureStore } from "@reduxjs/toolkit";

import pacienteReducer from '../slices/pacienteSlice';
import servicioReducer from "../slices/servicioSlice";
import citaReducer from '../slices/citaSlice';

const rootReducer=combineReducers({
    paciente:pacienteReducer,
    servicio:servicioReducer,
    cita:citaReducer
})

export const store=configureStore({
    reducer:rootReducer
});

export default store;