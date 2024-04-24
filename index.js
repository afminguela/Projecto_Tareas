let tareasContainer = document.querySelector(".tareasContainer"); // div de 4 columnas
let tareas = JSON.parse(localStorage.getItem("tareas"));
console.log("he llegado a la linea 3");

class Tarea  {

  constructor  (nombre, asignada, fecha, descripcion, urgente){
       this.nombre = document.querySelector(".tareaNombre").value
       this.asignada= document.querySelector(".tareaAsignada").value
       this.fecha = document.querySelector(".tareaFecha").value
       this.descripcion = document.querySelector(".tareaDescripcion").value
        this.urgente = document.querySelector(".tareaUrgente").value
  }
}
console.log("estoy antes del printTarea");

function printTareaCards(objetoTarea) {
    if (objetoTarea.urgente) {
    return `<div class="ObjetoTarea w-80 h-80 relative bg-red-500">
   
    <div class="tareaDescripcion w-64 h-7 left-[19.22px] top-[104.73px] absolute text-blue-800 text-2xl font-normal font-['Indie Flower']">${objetoTarea.descripcion}</div>
    <div class="tareaAsignada w-36 h-7 left-[28px] top-[58px] absolute text-blue-800 text-lg font-normal font-['Indie Flower']">${objetoTarea.asignada}</div>
    <div class="tareaFecha w-28 h-7 left-[176px] top-[16px] absolute text-blue-800 text-lg font-normal font-['Indie Flower']">${objetoTarea.fecha}</div>
    <div class="tareaNombre w-64 h-8 left-[34px] top-[16px] absolute text-blue-800 text-lg font-normal font-['Indie Flower']">${objetoTarea.nombre}</div>
  </div>`;
  } else if (!objetoTarea.urgente) {
  return `<div class="ObjetoTarea w-80 h-80 relative bg-zinc-300">
 
<div class="tareaDescripcion w-64 h-7 left-[19.22px] top-[104.73px] absolute text-blue-800 text-2xl font-normal font-['Indie Flower']">${objetoTarea.descripcion}</div>
<div class="tareaAsignada w-36 h-7 left-[28px] top-[58px] absolute text-blue-800 text-lg font-normal font-['Indie Flower']">${objetoTarea.asignada}</div>
<div class="tareaFecha w-28 h-7 left-[176px] top-[16px] absolute text-blue-800 text-lg font-normal font-['Indie Flower']">${objetoTarea.fecha}</div>
<div class="tareaNombre w-64 h-8 left-[34px] top-[16px] absolute text-blue-800 text-lg font-normal font-['Indie Flower']">${objetoTarea.nombre}</div>
</div>`;

}}

if (tareas) {
  for (let tarea of tareas) {
    //projectContainer.innerHTML += printProyectCards(project.imageURL);
    tareasContainer.innerHTML += printTareaCards(objetoTarea);
  }
}

console.log("he pasado el print tarea")

// function showCaseProject(tareaNombre) {
//   console.log("hola")
//   let projectoDestacado = projects.find(
//     (project) => project.imageTitle === projectTitle
//   );
//   //console.log(projectoDestacado);
//   let divDondeMetoLoDestacado = document.querySelector(".destacado");

//   //divDondeMetoLoDestacado.classList.add("muy-destacado"); // mirara despacito luego. te crea una clase en el document.querySelector al que apunta.
//   divDondeMetoLoDestacado.innerHTML = `<div class="muy-destacado"> <h3>${projectoDestacado.imageTitle}</h3> <img src='${projectoDestacado.imageURL}'/> <p>${projectoDestacado.imageDescription}</p> </div>`;

// }

function submitTarea() {
  let listadeTareas = [];
  let tareaData = {};
  let tareaNombre = document.querySelector(".tareaNombre").value //captura de datos
  let tareaAsignada = document.querySelector(".tareaAsignada").value
  let tareaFecha = document.querySelector(".tareaFecha").value
  let tareaDescripcion = document.querySelector(".tareaDescripcion").value
  let tareaUrgente = document.querySelector(".tareaUrgente").value
if(!tareaNombre||!tareaAsignada||!tareaFecha||!tareaDescripcion||!tareaUrgente){
   console.log("hola en el IF díscolo")
   return alert("Por favor, rellena todos los campos")
};

  const objetoTarea = new Tarea (nombre, asignada, fecha, descripcion, urgente ); //aqui instanciamos el objeto nuevo
  console.log(objetoTarea)
  if (tareas) {
    let tareasFromLocalStorage = JSON.parse(localStorage.getItem("tareas"));
    listadeTareas.push(...tareasFromLocalStorage, tareaData);
    return localStorage.setItem("tareas", JSON.stringify(listadeTareas));
  }
  listadeTareasList.push(tareaData);
  localStorage.setItem("tareas", JSON.stringify(listadeTareas)); //
  //  y subimos a localStorage
}
