import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import FormCita from './FormCita';
import { useDispatch, useSelector } from 'react-redux';
import { createCitaAction, deleteCitaAction, getAllCitas, updateCitaAction } from '../../slices/citaSlice';
import { getAllServicios } from '../../slices/servicioSlice';
import { swalAlert, swalAlertConfirmDelete } from '../../utils/swalerts';
import { getAllPacientes } from '../../slices/pacienteSlice';

const CitasList = () => {
   //state for the modal
 const [showModal, setShowModal] = useState(false);

 const authId=JSON.parse(localStorage.getItem("dataLogin"))?.user.id;
 

 //state for the field to form
 const [input, setInput] = useState({
     usuarioId:authId,
     pacienteId: '',
     servicioId: '',
     fechaCita:'',
     horaCita:'',
     estado:'Pendiente'

 });

 //state global servicios
 const { servicios } = useSelector((state) => state.servicio);
 //state global pacientes
 const { pacientes } = useSelector((state) => state.paciente);
 //state global citas
 const { citas } = useSelector((state) => state.cita);

 //Dispath
 const dispatch = useDispatch();

 //funcion para modificar el contenido de los campos del formulario
 const handleChange = (e) => {
     setInput({
         ...input,
         [e.target.name]: e.target.value
     })
 }

 //Función para enviar el formulario
 const handleSubmit = (e) => {
     e.preventDefault();
if(!input.id){
 dispatch(createCitaAction(input));
 swalAlert("Cita creada correctamente", "Alerta de éxito", "success");
}else{
 const idCita=input.id;
 delete input.id;
 dispatch(updateCitaAction(idCita,input));
 swalAlert("Cita actualizada correctamente", "Alerta de éxito", "success");
}
    console.log(input)

     handleCloseModal();
 }
//formatear fecha 
function convertirFecha(fecha) {
    // La fecha viene en formato "DD/MM/YYYY"
    const partes = fecha.split('/'); // Separa día, mes y año
    const dia = partes[0];
    const mes = partes[1];
    const anio = partes[2];

    // Retorna la fecha en formato "YYYY-MM-DD"
    return `${anio}-${mes}-${dia}`;
}

 //Selecionar para editar Serivcio
 const editCita = (cita) => {
     setInput({
         id: cita.id,
         pacienteId:cita.pacienteId,
         servicioId:cita.servicioId,
         fechaCita:convertirFecha(cita.fechaCita),
         horaCita: cita.horaCita,
         estado:cita.estado
     })

     handleOpenModal();
 }

 //Metodo para eliminar servicio
 const deleteCita=(id)=>{
  
  swalAlertConfirmDelete("¿Estas seguro de eliminar Cita?", "Cita eliminada correctamente", () => dispatch(deleteCitaAction(id)));
 }

 //Metodo para abrir y cerrar modal
 const handleOpenModal = () => {
     setShowModal(true);

 }

 const handleCloseModal = () => {
     setShowModal(false);
     setInput({
        usuarioId:authId,
        pacienteId: '',
        servicioId: '',
        fechaCita:'',
        horaCita:'',
        estado:''
     })
 }



 useEffect(() => {
     dispatch(getAllCitas());
     dispatch(getAllServicios());
     dispatch(getAllPacientes());
 }, [dispatch])

  return (
    <>
    {/* Page Heading */}
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Citas</h1>
        <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
            className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
    </div>

    {/* Content Row */}
    <div className="row px-2">
                {/* Botón que abre el modal */}
                <Button variant="success" className='col-3 my-2' onClick={handleOpenModal}>
                    Añadir Cita
                </Button>

                <FormCita servicios={servicios} pacientes={pacientes.pacientes} handleCloseModal={handleCloseModal} showModal={showModal} handleChange={handleChange} input={input} handleSubmit={handleSubmit} />
            </div>


            {/* Content Row */}
            <div className="row px-2">

                <div class="card shadow mb-4 col-12">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Listado de Citas</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                      <th>Paciente</th>
                                      <th>Teléfono</th>
                                      <th>Servicio</th>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {citas && citas.map((cita,index) => (
                                        <tr key={index}>
                                            <td>{cita.Paciente.nombre}</td>
                                            <td>{cita.Paciente.telefono}</td>
                                            <td>{cita.Servicio.nombre}</td>
                                            <td>{cita.fechaCita}</td>
                                            <td>{cita.horaCita}</td>
                                            <td>{cita.estado}</td>
                                            <td>
                                                <button className="btn btn-warning" onClick={()=>editCita(cita)}>Editar</button>
                                                <button className="btn btn-danger mx-2" onClick={()=>deleteCita(cita.id)}>Eliminar</button>
                                            </td>

                                        </tr>
                                    ))}



                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>


            </div>
</>
  );
};

export default CitasList;
