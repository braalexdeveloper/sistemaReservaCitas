import React from "react";
import { Button,Modal } from 'react-bootstrap';

const FormPaciente = ({showModal,handleCloseModal,input,handleChange,handleSubmit}) => {
    return (
    <>
           {/* Modal que contiene el formulario */}
           <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton className="bg-primary text-white">
                        <Modal.Title>{!input.id ? "Añadir Paciente" : "Editar Paciente"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Aquí renderizas el formulario */}
                        
                        <form onSubmit={(e)=>handleSubmit(e)}>
                                <div class="mb-3">
                                    <label for="nombre" class="form-label">Nombre</label>
                                    <input type="text" name="nombre" onChange={(e)=>handleChange(e)} value={input.nombre} class="form-control" id="nombre" aria-describedby="emailHelp" required />

                                </div>
                                <div class="mb-3">
                                    <label for="dni" class="form-label">DNI</label>
                                    <input type="text" name="dni" onChange={(e)=>handleChange(e)} value={input.dni} class="form-control" id="dni" aria-describedby="emailHelp" required />

                                </div>
                                <div class="mb-3">
                                    <label for="telefono" class="form-label">Telefono</label>
                                    <input type="text" name="telefono" onChange={(e)=>handleChange(e)} value={input.telefono} class="form-control" id="telefono" required />
                                </div>

                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="text" name="email" onChange={(e)=>handleChange(e)} value={input.email} class="form-control" id="email" required />
                                </div>

                                <button type="submit" class="btn btn-primary col-3">Guardar</button>
                            </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseModal}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal> 
                           
                       
            </>
            )
}

            export default FormPaciente;