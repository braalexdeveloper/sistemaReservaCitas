import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = "http://localhost:3001/api"; // Cambia esto si es necesario

// Estado inicial
const initialState = {
    pacientes: {},
    create:{},
    update:{},
    delete:{}
};

// Creación del slice para gestionar pacientes
export const pacienteSlice = createSlice({
    name: "paciente",
    initialState,
    reducers: {
        allPacientes: (state, action) => {
            state.pacientes = action.payload.dataPacientes;
        },
        createPaciente: (state, action) => {
            state.pacientes = action.payload.dataPacientes;
            state.create=action.payload.dataCreate
        },
        updatePaciente: (state, action) => {
            state.pacientes = action.payload.dataPacientes;
            state.update=action.payload.dataUpdate
        },
        deletePaciente: (state, action) => {
            state.pacientes = action.payload.dataPacientes;
            state.delete=action.payload.dataDelete
        }
    }
});

// Exportar las acciones
const { allPacientes, createPaciente, updatePaciente, deletePaciente } = pacienteSlice.actions;

// Funciones asincrónicas para interactuar con la API
const Pacientes = async (page) => {
    const response = await axios.get(`${URL_API}/pacientes?page=${page}&limit=5`);
    return response.data;
};

// Obtener todos los pacientes
export const getAllPacientes = (page) => async (dispatch) => {
    let dataPacientes = await Pacientes(page);
    dispatch(allPacientes({dataPacientes}));
};

// Crear un paciente
export const createPacienteAction = (paciente) => async (dispatch) => {
    const response = await axios.post(`${URL_API}/pacientes`, paciente);
    let dataPacientes = await Pacientes();
    return dispatch(createPaciente({ dataPacientes,dataCreate:response.data }));
};

// Actualizar un paciente
export const updatePacienteAction = (id, paciente,page) => async (dispatch) => {
    const response = await axios.put(`${URL_API}/pacientes/${id}`, paciente);
    let dataPacientes = await Pacientes(page);
    return dispatch(updatePaciente({ dataPacientes,dataUpdate:response.data }));
};

// Eliminar un paciente
export const deletePacienteAction = (id) => async (dispatch) => {
    const response = await axios.delete(`${URL_API}/pacientes/${id}`);
    let dataPacientes = await Pacientes();
    return dispatch(deletePaciente({ dataPacientes,dataDelete:response.data }));
};

// Exportar el reducer
export default pacienteSlice.reducer;
