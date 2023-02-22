import { useState } from "react"
import { Link } from "react-router-dom"
import * as API from '../../servicios/servicios'

export function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
     const [mensajeError, setmensajeError] = useState('')

    const enviarForm  = async (event)=>{
        event.preventDefault();
        const user = await API.Login({username, password})
        if(user.status){
            // console.log(user.token);
             window.localStorage.setItem('usuario', JSON.stringify(user));
             window.localStorage.setItem('token', JSON.stringify(user.token));
            setUsername('')
            setPassword('')
            window.location.reload(true)
        }else{
            setmensajeError(user.mensaje)
            setTimeout(()=>{
                setmensajeError('')
            }, 4000)
        }
    }

    return(
     <div className="container">
        <div className="form-signin w-100 m-auto">
        <form onSubmit={enviarForm}>
                <h1 class="h3 mb-3 fw-normal">Ingresar sus datos</h1>
                {
                    mensajeError?
                    <div class="alert alert-danger" role="alert">
                     {mensajeError}
                    </div>:''
                }
                
                <div class="form-floating">
                
                <input 
                type="text" 
                class="form-control" 
                id="floatingInput" 
                placeholder="Usuario"
                value={username}
                onChange={(event)=>setUsername(event.target.value)}
                />
                <label for="floatingInput">Usuario</label>
                </div>
                <div class="form-floating">
                
                <input 
                type="password" 
                class="form-control" 
                id="floatingPassword" 
                placeholder="Password"
                value={password}
                onChange={(event)=>setPassword(event.target.value)} />
                <label for="floatingPassword">Password</label>
                </div>

                
                <button class="w-100 btn btn-lg btn-primary" type="submit">Ingresar</button>
                <Link to={'/registro'}>
                    Registro
                </Link>
        </form>
        </div>
        
     </div>
    )
}