
import React, { useEffect, useState } from "react";
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

import { Navigate, Outlet } from "react-router-dom";


const Dashboard = () => {
    
    const [auth,setAuth]=useState(true);
    const storedUser = JSON.parse(localStorage.getItem("dataLogin"));
    const logout=()=>{
        localStorage.removeItem("dataLogin")
        setAuth(false)
    }

    useEffect(()=>{
        console.log(auth)
        console.log("useEffect")
    },[auth])
        
    return (
        <>
        <div id="wrapper">
            <Sidebar />

            {/* Content Wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">

                {/* Main Content */}
                <div id="content">

                    {/* Topbar */}
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                        {/* Sidebar Toggle (Topbar) */}
                        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                            <i className="fa fa-bars"></i>
                        </button>
                       <div className="title">
                       
                       </div>
                       

                        {/* Topbar Navbar */}
                        <ul className="navbar-nav ml-auto">

                            {/* Nav Item - Search Dropdown (Visible Only XS) */}
                            <li className="nav-item dropdown no-arrow d-sm-none">
                                <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-search fa-fw"></i>
                                </a>
                                {/* Dropdown - Messages */}
                                <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                    aria-labelledby="searchDropdown">
                                    <form className="form-inline mr-auto w-100 navbar-search">
                                        <div className="input-group">
                                            <input type="text" className="form-control bg-light border-0 small"
                                                placeholder="Search for..." aria-label="Search"
                                                aria-describedby="basic-addon2" />
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="button">
                                                    <i className="fas fa-search fa-sm"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </li>

                            {/* Nav Item - User Information */}
                            <li className="nav-item dropdown no-arrow">
                                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{storedUser && storedUser.user.nombre}</span>
                                    <img className="img-profile rounded-circle"
                                        src="https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14044.jpg" />
                                </a>
                                {/* Dropdown - User Information */}
                                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="userDropdown">
                                   { /*<a className="dropdown-item" href="#">
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Profile
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Settings
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Activity Log
                                    </a>
                                    <div className="dropdown-divider"></div>*/}
                                    <button className="dropdown-item"  onClick={logout} >
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Logout
                                    </button>
                                </div>
                            </li>

                        </ul>

                    </nav>
                    {/* End of Topbar */}

                    {/* Begin Page Content */}
                    <div className="container-fluid">
                      
                            {storedUser && storedUser.token ? <Outlet /> : <Navigate to="/login"/>}
                      
                    </div>
                    {/* /.container-fluid */}

                </div>
                {/* End of Main Content */}

                {/* Footer */}
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Sistema de Reserva de Citas 2024</span>
                        </div>
                    </div>
                </footer>
                {/* End of Footer */}

            </div>
            {/* End of Content Wrapper */}
            <Footer />
            </div>
        </>
    );
}

export default Dashboard;






