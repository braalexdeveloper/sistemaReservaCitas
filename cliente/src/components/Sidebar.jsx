import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo-whi.png';

const Sidebar = () => {
  return (
    <>
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <Link class="sidebar-brand d-flex align-items-center justify-content-center" to="/">
            
            <div class="sidebar-brand-text ">
                <img src={logo} alt='mydent' />
            </div>
        </Link>

       
        <hr class="sidebar-divider my-0"/>

        <li class="nav-item">
            <Link class="nav-link" to="/">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span></Link>
        </li>

        <li class="nav-item">
        <Link class="nav-link" to="/pacientes">
        <i class="fas fa-user-injured"></i>
                <span>Pacientes</span></Link>
        </li>

        <li class="nav-item">
        <Link class="nav-link" to="/servicios">
        <i class="fas fa-clipboard-list"></i>
                <span>Servicios</span></Link>
        </li>

        <li class="nav-item">
        <Link class="nav-link" to="/citas">
        <i class="fas fa-address-card"></i>
                <span>Citas</span></Link>
        </li>

        
        <hr class="sidebar-divider"/>

        
        

    </ul>
    </>
  );
};

export default Sidebar;
