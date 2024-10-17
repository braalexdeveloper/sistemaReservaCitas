import React, { useState, useEffect } from "react";
import { swalAlert } from "../utils/swalerts";
import { useNavigate } from "react-router-dom";
import logo from '../assets/img/logo-blue.png';

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        email: '',
        contrasena: ''
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const login = async (e) => {
        e.preventDefault();

        if (!input.email || !input.contrasena) {
            swalAlert('Campos vacíos', 'Por favor ingrese su email y contraseña', 'warning');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3001/api/auth`, {
                method: 'POST',
                body: JSON.stringify(input),
                headers: { 'Content-Type': 'application/json' },
            });

            const dataUser = await response.json();

            if (response.ok && dataUser.token) {
                localStorage.setItem('dataLogin', JSON.stringify(dataUser));

                // Actualizar el estado de autenticación si es necesario
                // setAuth(dataUser.token); // Ejemplo si estás usando un contexto de autenticación

                swalAlert('Logueado Correctamente', '', 'success');
                navigate('/'); // Usar navigate aquí
            } else {
                swalAlert('Credenciales Incorrectas', 'Tu email o contraseña no son correctos', 'error');
            }
        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            swalAlert('Error', 'Hubo un problema al intentar iniciar sesión', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div class="container">


            <div class="row justify-content-center">

                <div class="col-xl-10 col-lg-12 col-md-9">

                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">

                            <div class="row">
                                <div class="col-lg-6 d-flex d-lg-flex justify-content-center align-items-center   bg-login-image ">
                                <img src={logo} width={200} alt='mydent' />
                                </div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Sistema de Reserva de Citas</h1>
                                        </div>
                                        <form class="user" onSubmit={(e) => login(e)}>
                                            <div class="form-group">
                                                <input type="email" class="form-control form-control-user"
                                                    id="exampleInputEmail" name="email" value={input.email} onChange={(e) => handleChange(e)} aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." />
                                            </div>
                                            <div class="form-group">
                                                <input type="password" class="form-control form-control-user"
                                                    id="exampleInputPassword" name="contrasena" value={input.contrasena} onChange={(e) => handleChange(e)} placeholder="Password" />
                                            </div>

                                            <button type="submit" disabled={loading} class="btn btn-primary btn-user btn-block">
                                                {loading ? 'Cargando...' : 'Iniciar sesión'}
                                            </button>


                                        </form>
                                        {/*<hr />
                                        <div class="text-center">
                                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                                        </div>
                                        <div class="text-center">
                                            <a class="small" href="register.html">Create an Account!</a>
                                        </div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </>
    );
}

export default Login;
