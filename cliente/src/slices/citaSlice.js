import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = "http://localhost:3001/api"; // Cambia esto si es necesario

function token(){
    const token = JSON.parse(localStorage.getItem('dataLogin'))?.token; // Recupera el token del localStorage
    return token;
}

const headers={
    headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token()}`
    }
}

const initialState={
    citas:[],
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
        }
    }
})

const { allCitas,createCita,updateCita,deleteCita}=citaSlice.actions;

// Funciones asincrónicas para interactuar con la API
const Citas = async () => {
    try{
    const response = await axios.get(`${URL_API}/citas`,headers);
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
    
    const response = await axios.post(`${URL_API}/citas`, cita,headers);
    let dataCitas = await Citas();
    return dispatch(createCita({ dataCitas,dataCreate:response.data }));
};

// Actualizar un cita
export const updateCitaAction = (id,cita) => async (dispatch) => {
    const response = await axios.put(`${URL_API}/citas/${id}`, cita,headers);
    let dataCitas = await Citas();
    return dispatch(updateCita({ dataCitas,dataUpdate:response.data }));
};

// Eliminar un paciente
export const deleteCitaAction = (id) => async (dispatch) => {
    const response = await axios.delete(`${URL_API}/citas/${id}`,headers);
    let dataCitas= await Citas();
    return dispatch(deleteCita({ dataCitas,dataDelete:response.data }));
};

// Exportar el reducer
export default citaSlice.reducer;