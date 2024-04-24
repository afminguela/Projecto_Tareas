let tareasContainer = document.querySelector(".tareasContainer"); // div de 4 columnas
let tareas = JSON.parse(localStorage.getItem("tareas"));
console.log("he llegado a la linea 3");

// Clase Tarea declarada
class Tarea {
  constructor(nombre, asignada, fecha, descripcion, urgente=false) {
    this.nombre = nombre;
    this.asignada = asignada;
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.urgente = urgente;
  }
}
console.log("estoy antes del printTarea");

// Función que imprime las tareas en el HTML

function printTareaCards(objetoTarea) {
  if (objetoTarea.urgente) {
    return `<div class="ObjetoTarea" style="display: inline-flex;
    padding: 22px 5.325px 89px 0px;
    flex-direction: column-reverse;
    align-items: center;">
   
    <p class="tareaDescripcion ">${objetoTarea.descripcion}</p>
    <p class="tareaAsignada ">${objetoTarea.asignada}</p>
    <p class="tareaFecha ">${objetoTarea.fecha}</p>
    <p class="tareaNombre ">${objetoTarea.nombre}</p>
    <button class="eliminarTarea" onclick="eliminarTarea('${objetoTarea.nombre}')"><img alt="" src="src/erase.svg"/> </button>
  </div>`;
  } else if (!objetoTarea.urgente) {
    return `<div class="ObjetoTarea" style="display: inline-flex;
    padding: 22px 5.325px 89px 0px;
    flex-direction: column-reverse;
    align-items: center;
    background-color: gray; ">
 
<p class="tareaDescripcion ">${objetoTarea.descripcion}</p>
<p class="tareaAsignada ">${objetoTarea.asignada}</p>
<p class="tareaFecha">${objetoTarea.fecha}</p>
<p class="tareaNombre">${objetoTarea.nombre}</p>
</p>
<button class="eliminarTarea" onclick="eliminarTarea('${objetoTarea.nombre}')"><img alt="" src="src/erase.svg"/> </button>`;
  }
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
function submitTarea() {
  let listadeTareas = [];
 
  let tareaNombre = document.querySelector(".tareaNombre").value; //captura de datos
  let tareaAsignada = document.querySelector(".tareaAsignada").value;
  let tareaFecha = document.querySelector(".tareaFecha").value;
  let tareaDescripcion = document.querySelector(".tareaDescripcion").value;
  console.log(tareaNombre, tareaAsignada, tareaFecha, tareaDescripcion)
  //let tareaUrgente = document.querySelector(".tareaUrgente").value;
  // if (
  //   !tareaNombre ||
  //   !tareaAsignada ||
  //   !tareaFecha ||
  //   !tareaDescripcion)
  //   //!tareaUrgente
  //  {
  //   console.log("hola en el IF díscolo");
  //   return alert("Por favor, rellena todos los campos");
  // }

  const objetoTarea = new Tarea(tareaNombre, tareaAsignada, tareaFecha, tareaDescripcion); //tareaUrgente); //aqui instanciamos el objeto nuevo
  console.log(objetoTarea);
  if (tareas) {
    let tareasFromLocalStorage = JSON.parse(localStorage.getItem("tareas"));
    listadeTareas.push(...tareasFromLocalStorage, objetoTarea);
    return localStorage.setItem("tareas", JSON.stringify(listadeTareas));
  }
  listadeTareas.push(objetoTarea);
  localStorage.setItem("tareas", JSON.stringify(listadeTareas)); //
  //  y subimos a localStorage
}


// Función que elimina una tarea

function eliminarTarea(tareaNombre) {
  console.log("hola")
  let tareaABorrar = tareas.find(
    (tarea) => objetoTarea.tareaNombre === tareaNombre
  );}
console.log(tareaABorrar);
//   let divDondeMetoLoDestacado = document.querySelector(".destacado");

//   //divDondeMetoLoDestacado.classList.add("muy-destacado"); // mirara despacito luego. te crea una clase en el document.querySelector al que apunta.
//   divDondeMetoLoDestacado.innerHTML = `<div class="muy-destacado"> <h3>${projectoDestacado.imageTitle}</h3> <img src='${projectoDestacado.imageURL}'/> <p>${projectoDestacado.imageDescription}</p> </div>`;

// }

function