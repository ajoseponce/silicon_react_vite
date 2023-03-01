import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import * as API from '../../servicios/servicios'
import { } from 'bootstrap';
import DataTable from 'react-data-table-component';
export function ListAlumnos(){
    const [alumnos, setAlumnos] =useState([]);
    const [color, setColor] =useState('');
    const [mensajeSuccess, setmensajeSuccess] = useState('')
    const [mensajeSuccessInscripcion, setmensajeSuccessInscripcion] = useState('')

    // los filtros de busqueda
    const [apellido, setApellido] = useState('');
    const [nombre, setNombre] = useState('');
    const [sexo, setSexo] = useState('');
    const [dni, setDni] = useState('');

    const [inscripciones, setInscripcion] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [id_alumno, setIdAlumno] = useState();
    const [id_curso, setIdCurso] = useState();
    const [descripcion, setDescripcion] = useState();

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
// funcion que carga el modal 
const trae_inscripciones_alumno  = async(id)=>{
    setIdAlumno(id)
    setInscripcion([])
    setCursos([])
    const datos = await API.getInscripcionesByIdAlumno(id)
    const arrayCursos = await API.getCursosSinAsignar(id)
     setCursos(arrayCursos)
     if(datos.status){
        setInscripcion(datos.registros)
     }
}



const grabar_inscripciones_alumno  = async()=>{

    const datos_enviar={
        id_alumno: id_alumno,
        id_curso: id_curso,
        descripcion: 'http://url/ruta/'+id_alumno
    };
    // console.log(datos_enviar)
    API.SaveInscripcionAlumno(datos_enviar);
    setmensajeSuccessInscripcion('Se inscribio')
    setTimeout(()=>{
        setmensajeSuccessInscripcion('')
        trae_inscripciones_alumno(id_alumno)
    }, 4000)
}

const columns = [
    {
      name: 'ID',
      selector: row => row.id_alumno
    },
    {
      name: 'Alumno',
      selector: row => row.apellido+' '+row.nombre,
    },
    {
      name: 'DNI',
      selector: row => row.dni
    },
    {
        name: 'SEXO',
        selector: row => row.sexo
      },
      {
        name: 'DOMICILIO',
        selector: row => row.domicilio
      },
    {
        cell: (row) => (
            (row.estado=='A')? 
            <button
                className="btn btn-outline btn-xs"
                onClick={(e) => handleButtonClick(e, row.id_alumno)}
            >
                Baja
            </button>
            :
            <button
                className="btn btn-outline btn-xs"
                onClick={(e) => handleButtonClick(e, row.id_alumno)}
            >
                Alta
            </button>
            

        ),
    //  cell:() => <button onClick={Click(row.id_curso)} id={row.id_curso} type="button" className="btn btn-warning">Editar</button>
    }

  ]

  const handleButtonClick = (e, id) => {
    e.preventDefault();
    console.log("el Id es", id);
};
    return(
        <>
        <div className="card">
            {
                mensajeSuccess?
                <div className={`alert alert-${color}`} role="alert">
                    {mensajeSuccess}
                </div>:''
            }
             <div className="card">
                <div className="card-header">
                    Filtros de busqueda
                </div>
                <div className="card-body">
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
            <DataTable columns={columns} data={alumnos} />
                {/* <table className="table table-striped table-inverse table-responsive">
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
                                       
                                        <button type="button"  onClick={() => trae_inscripciones_alumno(alumno.id_alumno)}  data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-secondary">Inscripciones</button>
                                       
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
                </table> */}
            </div>
            <div className="card-footer text-muted">
                Silicon Misiones
            </div>
        </div>
        
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Inscripciones</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                {
                mensajeSuccessInscripcion?
                    <div className="alert alert-success" role="alert">
                        {mensajeSuccessInscripcion}
                    </div>:''
                }
                <div className="form-group">
                <div className='row'>
                        <div className='col-4'>
                            <label for="">Nombre del curso</label>
                            {/* lo ponga aca el nombre que es:  {curso} */}
                            <select onChange={(event)=>setIdCurso(event.target.value)} className='form-control'>
                                    <option>Seleccionar un curso</option>
                                        {
                                    cursos?
                                    cursos.map((c)=>(
                                        <option value={c.id_curso}>{c.nombre}</option>
                                    )):
                                        <option value='F'>No Contiene mas cursos</option>
                                    }
                                </select>
                        </div>
                        <div className='col-4'>
                        <label>Observacion </label>
                            <input 
                            id='descripcion'
                            disabled
                            className='form-control'
                            value={'url/ruta/'+id_alumno} 
                            
                            />
                        </div>
                 </div>    
                <button type="button" onClick={() => grabar_inscripciones_alumno()}  className="btn btn-primary" >Guardar</button>
                   
                 
                </div>
                <table className="table table-striped table-inverse table-responsive">
                    <thead className="thead-inverse">
                        <tr>
                            
                            <th>Curso</th>
                            <th>Nota</th>
                            <th>Fecha inscripcion</th>
                            <th>Comentario</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {
                    inscripciones?
                    inscripciones.map((inscrip)=>(
                            <tr>
                                <td scope="row">{inscrip.curso}</td>
                                <td scope="row">{inscrip.nota}</td>
                                <td scope="row">{inscrip.fecha_formateada}</td>
                                <td scope="row">{inscrip.descripcion}</td>
                                </tr>
                    ))
                    :
                    <tr>
                        <td colSpan={4} scope="row">No tiene inscripciones</td>
                    </tr>
                    }
                    </tbody>
                </table>
                </div>
                
                </div>
            </div>
        </div>
        </>
        
    )
}