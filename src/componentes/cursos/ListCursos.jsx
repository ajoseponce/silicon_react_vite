import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import * as API from '../../servicios/servicios'
import { Menu } from '../panel/Menu';

export function ListCursos(){

    const [cursos, setCursos] = useState([]);

    const [mensajeError, setmensajeError] = useState('')
    const [mensajeSuccess, setmensajeSuccess] = useState('')
    useEffect(()=>{
        API.getCursos().then(setCursos)
    },[])

    

    const bajaCurso  = async(id)=>{
        const curso = await API.BajaCurso(id)
        // const user = await API.bajaUsuario(id)
        if(curso.status){
            
            setmensajeError(curso.mensaje)
            setTimeout(()=>{
                setmensajeError('')
                window.location.reload(true)
            }, 2000)
        }else{
            setmensajeError(curso.mensaje)
            setTimeout(()=>{
                setmensajeError('')
            }, 4000)
        }
    }

    const altaCurso  = async(id)=>{
        const curso = await API.AltaCurso(id)
        if(curso.status){
            setmensajeError(curso.mensaje)
            setTimeout(()=>{
                setmensajeError('')
                window.location.reload(true)
            }, 2000)
        }else{
            setmensajeError(curso.mensaje)
            setTimeout(()=>{
                setmensajeError('')
            }, 4000)
        }
    }
    return(
        <>
        <div className="card">
            <div className="card-header">
                Listado de Cursos
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
                <Link name="" id="" className="btn btn-primary" to={'/crear_cursos'} role="button">Nuevo Curso</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cursos.map((curso)=>(
                        <tr>
                            <td scope="row">{curso.id_curso}</td>
                            <td>{curso.nombre}</td>
                            <td>
                            <span className="badge bg-info">
                                {
                                (curso.estado=='A'?'Activo':'Baja')
                                }
                                </span>
                            </td>
                            <td>
                                <div className="btn-group" role="group" aria-label="">
                                    
                                    { (curso.estado=='A')? 
                                    <>
                                                                        <Link to={`/editar_curso/${curso.id_curso}`}>
                                    <button type="button" className="btn btn-warning">Editar</button>
                                    </Link> 
                                    <button onClick={() => bajaCurso(curso.id_curso)} type="button" className="btn btn-danger">Dar de baja</button>
                                    
                                    </>
                                    :
                                    <button onClick={() => altaCurso(curso.id_curso)} type="button" className="btn btn-success">Dar de alta</button>
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