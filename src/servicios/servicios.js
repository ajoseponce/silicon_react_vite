const API_URL ='http://localhost:3300'

//trae los cursos
export async function getCursos(){
    try{
        const response = await fetch(`${API_URL}/cursos`);
        const data = await response.json();
        return data;
    }catch(error){
        console.log('Nuestro error', error);
    }
}


export async function getCursoById(id_curso){
    try{
        const response = await fetch(`${API_URL}/cursos/${id_curso}`);
        const data = await response.json();
        return data[0];
    }catch(error){
        console.log('Nuestro error', error);
    }
}

export function UpdateCurso(id_curso, nombre_curso){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nombre_curso)
    };
    fetch(`${API_URL}/cursos/${id_curso}`, requestOptions)
    
}

export async function getUsuarios(){
    try{
        const response = await fetch(`${API_URL}/usuarios`);
        const data = await response.json();
        return data;
    }catch(error){
        console.log('Nuestro error', error);
    }
}

// traer los alumnos
export async function getAlumnos(){
    try{
        const response = await fetch(`${API_URL}/alumnos`);
        const data = await response.json();
        return data;
    }catch(error){
        console.log('Nuestro error', error);
    }
}

    
export function SaveCurso(datos){
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    };
    fetch(`${API_URL}/cursos`, requestOptions)
    
}


export async function Login(datos){
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    };
    try{
    const response = await fetch(`${API_URL}/login`, requestOptions)
    const data = await response.json();
    console.log(data)
    return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}

export async function Registro(datos){
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    };
    try{
    const response = await fetch(`${API_URL}/registro`, requestOptions)
    const data = await response.json();
    console.log(data)
    return data;
    } catch(e){
        // console.log('no funciona')
    }
}

export async function BajaUsuario(id_usuario){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',

        }
    };
    try{
        const response = await fetch(`${API_URL}/bajausuario/${id_usuario}`, requestOptions)
        const data = await response.json();
        console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}

export async function AltaUsuario(id_usuario){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try{
        const response = await fetch(`${API_URL}/altausuario/${id_usuario}`, requestOptions)
        const data = await response.json();
        // console.log(data)
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}

export async function BajaCurso(id_curso){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try{
        const response = await fetch(`${API_URL}/bajacurso/${id_curso}`, requestOptions)
        const data = await response.json();
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}

export async function AltaCurso(id_curso){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try{
        const response = await fetch(`${API_URL}/altacurso/${id_curso}`, requestOptions)
        const data = await response.json();
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}

export async function CambioEstadoAlumno(id_alumno, datos){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };
    try{
        const response = await fetch(`${API_URL}/cambioestadoalumno/${id_alumno}`, requestOptions)
        const data = await response.json();
        return data;
    } catch(e){

        alert('No se puede conectar con el servidor')
    }
}

export async function getAlumnoById(id_alumno){
    try{
        const response = await fetch(`${API_URL}/alumnos/${id_alumno}`);
        const data = await response.json();
        return data[0];
    }catch(error){
        console.log('Nuestro error', error);
    }
}

export function UpdateAlumno(id_alumno, datos){
    const requestOptions={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    };
    fetch(`${API_URL}/alumnos/${id_alumno}`, requestOptions)
    
}