import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = "http://localhost:3001/api"; // Cambia esto si es necesario

const initialState={
    servicios:[],
    create:{},
    update:{},
    delete:{}

}

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

export const servicioSlice=createSlice({
    name:'servicio',
    initialState,
    reducers:{
        allServicios:(state,action)=>{
          state.servicios=action.payload.dataServicio
        },
        createServicio:(state,action)=>{
state.servicios=action.payload.dataServicio,
state.create=action.payload.responseCreate
        },
        updateServicio:(state,action)=>{
          state.servicios=action.payload.dataServicio,
          state.update=action.payload.responseUpdate
        },
        deleteServicio:(state,action)=>{
          state.servicios=action.payload.dataServicio,
          state.delete=action.payload.responseDelete
        }
    }
})

const {allServicios,createServicio,updateServicio,deleteServicio}=servicioSlice.actions;

const servicios=async()=>{
    let response=await axios.get(`${URL_API}/servicios`,headers);
    return response.data.servicios;
}

export const getAllServicios=()=>async(dispatch)=>{
const dataServicio=await servicios();
dispatch(allServicios({dataServicio}));
}

export const createServicioAction=(servicio)=>async(dispatch)=>{
  const responseCreate=await axios.post(`${URL_API}/servicios`,servicio,headers);
  const dataServicio=await servicios();
  dispatch(createServicio({responseCreate,dataServicio}));
}

export const updateServicioAction=(id,servicio)=>async(dispatch)=>{
const responseUpdate=await axios.put(`${URL_API}/servicios/`+id,servicio,headers);
const dataServicio=await servicios();
dispatch(updateServicio({responseUpdate,dataServicio}));
}

export const deleteServicioAction=(id)=>async(dispatch)=>{
const responseDelete=await axios.delete(`${URL_API}/servicios/`+id,headers);
const dataServicio=await servicios();
dispatch(deleteServicio({responseDelete,dataServicio}));
}

export default servicioSlice.reducer;