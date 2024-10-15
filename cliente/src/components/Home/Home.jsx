import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPacientes } from "../../slices/pacienteSlice";
import { getAllServicios } from "../../slices/servicioSlice";
import { getCitasToday } from "../../slices/citaSlice";


const Home = () => {

    const {pacientes}=useSelector(state=>state.paciente);
    const {servicios}=useSelector(state=>state.servicio);
    const { citas,countCitasToday }=useSelector(state=>state.cita);
    const dispatch=useDispatch();

    // Crear un nuevo objeto Date para obtener la fecha actual
const fechaActual = new Date();

// Obtener el año, mes y día
const anio = fechaActual.getFullYear();
const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados, así que sumamos 1
const dia = String(fechaActual.getDate()).padStart(2, '0'); // Asegurarse de que el día tenga dos dígitos

// Formatear la fecha en el formato YYYY-MM-DD
const fechaFormateada = `${anio}-${mes}-${dia}`;

console.log(fechaFormateada); // Ejemplo de salida: 2024-10-14


    useEffect(()=>{
     dispatch(getAllPacientes());
     dispatch(getAllServicios());
     dispatch(getCitasToday(fechaFormateada));
    },[dispatch])
    return (
        <>
            <div className="row">


                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Citas para Hoy</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{countCitasToday}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Pacientes</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{pacientes.totalPacientes}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-user-injured fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Servicios
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{servicios.length}</div>
                                        </div>
                                       
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Home;
