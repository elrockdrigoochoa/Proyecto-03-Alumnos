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
        mostrarAltaAlumnos();
    });
});

class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materiasCalificaciones = {}; // Objeto para almacenar materias y calificaciones
    }

    inscribirMateria(materia) {
        if (!this.materiasCalificaciones[materia]) {
            this.materiasCalificaciones[materia] = null; // Inicialmente la calificación es null
        } else {
            console.log(`El alumno ${this.nombre} ya está inscrito en la materia ${materia}.`);
        }
    }

    asignarCalificacion(materia, calificacion) {
        if (this.materiasCalificaciones[materia] !== undefined) {
            this.materiasCalificaciones[materia] = calificacion;
        } else {
            console.log(`El alumno ${this.nombre} no está inscrito en la materia ${materia}.`);
        }
    }

    obtenerPromedio() {
        const calificaciones = Object.values(this.materiasCalificaciones).filter(calificacion => calificacion !== null);
        if (calificaciones.length === 0) return 0;

        const sum = calificaciones.reduce((acc, curr) => acc + curr, 0);
        return sum / calificaciones.length;
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

// Función para mostrar alta de alumnos
function mostrarAltaAlumnos() {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = ""; // Limpiar el contenedor

    contenedor.innerHTML += `
        <h2>Alta de Alumnos</h2>
        <p>Alumno agregado exitosamente.</p>
    `;
}

// Función para mostrar consulta de alumnos
function mostrarConsultaAlumnos() {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = ""; // Limpiar el contenedor

    contenedor.innerHTML += `
        <h2>Consulta de Alumnos</h2>
        <div id="detalle-alumno">
            <!-- Aquí se mostrarán los detalles de los alumnos -->
        </div>
        <br>
        <h3>Agregar Materia y Calificación</h3>
        <label for="materia">Materia:</label>
        <input type="text" id="materia">
        <label for="calificacion">Calificación:</label>
        <input type="number" id="calificacion">
        <button onclick="agregarMateriaCalificacion()">Agregar</button>
    `;

    contenedor.innerHTML += `
        <ul>
            ${alumnos.map(alumno => `
                <li>
                    <strong>${alumno.nombre} ${alumno.apellidos}</strong> - Edad: ${alumno.edad}
                    <ul>
                        ${Object.entries(alumno.materiasCalificaciones).map(([materia, calificacion]) => `
                            <li>${materia}: ${calificacion !== null ? calificacion : 'Sin calificación'}</li>
                        `).join('')}
                    </ul>
                </li>
            `).join('')}
        </ul>
    `;
}

// Función para agregar materia y calificación al alumno actualmente consultado
function agregarMateriaCalificacion() {
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const materia = document.getElementById("materia").value;
    const calificacion = parseFloat(document.getElementById("calificacion").value);

    // Buscar al alumno por nombre y apellidos
    const alumno = alumnos.find(a => a.nombre === nombre && a.apellidos === apellidos);
    if (alumno) {
        alumno.inscribirMateria(materia);
        alumno.asignarCalificacion(materia, calificacion);
        
        // Mostrar mensaje de éxito
        const detalleAlumno = document.getElementById("detalle-alumno");
        detalleAlumno.innerHTML = `<p>Materia ${materia} agregada con calificación ${calificacion} para ${nombre} ${apellidos}.</p>`;
    } else {
        console.log("Alumno no encontrado.");
    }
}

// Función para mostrar listado de alumnos
function mostrarListadoAlumnos() {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = ""; // Limpiar el contenedor

    contenedor.innerHTML += `
        <h2>Listado de Alumnos</h2>
        <ul>
            ${alumnos.map(alumno => `
                <li>
                    <strong>${alumno.nombre} ${alumno.apellidos}</strong> - Edad: ${alumno.edad}
                    <ul>
                        ${Object.entries(alumno.materiasCalificaciones).map(([materia, calificacion]) => `
                            <li>${materia}: ${calificacion !== null ? calificacion : 'Sin calificación'}</li>
                        `).join('')}
                    </ul>
                </li>
            `).join('')}
        </ul>
    `;
}

