import { crearTemplate, insertarCategorias, filtrarEventos, imprimirCards, search, filtroDeCard } from '../js/modules/fuctions.js';

const ContenedorCards = document.getElementById('containerCards');

const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing';

// sacar del fetch las declaraciones de las funciones
// los llamados tienen que estar dentro el then
const getData = () => {
    const response = fetch(URL_API)
        .then(response => response.json())
        .then(data => data);
    return response;
};

const response = await getData();

search(response?.events);
const filtroData = filtroDeCard(response);
insertarCategorias(filtroData);

// const filtrarCategoriasRepetidas = (data) => {
//     const filtrado = data.map( (category  ) => category.category)
//     const categoriesFiltradas = new Set(filtrado)
//     return categoriesFiltradas
// }

// const categoriasSeleccionadas = [];
// console.log(categoriasSeleccionadas, "categorias seleccionadas")
// const selectedCheck = (checkbox, category) => {
//     checkbox.addEventListener("change", function () {
//         if (this.checked) {

//             console.log("Se ha seleccionado:", category);
//             categoriasSeleccionadas.push(category);
//         } else {

//             console.log("Se ha deseleccionado:", category);
//             const index = categoriasSeleccionadas.indexOf(category);
//             if (index !== -1) {
//                 categoriasSeleccionadas.splice(index, 1);
//             }
//         }
//         return filtrarEventos();
//         console.log(categoriasSeleccionadas, "CATEGORIASSSS")
//     });
// }

// const filtrarEventos = () => {
//     const eventosFiltrados = filteredCard.filter((evento) => {
//         return categoriasSeleccionadas.includes(evento.category);
//     });
//     console.log("Eventos filtrados:", eventosFiltrados);
//     const estructuraFiltrada = crearTemplate(!eventosFiltrados.length ? filteredCard : eventosFiltrados);
//     imprimirCards(estructuraFiltrada, "containerPastEvents");
//     return eventosFiltrados
// }

// const insertarCategorias = () =>  {
//         const allCategories = filtrarCategoriasRepetidas( data.events)
//         allCategories.forEach((category) =>  {
//         console.log(category.category)
//         const checkbox = document.createElement("input")
//         checkbox.type = "checkbox"
//         selectedCheck(checkbox,category)
//         const label = document.createElement("label")
//         label.classList.add("m-3")
//         label.textContent = category
//         categories.appendChild(checkbox)
//         categories.appendChild(label)
//     });
//     filtrarEventos()
// }

// insertarCategorias()

// function crearCard(event) {
//     return `
//     <div class="card" style="width: 18rem;">
//         <img src="${event.image}" class="card-img-top" alt="${event.name}">
//         <div class="card-body">
//             <h5 class="card-title">Nombre: ${event.name}</h5>
//             <p class="card-text">Descripción: ${event.description}</p>
//             <a href="#" class="btn btn-primary">Details</a>
//         </div>
//     </div>`;
// }

// function crearTemplate(listEvents) {
//     let template = "";
//     for (const event of listEvents) {
//         template += crearCard(event);
//     }
//     return template;
// }

// function imprimirCards(string, id) {
// let container = document.getElementById(id);
//     container.innerHTML = string;
// }

// console.log(filteredCard,"filteredCard")
// imprimirCards(estructura,"containerPastEvents")

// const filterBySearchInput = (name) => {
//     const filteredEvents = filterCards(data.events, data.currentDate)
//     console.log(name, "nombresss")
//     const infoEvents = !filteredEvents.length ?  filteredCard : filteredEvents
//     return infoEvents.filter((evento) => {

//         console.log(evento.name, "eventos. name")
//         return evento.name.toLocaleLowerCase().startsWith(name)
//     } )
// }

// const search = document.getElementById("searchButtonPastEvents")
// const searchInput = document.getElementById("searchInputPastEvents")

// search.addEventListener("click", (event) =>  {
//     event.preventDefault()
//     console.log(searchInput, "searchInputt########")
//     const value = searchInput.value.toLocaleLowerCase()
//     console.log(value, "lo que escribe  el usuarioss")
//     const data = filterBySearchInput(value)
//     const textoNoEncontrado = document.getElementById("textoNoEncontrado");
//     // if (!data.length) {
//     //     const text = document.createElement("p");
//     //         text.textContent = "No se encontraron resultados :(";
//     //         textoNoEncontrado.appendChild(text);
//     // }else {

//     // }
//     const estructuraFiltrada = crearTemplate(data);
//     imprimirCards(estructuraFiltrada, "containerPastEvents");
// })
