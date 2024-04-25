// ---------declaración de Variables publicas (globales)
let tareasContainer = document.querySelector(".tareasContainer"); // div de 4 columnas donde se muestran las tareas
let tareas = JSON.parse(localStorage.getItem("tareas")) || []; // array de tareas
console.log("he llegado a la linea 3");
let idTarea = 0; // generamos a cero el id de la tarea



// -----------Clase Tarea declarada
class Tarea {
 constructor(nombre, asignada, fecha, descripcion, urgente=false, idTarea) {
    this.nombre = nombre;
    this.asignada = asignada;
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.urgente = urgente;
    this.idTarea = idTarea;
 }
}
console.log("estoy antes del printTarea")





// Función que imprime las tareas en el HTML
function printTareaCards(objetoTarea) {
 let color = objetoTarea.urgente ? "background-color: lightcoral;" : "background-color: lightgray;"; 
 return `<div       
    class="ObjetoTarea"
    data-id="${objetoTarea.idTarea}"
    style="
      display: inline-flex;
      padding: 10px;
      flex-direction: column;
      align-items: center;
      border-radius: 20px;
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 0px;
        margin-right: 0px;
      ${color}
    "
 >
    <div
      class="contenedor texto"
      style=" display: flex; flex-direction: row;  justify-content: space-around; text-overflow: clip;position:relative;"
    >
     
      <p class="tareaNombre text-wrap">${objetoTarea.nombre}</p>
      <p class="tareaFecha" style="margin-left: 10px;">${objetoTarea.fecha}</p>
      
    </div>
    <p class="tareaAsignada" style="align-self:flex-start ;">
      ${objetoTarea.asignada}
    </p>

    <p class="tareaDescripcion" style="align-self:flex-start ; text-overflow: clip">
      ${objetoTarea.descripcion}
    </p>
    <div
      class="contenedorBotones"
      style=" display: flex; flex-direction: row; align-self: flex-end;"
    >
      <input
        type="image"
        class="eliminarTarea"
        onclick="eliminarTarea('${objetoTarea.idTarea}')"
        src="src/erase.svg"
        style="background-color: transparent ; margin: 10px;"
      />

      <input
        type="image"
        class="editarTarea"
        onclick="editarTarea('${objetoTarea.idTarea}')"
        src="src/edit.svg"
        style="background-color: transparent"
      />
    </div>
 </div>`;
}

// Si hay tareas en el localStorage, las imprime
if (tareas) {
    for (let tarea of tareas) {
      tareasContainer.innerHTML += printTareaCards(tarea);
    }
  }
  console.log("he pasado el print tarea", tareas);
// Función que crea una tarea
async function submitTarea() {
event.preventDefault();
++idTarea
let tareaNombre = document.querySelector(".tareaNombre").value; //captura de datos
let tareaAsignada = document.querySelector(".tareaAsignada").value;
let tareaFecha = document.querySelector(".tareaFecha").value;
let tareaDescripcion = document.querySelector(".tareaDescripcion").value;
let tareaUrgente = document.querySelector(".tareaUrgente").checked;
console.log(tareaNombre, tareaAsignada, tareaFecha, tareaDescripcion, tareaUrgente, idTarea);

 const objetoTarea = new Tarea(
    tareaNombre,
    tareaAsignada,
    tareaFecha,
    tareaDescripcion,
    tareaUrgente,
    idTarea
 );
 console.log(objetoTarea);
 await afegirTarea(objetoTarea);
}

async function afegirTarea(nuevaTarea) {
 tareas.push(nuevaTarea);
 localStorage.setItem("tareas", JSON.stringify(tareas));
 // Actualiza el DOM para reflejar la nueva tarea
 tareasContainer.innerHTML += printTareaCards(nuevaTarea);
}

// Función que elimina una tarea
function eliminarTarea(idTarea) {
 let tareaABorrar = tareas.find((tareas) => tareas.idTarea === idTarea);
 console.log("Tarea a eliminar:", tareaABorrar);

 tareas = tareas.filter((tarea) => tarea.idTarea !== idTarea);
 console.log("Tareas después de eliminar:", tareas);
 tareas.splice(tareaABorrar, 1);
 localStorage.setItem("tareas", JSON.stringify(tareas));

 let tareaElement = document.querySelector(`.ObjetoTarea[data-id="${idTarea}"]`);
 if (tareaElement) {
     tareaElement.remove();
 }
}



// Función para editar una tarea
function editarTarea(idTarea) {
         console.log("estoy en editar tarea", idTarea)    
         // Encuentra la tarea a editar
         let tareaAEditar = tareas.find((tarea) => tarea.idTarea == idTarea);
     console.log("Tarea a editar:", tareaAEditar);


         // Rellena el formulario con los datos de la tarea a editar
         document.querySelector(".nombreEditar").value = tareaAEditar.nombre;
         document.querySelector(".asignadaEditar").value = tareaAEditar.asignada;
         document.querySelector(".fechaEditar").value = tareaAEditar.fecha;
         document.querySelector(".descripcionEditar").value = tareaAEditar.descripcion;

         // Muestra el formulario
         document.querySelector(".formEditarTarea").style.display = "inline-block";

    // Guarda el ID de la tarea que se está editando para usarlo en confirmarEdicion
    document.querySelector(".formEditarTarea").dataset.idTareaEditada = idTarea;
}

function confirmarEdicion() {
    // Obtiene el ID de la tarea que se está editando
    idTarea = document.querySelector(".formEditarTarea").dataset.idTareaEditada;
    console.log("ID de la tarea a editar:", idTarea);
    // Encuentra la tarea a editar
    let tareas2 = [...tareas];
    console.log("Tareas:", tareas2);
    let tareaAEditar = [];
   // tareaAEditar = tareas2.find((tarea) => tarea.idTarea == idTarea);
    for (let tarea of tareas2) {
        if (tarea.idTarea == idTarea) {
            tareaAEditar = tarea;
            break;
        }
    }
    
    
    console.log("Tarea siendo editada:", tareaAEditar);
    
    // Verifica si la tarea existe antes de intentar actualizarla
    if (!tareaAEditar) {
       console.error("Tarea no encontrada");
       return;
    }
   
    // Actualiza la tarea con los nuevos valores
    tareaAEditar.nombre = document.querySelector(".nombreEditar").value;
    tareaAEditar.asignada = document.querySelector(".asignadaEditar").value;
    tareaAEditar.fecha = document.querySelector(".fechaEditar").value;
    tareaAEditar.descripcion = document.querySelector(".descripcionEditar").value;
 
    // Guarda la tarea actualizada en el array de tareas
    localStorage.setItem("tareas", JSON.stringify(tareas));
 
    // Oculta el formulario
    document.querySelector(".formEditarTarea").style.display = "none";
 
    // Actualiza el DOM para reflejar los cambios en la tarea
    let tareaElement = document.querySelector(`.ObjetoTarea[data-id="${idTarea}"]`);
       
    tareaElement.innerHTML = printTareaCards(tareaAEditar);
  
    }


// Función para alternar entre mostrar todas las tareas y mostrar solo las tareas urgentes
function alternarMostrarTareas() {
    
   let boton = document.querySelector("#botonFiltro"); 
    let mostrandoSoloUrgentes = boton.innerHTML;
    console.log(mostrandoSoloUrgentes);
   if (mostrandoSoloUrgentes === "Tareas urgentes") {
        filtroTareasUrgentes();
    } else {
        
       mostrarTodasLasTareas();
    }
}

// Función para filtrar y mostrar solo las tareas urgentes o mostrar todas las tareas
function filtroTareasUrgentes() {
    if (!mostrandoSoloUrgentes) {
        // Filtra las tareas por urgencia (solo las tareas con urgente=true)
        let tareasUrgentes = tareas.filter(tarea => tarea.urgente);

        // Borra el contenido actual del contenedor de tareas
        tareasContainer.innerHTML = "";

        // Imprime las tareas urgentes en el contenedor
        for (let tarea of tareasUrgentes) {
            return tareasContainer.innerHTML += printTareaCards(tarea);
        }

        // Cambiar el texto del botón
        document.querySelector('button').textContent = "Mostrar todas las tareas";

        // Cambiar el estado de visualización a mostrar solo tareas urgentes
       
    } else {
        // Mostrar todas las tareas
        mostrarTodasLasTareas();

        // Cambiar el texto del botón
        document.querySelector('button').textContent = "Tareas urgentes";

        // Cambiar el estado de visualización a mostrar todas las tareas
        
    }
}

// Función para mostrar todas las tareas
function mostrarTodasLasTareas() {
   
    tareasContainer.innerHTML = "";

    for (let tarea of tareas) {
        tareasContainer.innerHTML += printTareaCards(tarea);
    }
}


