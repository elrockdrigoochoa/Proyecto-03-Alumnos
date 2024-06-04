document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que el formulario se envíe por defecto

        // Obtener valores del formulario
        const nombre = document.getElementById("nombre").value;
        const apellidos = document.getElementById("apellidos").value;
        const edad = parseInt(document.getElementById("edad").value);

        // Llamar a la función altaAlumno con los valores obtenidos
        altaAlumno(nombre, apellidos, edad);

        // Limpiar los campos del formulario
        document.getElementById("nombre").value = "";
        document.getElementById("apellidos").value = "";
        document.getElementById("edad").value = "";

        // Mostrar mensaje de éxito
        const contenedor = document.getElementById("contenedor");
        contenedor.innerHTML = `<p>Alumno ${nombre} ${apellidos} agregado exitosamente.</p>`;
    });
});

class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materiasInscritas = [];
        this.calificaciones = [];
    }

    inscribirMateria(materia) {
        this.materiasInscritas.push(materia);
    }

    asignarCalificacion(materia, calificacion) {
        const index = this.materiasInscritas.indexOf(materia);
        if (index !== -1) {
            this.calificaciones[index] = calificacion;
        } else {
            console.log("El alumno no está inscrito en esa materia.");
        }
    }

    obtenerPromedio() {
        if (this.calificaciones.length === 0) return 0;

        const sum = this.calificaciones.reduce((acc, curr) => acc + curr, 0);
        return sum / this.calificaciones.length;
    }
}

let alumnos = [];

function altaAlumno(nombre, apellidos, edad) {
    const alumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(alumno);
}

function inscribirAlumnoMateria(nombre, apellidos, materia) {
    const alumno = alumnos.find(a => a.nombre === nombre && a.apellidos === apellidos);
    if (alumno) {
        alumno.inscribirMateria(materia);
        console.log(`La materia ${materia} ha sido inscrita por el alumno ${nombre} ${apellidos}.`);
    } else {
        console.log("Alumno no encontrado.");
    }
}

function asignarCalificacion(nombre, apellidos, materia, calificacion) {
    const alumno = alumnos.find(a => a.nombre === nombre && a.apellidos === apellidos);
    if (alumno) {
        alumno.asignarCalificacion(materia, calificacion);
        console.log(`Calificación ${calificacion} asignada en ${materia} para el alumno ${nombre} ${apellidos}.`);
    } else {
        console.log("Alumno no encontrado.");
    }
}

function crearGrupo(nombreGrupo, listaAlumnos) {
    const grupo = {
        nombre: nombreGrupo,
        alumnos: listaAlumnos
    };
    return grupo;
}

function buscarAlumnoPorNombre(nombre) {
    return alumnos.filter(a => a.nombre === nombre);
}

function buscarAlumnoPorApellido(apellidos) {
    return alumnos.filter(a => a.apellidos === apellidos);
}

function obtenerPromedioAlumno(nombre, apellidos) {
    const alumno = alumnos.find(a => a.nombre === nombre && a.apellidos === apellidos);
    if (alumno) {
        return alumno.obtenerPromedio();
    } else {
        console.log("Alumno no encontrado.");
        return null;
    }
}

function obtenerPromedioGrupo(listaAlumnos) {
    if (listaAlumnos.length === 0) return 0;

    const sum = listaAlumnos.reduce((acc, curr) => acc + curr.obtenerPromedio(), 0);
    return sum / listaAlumnos.length;
}

function ordenarAlumnosPorCalificacionAscendente() {
    return alumnos.slice().sort((a, b) => {
        const promedioA = a.obtenerPromedio();
        const promedioB = b.obtenerPromedio();
        return promedioA - promedioB;
    });
}

function ordenarAlumnosPorCalificacionDescendente() {
    return alumnos.slice().sort((a, b) => {
        const promedioA = a.obtenerPromedio();
        const promedioB = b.obtenerPromedio();
        return promedioB - promedioA;
    });
}
