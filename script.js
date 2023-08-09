

//boton agregar tarea
const botonCrearTarea = document.querySelector(".lista-boton");


let listaTareasAgregadas = []

const alerta = document.querySelector(".alerta");

botonCrearTarea.addEventListener("click", (e) => {
    e.preventDefault()

    const datoIngresado = document.querySelector(".lista-dato").value;

    if(!datoIngresado.trim()){
        alerta.style.display = "block"
        return
    }
    
    agrearTareas(datoIngresado);
    mostrarTareaAgregada();
    console.log(listaTareasAgregadas)
    
})

const agrearTareas = (datoIngresado) =>{
    const tareas = {
        nombre: datoIngresado,
        id: uuid.v4()
    }
    listaTareasAgregadas.push(tareas)
}

const mostrarTareaAgregada = () => {
    const templateTareas = document.querySelector("#template-tareas");
    const contenedorTareas = document.querySelector(".lista-tareas-agregadas");
    const fragmentTareas = document.createDocumentFragment();

    localStorage.setItem("tareas", JSON.stringify(listaTareasAgregadas));
    contenedorTareas.textContent = "";


    listaTareasAgregadas.forEach(tarea => {
        const clonarTareas = templateTareas.content.cloneNode(true);
        clonarTareas.querySelector(".tareas-titulo").textContent = tarea.nombre;
        clonarTareas.querySelector(".tareas-boton").dataset.id = tarea.id;

        fragmentTareas.appendChild(clonarTareas);
    })

    contenedorTareas.appendChild(fragmentTareas);
}


document.addEventListener("click", (e) => {
    // console.log(e.target.matches(".tareas-boton"))
    if(e.target.matches(".tareas-boton")){
        listaTareasAgregadas = listaTareasAgregadas.filter(item => item.id !== e.target.dataset.id);
        mostrarTareaAgregada()
    }
})

document.addEventListener("DOMContentLoaded", (e) => {
    if(localStorage.getItem("tareas")) {
        listaTareasAgregadas = JSON.parse(localStorage.getItem("tareas"));
        mostrarTareaAgregada()
    }
})