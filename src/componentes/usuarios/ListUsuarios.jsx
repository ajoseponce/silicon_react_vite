import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import * as API from '../../servicios/servicios'

export function ListUsuarios(){

    const [usuarios, setUsuarios] = useState([]);
    const [mensajeError, setmensajeError] = useState('')
    const [mensajeSuccess, setmensajeSuccess] = useState('')

    useEffect(()=>{
        API.getUsuarios().then(setUsuarios)
    },[])
    
    
    const bajaUsuario  = async(id)=>{
        const user = await API.BajaUsuario(id)
        // const user = await API.bajaUsuario(id)
        if(user.status){
            
            setmensajeError(user.mensaje)
            setTimeout(()=>{
                setmensajeError('')
                window.location.reload(true)
 
            }, 3000)
        }else{
            setmensajeError(user.mensaje)
            setTimeout(()=>{
                setmensajeError('')
            }, 4000)
        }
    }

    const altaUsuario  = async(id)=>{
        const user = await API.AltaUsuario(id)
        if(user.status){
            setmensajeSuccess(user.mensaje)
            setTimeout(()=>{
                setmensajeSuccess('')
                window.location.reload(true)
            }, 3000)
        }else{
            setmensajeError(user.mensaje)
            setTimeout(()=>{
                setmensajeError('')
            }, 4000)
        }
    }
    return(
        <>
        <div className="card">
            <div className="card-header">
                Listado de Usuarios
            </div>
            {
                    mensajeError?
                    <div class="alert alert-warning" role="alert">
                     {mensajeError}
                    </div>:''
                }

                {
                    mensajeSuccess?
                    <div class="alert alert-success" role="alert">
                     {mensajeSuccess}
                    </div>:''
                }
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Apellido y Nombre</th>
                            <th>Nombre de usuario</th>
                            <th>Estado</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario)=>(
                        <tr key={usuario.id}>
                            <td scope="row">{usuario.id}</td>
                            <td>{usuario.apellido_nombre}</td>
                            <td>{usuario.username}</td>
                            <td>{usuario.estado}</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="">
                                    { (usuario.estado=='A')?  
                                    <button onClick={() => bajaUsuario(usuario.id)} type="button" className="btn btn-danger">Dar de Baja</button>
                                    :
                                    <button onClick={() => altaUsuario(usuario.id)} type="button" className="btn btn-success">Dar de Alta</button>
                                    }
                                    </div>
                            </td>
                        </tr>
                       ))}
                    </tbody>
                </table>
            </div>
            <div className="card-footer text-muted">
                Silicom Misiones 
            </div>
        </div>
        </>
        
        
    )
 }