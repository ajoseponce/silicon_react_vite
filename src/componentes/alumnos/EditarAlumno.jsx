import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import * as API from '../../servicios/servicios'

export function EditarAlumno(){
    const {id_alumno} = useParams();
    const [mensajeSuccess, setmensajeSuccess] = useState('')
    const [apellido, setApellido] = useState('');
    const [nombre, setNombre] = useState('');
    const [dni, setDni] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [estado_civil, setEstadoCivil] = useState('');
    const [sexo, setSexo] = useState('');
    const [fecha_nacimiento, setFechaN] = useState('');

    useEffect(()=>{
        trae_datos(id_alumno)
    },[])

    const trae_datos  = async ()=>{
        // event.preventDefault();
        const datos_alumno = await API.getAlumnoById(id_alumno)
        console.log(datos_alumno);
        setApellido(datos_alumno.apellido)
        setNombre(datos_alumno.nombre)
        setDni(datos_alumno.dni)
        setDomicilio(datos_alumno.domicilio)
        setEstadoCivil(datos_alumno.estado_civil)
        setSexo(datos_alumno.sexo)
        setFechaN(datos_alumno.fecha_formateada)
    }
    const editar_alumno = ()=>{
        const datos_enviar={
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            domicilio: domicilio,
            sexo: sexo,
            estado_civil: estado_civil
        };
        API.UpdateAlumno(id_alumno,datos_enviar);
        setmensajeSuccess('Se Edito el curso')
            setTimeout(()=>{
                setmensajeSuccess('')
                // window.location.reload(true)
            }, 2000)
    }
    return (
        <div className="card">
            <div className="card-header">
                Edicion de los datos del alumno
            </div>
            {
                mensajeSuccess?
                <div className="alert alert-success" role="alert">
                    {mensajeSuccess}
                </div>:''
            }
            <div className="card-body">
                <div className='row'>

                <div className="form-group col-4" >
                  <label for="">Nombre</label>
                  <input 
                  type="text"
                   value={nombre} 
                   onChange={(event)=>setNombre(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group col-4">
                  <label for="">Apellido</label>
                  <input 
                  type="text"
                   value={apellido} 
                   onChange={(event)=>setApellido(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group col-4">
                  <label for="">DNI</label>
                  <input 
                  type="text"
                   value={dni} 
                   onChange={(event)=>setDni(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group col-4">
                  <label for="">Fecha Nacimiento</label>
                  <input 
                  type="date"
                   value={fecha_nacimiento} 
                   onChange={(event)=>setFechaN(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group col-4" >
                  <label for="">Domicilio</label>
                  <input 
                  type="text"
                   value={domicilio} 
                   onChange={(event)=>setDomicilio(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group col-4">
                  <label for="">Estado Civil</label>
                  <input 
                  type="text"
                   value={estado_civil} 
                   onChange={(event)=>setEstadoCivil(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group col-4">
                  <label for="">Sexo</label>
                  <input 
                  type="text"
                   value={sexo} 
                   onChange={(event)=>setSexo(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                </div>
                
                <div className="form-group">
                    <button  onClick={editar_alumno}  type="button" className="btn btn-primary">Editar</button>
                    <Link to={'/listar_alumnos'}><button type="button" className="btn btn-secondary">Volver al listado</button></Link>
                </div>
            </div>
            <div className="card-footer text-muted">
               Silicon Misiones
            </div>
        </div>
    )
}
