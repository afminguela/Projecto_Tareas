//// declaración de Variables publicas (globales)
let tareasContainer = document.querySelector(".tareasContainer");  // div de 4 columnas donde se muestran las tareas
let tareas = JSON.parse(localStorage.getItem("tareas")) || [] // array de tareas
console.log("he llegado a la linea 3");
let idTarea = 0;  // generamos a cero el id de la tarea


// -----------Clase Tarea declarada
class Tarea {
  constructor(nombre, asignada, fecha, descripcion, urgente=false, idTarea) {
    this.nombre = nombre;
    this.asignada = asignada;
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.urgente = urgente;
    this.idTarea = idTarea
  }
}
console.log("estoy antes del printTarea");


// -----------Función que imprime las tareas en el HTML


function printTareaCards(objetoTarea) {
  let color = objetoTarea.urgente ? null : "background-color: gray;"
    return `<div class="ObjetoTarea" style="display: inline-flex;
    padding: 22px 5.325px 89px 0px;
    flex-direction: column-reverse;
    align-items: center;
    ${color} ">
 
    <p class="tareaDescripcion ">${objetoTarea.descripcion}</p>
    <p class="tareaAsignada ">${objetoTarea.asignada}</p>
    <p class="tareaFecha">${objetoTarea.fecha}</p>
    <p class="tareaNombre">${objetoTarea.nombre}</p>
    </p>
    <button class="eliminarTarea" onclick="eliminarTarea('${objetoTarea.idTarea}')"><img alt="" src="src/erase.svg"/> </button>`;
  
}
// Si hay tareas en el localStorage, las imprime
if (tareas) {
  for (let tarea of tareas) {
    //projectContainer.innerHTML += printProyectCards(project.imageURL);
    tareasContainer.innerHTML += printTareaCards(tarea);
  }
}
console.log("he pasado el print tarea");
// Función que crea una tarea
async function submitTarea() {
  event.preventDefault()
  ++idTarea
  // let listadeTareas = [];
 
  let tareaNombre = document.querySelector(".tareaNombre").value; //captura de datos
  let tareaAsignada = document.querySelector(".tareaAsignada").value;
  let tareaFecha = document.querySelector(".tareaFecha").value;
  let tareaDescripcion = document.querySelector(".tareaDescripcion").value;
  console.log(tareaNombre, tareaAsignada, tareaFecha, tareaDescripcion)
  
  const objetoTarea = new Tarea(
    tareaNombre,
    tareaAsignada,
    tareaFecha,
    tareaDescripcion,
    false,
    idTarea); 
  console.log(objetoTarea);
  await afegirTarea(objetoTarea);
}
async function afegirTarea(nuevaTarea){
  tareas.push(nuevaTarea);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
// Función que elimina una tarea
function eliminarTarea(id) {
  console.log("hola")
  console.log(id)

    
let tareaABorrar = tareas.find(
      (tarea) => tarea.idTarea === id
    );
  console.log(tareaABorrar);
}

// console.log(tareaABorrar);
//   let divDondeMetoLoDestacado = document.querySelector(".destacado");
//   //divDondeMetoLoDestacado.classList.add("muy-destacado"); // mirara despacito luego. te crea una clase en el document.querySelector al que apunta.
//   divDondeMetoLoDestacado.innerHTML = `<div class="muy-destacado"> <h3>${projectoDestacado.imageTitle}</h3> <img src='${projectoDestacado.imageURL}'/> <p>${projectoDestacado.imageDescription}</p> </div>`;
// }