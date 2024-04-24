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
      ${color}
    "
 >
    <div
      class="contenedor texto"
      style=" display: flex; flex-direction: row; align-self: flex-end; text-overflow: clip;"
    >
      <p class="tareaNombre text-wrap">${objetoTarea.nombre}</p>
      <p class="tareaFecha">${objetoTarea.fecha}</p>
      <p class="idTarea" style="text-size:">${objetoTarea.idTarea}</p>
    </div>
    <p class="tareaAsignada" style="align-self:flex-start ;">
      ${objetoTarea.asignada}
    </p>

    <p class="tareaDescripcion" style="align-self:flex-start ;">
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
    document.querySelector(".formEditarTarea").dataset.idTarea = idTarea;
}


function confirmarEdicion() {
 // Obtiene el ID de la tarea que se está editando
 let idTarea = document.querySelector(".formEditarTarea").dataset.idTarea;
 
 // Encuentra la tarea a editar
 let tarea = tareas.find((tarea) => tarea.idTarea === idTarea);
 
 // Actualiza la tarea con los nuevos valores
 tarea.nombre = document.getElementById("tareaNombre").value;
 tarea.asignada = document.getElementById("tareaAsignada").value;
 tarea.fecha = document.getElementById("tareaFecha").value;
 tarea.descripcion = document.getElementById("tareaDescripcion").value;
 
 // Actualiza el localStorage
 localStorage.setItem("tareas", JSON.stringify(tareas));
 
 // Oculta el formulario
 document.getElementById("formEditarTarea").style.display = "none";
 
 // Actualiza el DOM para reflejar los cambios en la tarea
 let tareaElement = document.querySelector(`.ObjetoTarea[data-id="${idTarea}"]`);
 if (tareaElement) {
    tareaElement.remove();
 }
 // Luego, agrega la tarea actualizada al DOM
 tareasContainer.innerHTML += printTareaCards(tarea);
}
