import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import * as API from '../../servicios/servicios'
export function CreaCurso(){
    const nombre_curso = useRef();
    const [mensajeSuccess, setmensajeSuccess] = useState('')

    const guardar_curso = ()=>{
        // console.log('llama a la funcion correctamente')
        const nombre = nombre_curso.current.value;
        console.log('lo que esta en el input text es :', nombre)
        const datos_enviar={
            nombre: nombre
        };
        API.SaveCurso(datos_enviar);
        nombre_curso.current.value=null;
        
        setmensajeSuccess('Se Creo el curso')
            setTimeout(()=>{
                setmensajeSuccess('')
                window.location.reload(true)
            }, 2000)
    }

    return(
        <div className="card">
            <div className="card-header">
                Crear Curso
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
                  <input type="text" ref={nombre_curso} name="" id="" className="form-control" placeholder="" aria-describedby="helpId"/>
                  <small id="helpId" className="text-muted">&nbsp;</small>
                </div>
                <div className="form-group">
                    <button onClick={guardar_curso} type="button" className="btn btn-primary">Guardar</button>
                    <Link to={'/listar_cursos'}><button type="button" className="btn btn-secondary">Volver al listado</button></Link>
                </div>
            </div>
            <div className="card-footer text-muted">
               Silicon Misiones
            </div>
        </div>
    )
}