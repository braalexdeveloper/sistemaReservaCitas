
import React, { useEffect, useState } from "react";
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

import { Navigate, Outlet } from "react-router-dom";


const Dashboard = () => {
   // Estado para controlar si el sidebar está toggled o no
   const [isToggled, setIsToggled] = useState(true);

   // Función para alternar el estado del sidebar
   const handleToggle = () => {
     setIsToggled(!isToggled);
   };
 
   // Función para cerrar los menús cuando la ventana cambia de tamaño
   const handleResize = () => {
     if (window.innerWidth < 768) {
       setIsToggled(false); // Cerrar si la ventana es pequeña
     }
 
     if (window.innerWidth < 480 && !isToggled) {
       setIsToggled(true); // Forzar toggle en pantallas muy pequeñas
     }
     if(window.innerWidth>768){
setIsToggled(true);
     }
   };
 
   // Detectar el scroll y mostrar/ocultar el botón de scroll-to-top
   const handleScroll = () => {
     const scrollDistance = window.scrollY;
     const scrollButton = document.querySelector('.scroll-to-top');
     if (scrollButton) {
       if (scrollDistance > 50) {
         scrollButton.style.display = 'block';
       } else {
         scrollButton.style.display = 'none';
       }
     }
   };

   const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // para un desplazamiento suave
    });
};

 
   // Hook para manejar eventos de resize y scroll
   useEffect(() => {
     window.addEventListener('resize', handleResize);
     window.addEventListener('scroll', handleScroll);
 
     // Limpiar los eventos cuando el componente se desmonte
     return () => {
       window.removeEventListener('resize', handleResize);
       window.removeEventListener('scroll', handleScroll);
     };
   }, [isToggled]);
    
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
        <Sidebar isToggled={isToggled} />

            {/* Content Wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">

                {/* Main Content */}
                <div id="content">

                    {/* Topbar */}
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                        {/* Sidebar Toggle (Topbar) */}
                        <button id="sidebarToggleTop" onClick={handleToggle} className="btn btn-link d-md-none rounded-circle ml-2 mr-3">
                            <i className="fa fa-bars"></i>
                        </button>
                       <div className="title">
                       
                       </div>
                       

                        {/* Topbar Navbar */}
                        <ul className="navbar-nav ml-auto">

                            

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
            <Footer scrollToTop={scrollToTop} />
            </div>
        </>
    );
}

export default Dashboard;






