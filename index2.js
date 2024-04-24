//// declaración de Variables publicas (globales)
let tareasContainer = document.querySelector(".tareasContainer"); // div de 4 columnas donde se muestran las tareas
let tareas = JSON.parse(localStorage.getItem("tareas")) || []; // array de tareas
console.log("he llegado a la linea 3");
let idTarea = 0; // generamos a cero el id de la tarea

// -----------Clase Tarea declarada
class Tarea {
  constructor(nombre, asignada, fecha, descripcion, urgente = false, idTarea) {
    this.nombre = nombre;
    this.asignada = asignada;
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.urgente = urgente;
    this.idTarea = idTarea;
  }
}
console.log("estoy antes del printTarea");

// -----------Función que imprime las tareas en el HTML

function printTareaCards(objetoTarea) {
  let color = objetoTarea.urgente ? "background-color: lightred;" : "background-color: lightgray;";
  // return `<div class="ObjetoTarea" style="display: inline-flex;
  //   padding: 22px 5.325px 89px 0px;
  //   flex-direction: column-reverse;
  //   align-items: center;
  //   ${color} ">
 
  //   <p class="tareaDescripcion ">${objetoTarea.descripcion}</p>
  //   <p class="tareaAsignada ">${objetoTarea.asignada}</p>
  //   <p class="tareaFecha">${objetoTarea.fecha}</p>
  //   <p class="tareaNombre">${objetoTarea.nombre}</p>
  //   </p>
  //   <button class="eliminarTarea" onclick="eliminarTarea('${objetoTarea.idTarea}')"><img alt="" src="src/erase.svg"/> </button>`;
  return `<div
    class="ObjetoTarea"
    data-id="${objetoTarea.idTarea}"
    style="
      display: inline-flex;
      padding: 10px;
      flex-direction: column;
      align-items: center;
      background-color: lightgray;
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
        class="eliminarTarea"
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
  ++idTarea;
  // let listadeTareas = [];

  let tareaNombre = document.querySelector(".tareaNombre").value; //captura de datos
  let tareaAsignada = document.querySelector(".tareaAsignada").value;
  let tareaFecha = document.querySelector(".tareaFecha").value;
  let tareaDescripcion = document.querySelector(".tareaDescripcion").value;
  console.log(tareaNombre, tareaAsignada, tareaFecha, tareaDescripcion);

  const objetoTarea = new Tarea(
    tareaNombre,
    tareaAsignada,
    tareaFecha,
    tareaDescripcion,
    false,
    idTarea
  );
  console.log(objetoTarea);
  await afegirTarea(objetoTarea);
}
async function afegirTarea(nuevaTarea) {
  tareas.push(nuevaTarea);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
// Función que elimina una tarea

function eliminarTarea(id) {
  let tareaABorrar = tareas.find((tarea) => tarea.idTarea === id);
  console.log("Tarea a eliminar:", tareaABorrar);

  tareas = tareas.filter((tarea) => tarea.idTarea !== id);
  console.log("Tareas después de eliminar:", tareas);

  localStorage.setItem("tareas", JSON.stringify(tareas));

  let tareaElement = document.querySelector(`.ObjetoTarea[data-id="${id}"]`);
  if (tareaElement) {
    tareaElement.remove();
  }console.log(tareaABorrar);
}

function editarTarea(id) {
  // Encuentra la tarea a editar
  let tarea = tareas.find((tarea) => tarea.idTarea === id);
 
  // Llena el formulario con los detalles de la tarea
  document.getElementById("tareaNombre").value = tarea.nombre;
  document.getElementById("tareaAsignada").value = tarea.asignada;
  document.getElementById("tareaFecha").value = tarea.fecha;
  document.getElementById("tareaDescripcion").value = tarea.descripcion;
 
  // Muestra el formulario
  //document.getElementById("formularioNueva").style.display = "block";
 
  // Guarda el ID de la tarea que se está editando para usarlo en confirmarEdicion
  document.getElementById("formularioNueva").dataset.idTarea = id;
 }


 function confirmarEdicion() {
  // Obtiene el ID de la tarea que se está editando
  let idTarea = document.getElementById("formularioNueva").dataset.idTarea;
 
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
 // document.getElementById("formEditarTarea").style.display = "none";
 
  // Aquí podrías actualizar el DOM para reflejar los cambios en la tarea
  let tareaElement = document.querySelector(`.ObjetoTarea[data-id="${idTarea}"]`);
 if (tareaElement) {
    tareaElement.remove();
 }

 // Luego, agrega la tarea actualizada al DOM
 tareasContainer.innerHTML += printTareaCards(tarea);
}
 