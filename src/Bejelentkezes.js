import React from 'react'
import { login } from "./AuthService";
import { useState } from 'react'
import { useHistory} from "react-router-dom";

export function Bejelentkezes() {
    const [isLoginPending, setLoginPending] = useState(false);
    const history = useHistory();

    function loginFormSubmit(e) {

        //Email: user@kodbazis.hu
        //Jelszó: teszt
        e.preventDefault();
        setLoginPending(true);
        login(e.target.elements.email.value, e.target.elements.password.value)
        .then(() => {
            setLoginPending(false);
            history.push("/osszes-szallas");
        })
        .catch((err) => {
            alert("Helytelen bejelentkezési adatok, kérjük próbáld újra!");
            setLoginPending(false);
        })
    }


    if (isLoginPending) {
        return(
            <div className='center-item'>
                <div className='spinner-border text-danger'></div>
            </div>
        );
    }

    return(
        <div className='container-fluid mt-5 d-flex justify-content-center h-100 login-container'>
            <div className='card login-card'>
                <div className='card-header login-card-header'>
                <h3>Bejelentkezés</h3>
                </div>
                <div className='card-body'>
                    <form onSubmit={loginFormSubmit}>
                        <div className='input-group form-group mb-4'>
                            <input type="email" name='email' className='form-control' placeholder='Email'></input>
                        </div>
                        <div className='input-group form-group mb-4'>
                            <input type="password" name='password' className='form-control' placeholder='Jelszó'></input>
                        </div>
                        <div className='form-group'>
                            <button type="submit" className='btn float-right btn-warning'>Küldés</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

