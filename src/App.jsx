import { Routes, Route, Link } from 'react-router-dom'
import { ListCursos } from './componentes/cursos/ListCursos'
import { CreaCurso } from './componentes/cursos/CreaCurso'
import { Principal } from './componentes/panel/Principal'
import { ListAlumnos } from './componentes/alumnos/ListAlumnos'
import { CreaAlumno } from './componentes/alumnos/CreaAlumno'
import { Login } from './componentes/login/Login'
import { Menu } from './componentes/panel/Menu'
import { Registro } from './componentes/login/Registro'
import { useEffect, useState } from 'react'
import { ListUsuarios } from './componentes/usuarios/ListUsuarios'
import { EditarCurso } from './componentes/cursos/EditarCurso'
import { EditarAlumno } from './componentes/alumnos/EditarAlumno'

function App() {
  const [usuario, setUsuario] = useState('');

  useEffect(()=>{
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
    if(usuarioLogueado){
      setUsuario(usuarioLogueado)
    }
  },[])
  
  return (
    <>
    {
      !usuario?
      <>
        <Routes>
             <Route path='/' element={<Login/>}></Route>
             <Route path='/registro' element={<Registro/>}></Route>
        </Routes>
      </>:
        <div className='container'>
         <Menu/> 
         <Routes>
             <Route path='/' element={<Principal/>}></Route>
             <Route path='/listar_cursos' element={<ListCursos/>}></Route>
             <Route path='/crear_cursos' element={<CreaCurso/>} ></Route>
             <Route path='/editar_curso/:id_curso' element={<EditarCurso/>} ></Route>
             <Route path='/listar_alumnos' element={<ListAlumnos/>} ></Route>
             <Route path='/crear_alumnos' element={<CreaAlumno/>} ></Route>
             <Route path='/listar_usuarios' element={<ListUsuarios/>} ></Route>
             <Route path='/editar_alumno/:id_alumno' element={<EditarAlumno/>} ></Route>

          </Routes>
        </div>
    }
           
    </>
  )
}

export default App
