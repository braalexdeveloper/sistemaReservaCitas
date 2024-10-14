import React, { useState } from "react";
import { swalAlert } from "../utils/swalerts";
import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState({
        email: '',
        contrasena: ''
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const login = async (e) => {
        e.preventDefault();

        // Validar que los campos no estén vacíos
        if (!input.email || !input.contrasena) {
            swalAlert('Campos vacíos', 'Por favor ingrese su email y contraseña', 'warning');
            return;
        }

        try {
            setLoading(true); // Iniciar el indicador de carga

            const response = await fetch(`http://localhost:3001/api/auth`, {
                method: 'POST',
                body: JSON.stringify(input),
                headers: { 'Content-Type': 'application/json' },
            });

            const dataUser = await response.json();

            if (response.ok && dataUser.token) {
                // Guardar el token en localStorage (mejor opción sería cookie httpOnly)
                localStorage.setItem('dataLogin', JSON.stringify(dataUser));

                swalAlert('Logueado Correctamente', '', 'success');

                // Redirigir a otra página, por ejemplo "/dashboard"
                navigate('/pacientes');
            } else {

                swalAlert('Credenciales Incorrectas', 'Tu email o contraseña no son correctos', 'error');
            }
        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            swalAlert('Error', 'Hubo un problema al intentar iniciar sesión', 'error');
        } finally {
            setLoading(false); // Finalizar el indicador de carga
        }



    }

    return (
        <>
            <div class="container">


                <div class="row justify-content-center">

                    <div class="col-xl-10 col-lg-12 col-md-9">

                        <div class="card o-hidden border-0 shadow-lg my-5">
                            <div class="card-body p-0">

                                <div class="row">
                                    <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div class="col-lg-6">
                                        <div class="p-5">
                                            <div class="text-center">
                                                <h1 class="h4 text-gray-900 mb-4">Sistema de Reserva de Citas Medicas</h1>
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
                                            <hr />
                                            <div class="text-center">
                                                <a class="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                            <div class="text-center">
                                                <a class="small" href="register.html">Create an Account!</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Login;