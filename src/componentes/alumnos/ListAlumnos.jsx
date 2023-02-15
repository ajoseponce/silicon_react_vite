import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import * as API from '../../servicios/servicios'

export function ListAlumnos(){
    const [alumnos, setAlumnos] =useState([]);
    const [color, setColor] =useState('');
    const [mensajeSuccess, setmensajeSuccess] = useState('')

    // los filtros de busqueda
    const [apellido, setApellido] = useState('');
    const [nombre, setNombre] = useState('');
    const [sexo, setSexo] = useState('');
    const [dni, setDni] = useState('');


    // aqui se carga por primera vez la variable
useEffect(()=>{
    API.getAlumnos().then(setAlumnos)
},[]);

// esta es la funcion para cambiar de estado 
const CambioEstadoAlumno  = async(id, estado)=>{
    if(estado=='B'){
        setColor('danger')
    }else{
        setColor('success')
    }
    
    const datos_enviar={
        estado: estado
    };
    const respuesta = await API.CambioEstadoAlumno(id, datos_enviar)
    if(respuesta.status){
        setmensajeSuccess(respuesta.mensaje)
        
        setTimeout(()=>{
            setmensajeSuccess('')
            window.location.reload(true)
        }, 2000)
    }else{
        setmensajeSuccess(respuesta.mensaje)
        
        setTimeout(()=>{
            setmensajeSuccess('')
        }, 4000)
    }
    
}
// funcion para buscar alumnos 
const buscar_alumno = ()=>{
    
    const filtros={
        apellido: apellido,
        nombre: nombre,
        dni: dni,
        sexo: sexo,
    };

    API.BuscarAlumnos(filtros).then(setAlumnos);
   
}

const limpiar_filtros = ()=>{
    setApellido('')
    setNombre('')
    setDni('')
    setSexo('')
    API.getAlumnos().then(setAlumnos)
   
}
    return(
        <div className="card">
            {
                mensajeSuccess?
                <div className={`alert alert-${color}`} role="alert">
                    {mensajeSuccess}
                </div>:''
            }
             <div class="card">
                <div class="card-header">
                    Filtros de busqueda
                </div>
                <div class="card-body">
                    <div className='row'>
                        <div className='col-3'>
                            <label>Apellido </label>
                            <input 
                            id='apellido'
                            className='form-control'
                            value={apellido} 
                            onChange={(event)=>setApellido(event.target.value)}
                            />
                        </div>
                        <div className='col-3'>
                            <label>Nombre </label>
                            <input 
                            id='nombre'
                            className='form-control'
                            value={nombre} 
                            onChange={(event)=>setNombre(event.target.value)}
                            />
                        </div>
                        <div className='col-3'>
                            <label>Dni </label>
                            <input 
                            value={dni} 
                            onChange={(event)=>setDni(event.target.value)}
                            className='form-control'/>
                        </div>
                        <div className='col-3'>
                            <label>Sexo </label>
                            <select onChange={(event)=>setSexo(event.target.value)} className='form-control'>
                                <option>Seleccionar filtro</option>
                                <option value='M'>Masculino</option>
                                <option value='F'>Femenino</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-6' >
                            <button onClick={buscar_alumno}  className='btn btn-primary'>Buscar</button>
                            <button onClick={limpiar_filtros}  className='btn btn-dark'>Limpiar Filtros</button>
                        </div>
                        


                    </div>
                    
                </div>
            </div>
            <div className="card-header">
                Listado de alumnos 
            </div>
           
            <div className="card-body">
            <Link name="" id="" className="btn btn-primary" to={'/crear_alumnos'} role="button">Nuevo Alumno</Link>
                <table className="table table-striped table-inverse table-responsive">
                    <thead className="thead-inverse">
                        <tr>
                            <th>ID</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>DNI</th>
                            <th>Sexo</th>
                            <th>Domicilio</th>
                            <th>Estado Civil</th>
                            <th>Estado</th>
                            <th>&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                        {alumnos.map((alumno)=>(
                            <tr>
                                <td scope="row">{alumno.id_alumno}</td>
                                <td>{alumno.apellido}</td>
                                <td>{alumno.nombre}</td>
                                <td>{alumno.dni}</td>
                                <td>{alumno.sexo}</td>
                                <td>{alumno.domicilio}</td>
                                <td>{alumno.estado_civil}</td>
                                <td>
                                    <span className="badge bg-info">
                                        {
                                        (alumno.estado=='A'?'Activo':'Baja')
                                        }
                                    </span>
                                </td>
                                
                                <td>
                                    <div className="btn-group" role="group" aria-label="">
                                        { (alumno.estado=='A')? 
                                        <>
                                        <Link to={`/editar_alumno/${alumno.id_alumno}`}>
                                         <button type="button" className="btn btn-warning">Editar</button>
                                        </Link> 
                                        <button onClick={() => CambioEstadoAlumno(alumno.id_alumno, 'B')} type="button" className="btn btn-danger">Dar de baja</button>
                                        </>
                                        :
                                        <button onClick={() => CambioEstadoAlumno(alumno.id_alumno, 'A')} type="button" className="btn btn-success">Dar de alta</button>
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                </table>
            </div>
            <div className="card-footer text-muted">
                Silicon Misiones
            </div>
        </div>
    )
}