import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import FormServicio from "./FormServicio";
import { useDispatch, useSelector } from "react-redux";
import { getAllServicios, createServicioAction, updateServicioAction, deleteServicioAction } from "../../slices/servicioSlice";
import { swalAlert } from "../../utils/swalerts";

function ServiciosList() {

    //state for the modal
    const [showModal, setShowModal] = useState(false);

    //state for the field to form
    const [input, setInput] = useState({
        nombre: '',
        descripcion: ''
    });

    //state global servicios
    const { servicios } = useSelector((state) => state.servicio);

    //Dispath
    const dispatch = useDispatch();

    //funcion para modificar el contenido de los campos del formulario
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    //Limpiar campos
    const clearField = () => {
        setInput({
            nombre: '',
            descripcion: ''
        })
    }

    //Función para enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const regex = /^[a-zA-Z\s]*$/; // Solo letras y espacios
        if (!regex.test(input.nombre)) {
           
            swalAlert("El nombre no debe contener números.", "", "error");
            return;
        } 

        if (!input.id) {
            dispatch(createServicioAction(input));
            swalAlert("Especialidad creada correctamente", "Alerta de éxito", "success");
        } else {
            const idServicio = input.id;
            delete input.id;
            dispatch(updateServicioAction(idServicio, input));
            swalAlert("Servicio actualizado correctamente", "Alerta de éxito", "success");
        }


        handleCloseModal();
    }

    //Selecionar para editar Serivcio
    const editServicio = (servicio) => {
        setInput({
            id: servicio.id,
            nombre: servicio.nombre,
            descripcion: servicio.descripcion
        })

        handleOpenModal();
    }

    //Metodo para eliminar servicio
    const deleteServicio = (id) => {
        dispatch(deleteServicioAction(id));
        swalAlert("Servicio Eliminado", "Alerta de éxito", "success");
    }

    //Metodo para abrir y cerrar modal
    const handleOpenModal = () => {
        setShowModal(true);

    }

    const handleCloseModal = () => {
        setShowModal(false);
        clearField();
    }

    console.log(servicios)

    useEffect(() => {
        dispatch(getAllServicios());
    }, [dispatch])

    return (
        <>
            {/* Page Heading */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Especialidades</h1>
                
            </div>

            <div className="row px-2">
                {/* Botón que abre el modal */}
                <Button variant="success" className='col-6 col-sm-6 col-xl-3 my-2' onClick={handleOpenModal}>
                    Añadir Especialidad
                </Button>

                <FormServicio handleCloseModal={handleCloseModal} showModal={showModal} handleChange={handleChange} input={input} handleSubmit={handleSubmit} />
            </div>


            {/* Content Row */}
            <div className="row px-2">

                <div class="card shadow mb-4 col-12">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Listado de Especialidades</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Acciones</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {servicios && servicios.map((servicio, index) => (
                                        <tr key={index}>
                                            <td>{servicio.nombre}</td>
                                            <td>{servicio.descripcion}</td>
                                            <td>
                                                <button className="btn btn-warning" onClick={() => editServicio(servicio)}><i class="fas fa-edit"></i></button>
                                                <button className="btn btn-danger mx-2" onClick={() => deleteServicio(servicio.id)}><i class="fas fa-trash"></i>
                                                </button>
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
    )
}

export default ServiciosList;