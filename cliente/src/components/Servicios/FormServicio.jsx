import React from "react";
import { Button,Modal } from 'react-bootstrap';

const FormServicio = ({showModal,handleCloseModal,input,handleChange,handleSubmit}) => {
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
                                    <label for="dni" class="form-label">Descripción</label>
                                    <input type="text" name="descripcion" onChange={(e)=>handleChange(e)} value={input.descripcion} class="form-control" id="descripcion" aria-describedby="emailHelp" required />

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

            export default FormServicio;