import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom"
import * as API from '../../servicios/servicios'

export function EditarCurso(){

const [curso, setCurso] = useState('');
// const [nombre_curso, setNombreCurso] = useState('');
const {id_curso} = useParams();
const [mensajeSuccess, setmensajeSuccess] = useState('')

useEffect(()=>{
    trae_datos(id_curso)
},[])

const trae_datos  = async ()=>{
    // event.preventDefault();
    const datos_curso = await API.getCursoById(id_curso)
    console.log(datos_curso)
    setCurso(datos_curso.nombre)
}

const editar_curso = ()=>{
    const datos_enviar={
        nombre: curso
    };
    API.UpdateCurso(id_curso,datos_enviar);
    // nombre_curso.current.value=null;
    
    setmensajeSuccess('Se Edito el curso')
        setTimeout(()=>{
            setmensajeSuccess('')
            // window.location.reload(true)
        }, 2000)
}
  return (
        <div className="card">
            <div className="card-header">
                Edicion del  Curso
            </div>
            {
                    mensajeSuccess?
                    <div class="alert alert-success" role="alert">
                     {mensajeSuccess}
                    </div>:''
                }
            <div className="card-body">
                <div className="form-group">
                  <label for="">Nombre del curso</label>
                  <input 
                  type="text"
                   value={curso} 
                   onChange={(event)=>setCurso(event.target.value)}
                  name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group">
                    <button  onClick={editar_curso}  type="button" className="btn btn-primary">Editar</button>
                    <Link to={'/listar_cursos'}><button type="button" className="btn btn-secondary">Volver al listado</button></Link>
                </div>
            </div>
            <div className="card-footer text-muted">
               Silicon Misiones
            </div>
        </div>
  )
}
