import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = "http://localhost:3001/api"; // Cambia esto si es necesario
import getHeaders from "./headers";

const initialState={
    citas:[],
    countCitasToday:0,
    responseCreate:{},
    responseUpdate:{},
    responseDelete:{}

}

const citaSlice=createSlice({
    name:'cita',
    initialState,
    reducers:{
        allCitas: (state, action) => {
            state.citas = action.payload.dataCitas;
        },
        createCita: (state, action) => {
            state.citas = action.payload.dataCitas;
            state.create=action.payload.dataCreate
        },
        updateCita: (state, action) => {
            state.citas = action.payload.dataCitas;
            state.update=action.payload.dataUpdate
        },
        deleteCita: (state, action) => {
            state.citas = action.payload.dataCitas;
            state.delete=action.payload.dataDelete
        },
        citasToday:(state, action) => {
            state.citas = action.payload.dataCitas;
            state.countCitasToday=action.payload.countCitas
        }
    }
})

const { allCitas,createCita,updateCita,deleteCita,citasToday}=citaSlice.actions;

// Funciones asincrónicas para interactuar con la API
const Citas = async () => {
    try{
    const response = await axios.get(`${URL_API}/citas`, getHeaders());
    return response.data.citas;
} catch (error) {
    console.error('Error fetching citas:', error);
    
  }
};

// Obtener todos las citas
export const getAllCitas = () => async (dispatch) => {
    let dataCitas = await Citas();
    dispatch(allCitas({dataCitas}));
};

// Crear un cita
export const createCitaAction = (cita) => async (dispatch) => {
    
    const response = await axios.post(`${URL_API}/citas`, cita, getHeaders());
    let dataCitas = await Citas();
    return dispatch(createCita({ dataCitas,dataCreate:response.data }));
};

// Actualizar un cita
export const updateCitaAction = (id,cita) => async (dispatch) => {
    const response = await axios.put(`${URL_API}/citas/${id}`, cita, getHeaders());
    let dataCitas = await Citas();
    return dispatch(updateCita({ dataCitas,dataUpdate:response.data }));
};

// Eliminar un paciente
export const deleteCitaAction = (id) => async (dispatch) => {
    const response = await axios.delete(`${URL_API}/citas/${id}`, getHeaders());
    let dataCitas= await Citas();
    return dispatch(deleteCita({ dataCitas,dataDelete:response.data }));
};

export const getCitasToday=(fecha)=>async(dispatch)=>{
    const response = await axios.get(`${URL_API}/citas/citasByDate?fechaCita=${fecha}`, getHeaders());
    const countCitas=response.data.citas.length;
    console.log("cantidad de citas hoy:",countCitas)
    return dispatch(citasToday({ countCitas }));
}

// Exportar el reducer
export default citaSlice.reducer;