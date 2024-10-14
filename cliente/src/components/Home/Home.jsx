import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPacientes } from "../../slices/pacienteSlice";
import { getAllServicios } from "../../slices/servicioSlice";


const Home = () => {

    const {pacientes}=useSelector(state=>state.paciente);
    const {servicios}=useSelector(state=>state.servicio);
    const dispatch=useDispatch();

    useEffect(()=>{
     dispatch(getAllPacientes());
     dispatch(getAllServicios());
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
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">4</div>
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
