import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import * as API from '../../servicios/servicios'
import { Menu } from '../panel/Menu';
import './cursos.css';
import { } from 'bootstrap';
import { EditarCurso } from './EditarCurso';
import DataTable from 'react-data-table-component';

export function ListCursos(){

    const [cursos, setCursos] = useState([]);
    const [curso, setCurso] = useState([]);
    const [id_curso_editar, setIDCursoEditar] = useState([]);

    const [mensajeError, setmensajeError] = useState('')
    const [mensajeSuccess, setmensajeSuccess] = useState('')
    useEffect(()=>{
        API.getCursos().then(setCursos)
        // console.log(cursos)
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

    const trae_datos_a_editar  = async(id)=>{
        setIDCursoEditar(id)
        const datos_curso = await API.getCursoById(id)
        console.log(datos_curso)
        setCurso(datos_curso.nombre)
        
    }
    const columns = [
        {
          name: 'ID',
          selector: row => row.id_curso
        },
        {
          name: 'NOMBRE',
          selector: row => row.nombre,
        },
        {
          name: 'ESTADO',
          selector: row => row.estado
        },
        {
            cell: (row) => (
                (row.estado=='A')? 
                <button
                    className="btn btn-outline btn-xs"
                    onClick={(e) => handleButtonClick(e, row.id_curso)}
                >
                    Baja
                </button>
                :
                <button
                    className="btn btn-outline btn-xs"
                    onClick={(e) => handleButtonClick(e, row.id_curso)}
                >
                    Alta
                </button>
                

            ),
        //  cell:() => <button onClick={Click(row.id_curso)} id={row.id_curso} type="button" className="btn btn-warning">Editar</button>
        }
    
      ]
      
    const editar_curso = ()=>{
        
        const datos_enviar={
            nombre: curso
        };
        API.UpdateCurso(id_curso_editar,datos_enviar);
        
        setmensajeSuccess('Se Edito el curso')
            setTimeout(()=>{
                setmensajeSuccess('')
                 window.location.reload(true)
            }, 2000)
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
    const handleButtonClick = (e, id) => {
        e.preventDefault();
        console.log("Row Id", id);
    };
    return(
        <>
        <div className="card">
            <div className="card-header letra_roja">
                Listado de Cursos
            </div>
            {
                    mensajeError?
                    <div className="alert alert-warning" role="alert">
                     {mensajeError}
                    </div>:''
                }

                {
                    mensajeSuccess?
                    <div className="alert alert-success" role="alert">
                     {mensajeSuccess}
                    </div>:''
                }
            <div className="card-body">
                <Link name="" id="" className="btn btn-primary" to={'/crear_cursos'} role="button">Nuevo Curso</Link>
                
                <DataTable columns={columns} data={cursos}/>
                {/* <table className="table">
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
                                    
                                    <button type="button"  onClick={() => trae_datos_a_editar(curso.id_curso)} data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary">Editar en Modal</button>
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
                </table> */}
            </div>
            <div className="card-footer text-muted">
                Silicom Misiones 
            </div>
        </div>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Titulo</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className="form-group">
                  <label for="">Nombre del curso</label>
                  {/* lo ponga aca el nombre que es:  {curso} */}
                  <input 
                  type="text"
                   value={curso} 
                   onChange={(event)=>setCurso(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                   <input 
                  type="hidden"
                   value={id_curso_editar}
                  name="" id="" className="form-control"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" onClick={() => editar_curso()}  className="btn btn-primary" data-bs-dismiss="modal">Guardar Cambios</button>
                </div>
                </div>
            </div>
        </div>
        </>
        
        
    )
 }