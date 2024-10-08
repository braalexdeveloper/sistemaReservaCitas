import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from 'react-router-dom'
import PacientesList from './components/Pacientes/PacientesList'
import CitasList from './components/Citas/CitasList'
import Dashboard from './layouts/Dashboard'
import FormPaciente from './components/Pacientes/FormPaciente'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Dashboard />}>
        <Route path="/citas" element={<CitasList />} />
        <Route path="/pacientes" element={<PacientesList />} />
        <Route path="/pacientes/create" element={<FormPaciente />} />
      </Route>
    </Routes>
  )
}

export default App
