let tareasContainer = document.querySelector(".projectContainer"); // div de 4 columnas
let tareas = JSON.parse(localStorage.getItem("projects"));
console.log(projects);

// class Project (titulo, imageURL, descripcion) {

//   constructor (){
//        this.titulo = document.querySelector(".form-title").value
//        this.imageURL= document.querySelector(".form-image").value
//        this.descripcion = document.querySelector(".form-description").value
//   }
// }

// function printProyectCards(imageURL) {
//   return `<div class='project rounded-md' onClick=showCaseProject("${imageTitle}")><img class='rounded-md' src='${imageURL}' /></div>`;
// }

if (projects) {
  for (let project of projects) {
    //projectContainer.innerHTML += printProyectCards(project.imageURL);
    projectContainer.innerHTML += `<div class='project rounded-md' onClick="showCaseProject('${project.imageTitle}')">
    <img class='rounded-md' src='${project.imageURL}' />
    </div>`;
  }
}

function showCaseProject(projectTitle) {
  console.log("hola")
  let projectoDestacado = projects.find(
    (project) => project.imageTitle === projectTitle
  );
  //console.log(projectoDestacado);
  let divDondeMetoLoDestacado = document.querySelector(".destacado");

  //divDondeMetoLoDestacado.classList.add("muy-destacado"); // mirara despacito luego. te crea una clase en el document.querySelector al que apunta.
  divDondeMetoLoDestacado.innerHTML = `<div class="muy-destacado"> <h3>${projectoDestacado.imageTitle}</h3> <img src='${projectoDestacado.imageURL}'/> <p>${projectoDestacado.imageDescription}</p> </div>`;

}

function submitProject() {
  let projectsList = [];
  let projectData = {};
  let imageURL = document.querySelector(".form-URL").value; //captura de datos
  let imageTitle = document.querySelector(".form-title").value;
  let imageDescription = document.querySelector(".form-description").value;
if(!imageURL||!imageTitle){
   console.log("hola en el IF díscolo")
   //return mensaje;
}
  projectData = { imageURL, imageTitle, imageDescription }; //aqui instanciamos el objeto nuevo

  if (projects) {
    let projectsFromLocalStorage = JSON.parse(localStorage.getItem("projects"));
    projectsList.push(...projectsFromLocalStorage, projectData);
    return localStorage.setItem("projects", JSON.stringify(projectsList));
  }
  projectsList.push(projectData);
  localStorage.setItem("projects", JSON.stringify(projectsList)); //
  //  y subimos a localStorage
}
