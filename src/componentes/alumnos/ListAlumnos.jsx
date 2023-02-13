import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import * as API from '../../servicios/servicios'

export function ListAlumnos(){
    const [alumnos, setAlumnos] =useState([]);

    useEffect(()=>{
        API.getAlumnos().then(setAlumnos)
    },[]);


    return(
        <div className="card">
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
                                    <div class="btn-group" role="group" aria-label="">
                                        <button type="button" class="btn btn-warning">Editar</button>
                                        <button type="button" class="btn btn-danger">Eliminar</button>
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