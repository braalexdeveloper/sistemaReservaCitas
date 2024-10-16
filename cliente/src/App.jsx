import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from 'react-router-dom'
import PacientesList from './components/Pacientes/PacientesList'
import CitasList from './components/Citas/CitasList'
import Dashboard from './layouts/Dashboard'
import ServiciosList from './components/Servicios/ServiciosList'
import Login from './layouts/Login'
import Home from './components/Home/Home'


function App() {


  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Dashboard />}>
        <Route path="/" element={<Home />} />
        <Route path="/citas/:fecha" element={<CitasList />} />
        <Route path="/pacientes" element={<PacientesList />} />
        <Route path="/servicios" element={<ServiciosList/>} />
      </Route>
    </Routes>
    )
}

export default App
