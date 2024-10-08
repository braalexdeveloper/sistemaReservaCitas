import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormPaciente from "./FormPaciente";
import { getAllPacientes, createPacienteAction, deletePacienteAction, updatePacienteAction } from '../../slices/pacienteSlice';
import { swalAlert, swalAlertConfirmDelete } from '../../utils/swalerts';

function PacientesList() {

     //Estado global paciente del store
     const { pacientes } = useSelector((state) => state.paciente);

    // Estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);
    //Estado para paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(pacientes.totalPages);

   
    const dispatch = useDispatch();

    // Función para abrir el modal
    const handleOpenModal = () => setShowModal(true);

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setShowModal(false);
        clearField();
    }

    //Estado para inputs del fomulario
    const [input, setInput] = useState({
        nombre: '',
        dni: '',
        telefono: '',
        email: ''
    });

    const clearField = () => {
        setInput({
            nombre: '',
            dni: '',
            telefono: '',
            email: ''
        })
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)
        if (!input.id) {
            dispatch(createPacienteAction(input));
            
            setCurrentPage(1);
            swalAlert("Alerta de Éxito", "Paciente creado correctamente", "success");
        } else {
            const idPaciente = input.id;
            delete input.id
            dispatch(updatePacienteAction(idPaciente, input,currentPage));
            swalAlert("Alerta de Éxito", "Paciente actualizado correctamente", "success");
        }
  
        handleCloseModal();

    }

    const handleDelete = (id) => {
        swalAlertConfirmDelete("¿Estas seguro de eliminar Paciente?", "Paciente eliminado correctamente", () => dispatch(deletePacienteAction(id))) // Función de callback que se ejecutará después de la confirmación);
        //dispatch(deletePacienteAction(id));
        setCurrentPage(1);
    }

    const editPaciente = (paciente) => {
        setInput({
            id: paciente.id,
            nombre: paciente.nombre,
            dni: paciente.dni,
            telefono: paciente.telefono,
            email: paciente.email
        })
        handleOpenModal();
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    console.log(pacientes)

    useEffect(() => {
        dispatch(getAllPacientes(currentPage));
       
        
    }, [dispatch,currentPage])

    useEffect(()=>{
        setTotalPages(pacientes.totalPages);
    },[pacientes.totalPages])

    return (
        <>

            {/* Page Heading */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Pacientes</h1>
                <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
            </div>

            <div className="row px-2">
                {/* Botón que abre el modal */}
                <Button variant="success" className='col-3 my-2' onClick={handleOpenModal}>
                    Añadir Paciente
                </Button>

                <FormPaciente handleCloseModal={handleCloseModal} showModal={showModal} handleChange={handleChange} input={input} handleSubmit={handleSubmit} />
            </div>


            {/* Content Row */}
            <div className="row px-2">

                <div class="card shadow mb-4 col-12">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Listado de Pacientes</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>DNI</th>
                                        <th>Telefono</th>
                                        <th>Email</th>
                                        <th>Acciones</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {pacientes.pacientes && pacientes.pacientes.map((paciente, index) => (
                                        <tr key={index}>
                                            <td>{paciente.nombre}</td>
                                            <td>{paciente.dni}</td>
                                            <td>{paciente.telefono}</td>
                                            <td>{paciente.email}</td>
                                            <td>
                                                <button className="btn btn-warning" onClick={() => editPaciente(paciente)}>Editar</button>
                                                <button className="btn btn-danger mx-2" onClick={() => handleDelete(paciente.id)}>Eliminar</button>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Botones de paginación */}
                <div>
                    <button className="btn btn-secondary btn-sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span> Página {currentPage} de {totalPages} </span>
                    <button className="btn btn-secondary btn-sm" 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                </div>

            </div>
        </>
    )
}

export default PacientesList;