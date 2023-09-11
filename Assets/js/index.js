const categories = document.getElementById("categories")

const filtrarCategoriasRepetidas = (data) => {
    const filtrado = data.map( (category  ) => category.category)
    const categoriesFiltradas = new Set(filtrado)
    return categoriesFiltradas 
}


const categoriasSeleccionadas = [];
console.log(categoriasSeleccionadas, "categorias seleccionadas")
const selectedCheck = (checkbox, category) => {
    checkbox.addEventListener("change", function () {
        if (this.checked) {
            
            console.log("Se ha seleccionado:", category);
            categoriasSeleccionadas.push(category);
        } else {
            
            console.log("Se ha deseleccionado:", category);
            const index = categoriasSeleccionadas.indexOf(category);
            if (index !== -1) {
                categoriasSeleccionadas.splice(index, 1);
            }
        }
        return filtrarEventos();
        console.log(categoriasSeleccionadas, "CATEGORIASSSS")
    });
}

const filtrarEventos = () => {
    const eventosFiltrados = data.events.filter((evento) => {
        return categoriasSeleccionadas.includes(evento.category);
    });
    console.log("Eventos filtrados:", eventosFiltrados);
    const estructuraFiltrada = crearTemplate(!eventosFiltrados.length ? data.events : eventosFiltrados);
    imprimirCards(estructuraFiltrada, "containerCards");
    return eventosFiltrados 
}

const insertarCategorias = () =>  {
        const allCategories = filtrarCategoriasRepetidas( data.events)
        allCategories.forEach((category) =>  {
        console.log(category.category)
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        selectedCheck(checkbox,category)
        const label = document.createElement("label")
        label.classList.add("m-3")
        label.textContent = category
        categories.appendChild(checkbox)
        categories.appendChild(label)
    });
    filtrarEventos()
}


insertarCategorias()


console.log()

const ContenedorCards = document.getElementById('containerCards');

function crearCard(x) {
    return `
    <div class="card" style="width: 18rem;">
        <img src="${x.image}" class="card-img-top" alt="${x.name}">
        <div class="card-body">
            <h5 class="card-title">Nombre: ${x.name}</h5>
            <p class="card-text">Descripción: ${x.description}</p>
            <a href="#" class="btn btn-primary">Details</a>
        </div>
    </div>`;
}
crearCard( data.events[0])
console.log(!categoriasSeleccionadas.length ? data.events[0] : categoriasSeleccionadas, "para ver si anda")

function crearTemplate(listEvents) {
    console.log(listEvents, "listEVENTSS")
    let template = "";
    for (const event of listEvents) {
        template += crearCard(event);
    }
    return template;
}
const estructura = crearTemplate(data.events)

function imprimirCards(string, id) {
    let container = document.getElementById(id);
    container.innerHTML = string;
}
 
imprimirCards(estructura, "containerCards")

const filterBySearchInput = (name) => {
    const filteredEvents = filtrarEventos()
    console.log(name, "nombresss")
    const infoEvents = !filteredEvents.length ?  data.events : filteredEvents
    return infoEvents.filter((evento) => {
        
        console.log(evento.name, "eventos. name")
        return evento.name.toLocaleLowerCase().startsWith(name)
    } )
}

const search = document.getElementById("searchButton")
const searchInput = document.getElementById("searchInput")

search.addEventListener("click", (event) =>  {
    event.preventDefault()
    const value = searchInput.value.toLocaleLowerCase() 
    console.log(value, "lo que escribe  el usuarioss")
    const data = filterBySearchInput(value)
    const textoNoEncontrado = document.getElementById("textoNoEncontrado");
    // if (!data.length) {
    //     const text = document.createElement("p");
    //         text.textContent = "No se encontraron resultados :(";
    //         textoNoEncontrado.appendChild(text);
    // }else {
        
    // }
    const estructuraFiltrada = crearTemplate(data);
        imprimirCards(estructuraFiltrada, "containerCards");
})
