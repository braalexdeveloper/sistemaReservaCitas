import { Button, Modal } from "react-bootstrap";

const FormCita=({showModal,handleCloseModal,input,handleChange,handleSubmit,servicios,pacientes})=>{

    return(
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
                                    <label for="fecha" class="form-label">Paciente</label>
                                    {/*<input type="text" name="searchPaciente"  value={input.searchPaciente} class="form-control" id="searchPaciente" placeholder="Busca por Dni"/>

                                    <input type="text" name="paciente" onChange={(e)=>handleChange(e)} value={input.paciente} class="form-control" id="paciente"  required />*/}

                                    
                                    <select name="pacienteId" value={input.pacienteId} onChange={(e)=>handleChange(e)} className="form-select">
                                    <option value="">Selecciona un Paciente</option>
                                        {pacientes && pacientes.map((paciente,index)=>(
                                            <option key={index} value={paciente.id}>{paciente.nombre}</option>
                                        ))}
                                        
                                    </select>

                                </div>
                                <div class="mb-3">
                                    <label for="servicio"  class="form-label">Servicio</label>
                                    <select name="servicioId" value={input.servicioId} onChange={(e)=>handleChange(e)} className="form-select">
                                    <option value="">Selecciona un Servicio</option>
                                        {servicios && servicios.map((servicio,index)=>(
                                            <option key={index} value={servicio.id}>{servicio.nombre}</option>
                                        ))}
                                        
                                    </select>

                                </div>
                                <div class="mb-3">
                                    <label for="fechaCita" class="form-label">Fecha</label>
                                    <input type="date" name="fechaCita" onChange={(e)=>handleChange(e)} value={input.fechaCita} class="form-control" id="fechaCita"  required />

                                </div>
                                <div class="mb-3">
                                    <label for="horaCita" class="form-label">Hora</label>
                                    <select name="horaCita" value={input.horaCita} onChange={(e)=>handleChange(e)} className="form-select">
                                    <option value="">Selecciona la hora</option>
                                            <option  value="7:00 am">7:00 am</option>
                                            <option  value="8:00 am">8:00 am</option>
                                            <option  value="9:00 am">9:00 am</option>
                                            <option  value="10:00 am">10:00 am</option>
                                            <option  value="11:00 am">11:00 am</option>
                                            <option  value="12:00 pm">12:00 pm</option>
                                            <option  value="2:00 pm">2:00 pm</option>
                                            <option  value="3:00 pm">3:00 pm</option>
                                            <option  value="4:00 pm">4:00 pm</option>
                                            <option  value="5:00 pm">5:00 pm</option>
                                            <option  value="6:00 pm">6:00 pm</option>
                                    </select>

                                </div>

                                <div class="mb-3">
                                    <label for="estado"  class="form-label">Estado</label>
                                    <select name="estado" value={input.estado} onChange={(e)=>handleChange(e)} className="form-select">
                                    <option value="">Selecciona un Estado</option>
                                        
                                            <option  value="Pendiente">Pendiente</option>
                                            <option  value="Cancelado">Cancelado</option>
                                            <option  value="Confirmado">Confirmado</option>
                                    </select>

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

export default FormCita;