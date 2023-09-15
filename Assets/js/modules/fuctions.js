export const filtrarCategoriasRepetidas = data => {
    const filtrado = data?.map(category => category.category);
    const categoriesFiltradas = new Set(filtrado);
    return categoriesFiltradas;
};

export const filterCards = (data, currentDate) => {
    return data.filter(card => card.date > currentDate);
};
export const filterCardsUpComingEvents = (data, currentDate) => {
    return data.filter(card => card.date < currentDate);
};
export const filtroDeCard = (data, upComingEvents) => {
    console.log(upComingEvents, 'ACA ESTOY');
    const filteredCard = upComingEvents ? filterCards(data.events, data.currentDate) : filterCardsUpComingEvents(data.events, data.currentDate);
    console.log(filteredCard, 'filteredCard');
    const estructura = crearTemplate(filteredCard);
    imprimirCards(estructura, 'containerCards');
    return filteredCard;
};

export const filtersBySearchInput = name => {
    const filteredEvents = filterCards(data.events, data.currentDate);
    console.log(name, 'nombresss');
    const infoEvents = !filteredEvents.length ? filteredCard : filteredEvents;
    return infoEvents.filter(evento => {
        console.log(evento.name, 'eventos. name');
        return evento.name.toLocaleLowerCase().startsWith(name);
    });
};

export const filtrarEventos = data => {
    console.log(data, 'datasa');
    const eventosFiltrados = data?.filter(eventos => {
        return categoriasSeleccionadas.includes(eventos.category);
    });
    console.log(eventosFiltrados, 'eventos que son filtrados');
    const estructuraFiltrada = crearTemplate(!eventosFiltrados.length ? data : eventosFiltrados);
    imprimirCards(estructuraFiltrada, 'containerCards');
    return eventosFiltrados;
};

export const categoriasSeleccionadas = [];
export const selectedCheck = (checkbox, category, eventos) => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            categoriasSeleccionadas.push(category);
        } else {
            const index = categoriasSeleccionadas.indexOf(category);
            if (index !== -1) {
                categoriasSeleccionadas.splice(index, 1);
            }
            console.log(selectedCheck);
        }
        console.log(eventos, 'los evento0s');
        return filtrarEventos(eventos);
    });
};

const categories = document.getElementById('categories');
export const insertarCategorias = eventos => {
    console.log(eventos, 'eventos asdasdasd');
    const allCategories = filtrarCategoriasRepetidas(eventos);
    allCategories.forEach(category => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        console.log(eventos, 'los eventos categoricos');
        selectedCheck(checkbox, category, eventos);
        const label = document.createElement('label');
        label.classList.add('m-3');
        label.textContent = category;
        categories.appendChild(checkbox);
        categories.appendChild(label);
    });
};

insertarCategorias();

export function crearCard(x) {
    return `
    <div class="card" style="width: 18rem;">
        <img src="${x.image}" class="card-img-top" alt="${x.name}">
        <div class="card-body">
            <h5 class="card-title">${x.name}</h5>
            <p class="card-text"> ${x.description}</p>
            <a href="#" class="btn btn-primary">Details</a>
        </div>
    </div>`;
}

export function crearTemplate(listEvents) {
    console.log(listEvents, 'listEvents');
    let template = '';
    if (listEvents) {
        for (const event of listEvents) {
            template += crearCard(event);
        }
        return template;
    }
}

export function imprimirCards(string, id) {
    let container = document.getElementById(id);
    container.innerHTML = string;
}

export const filterBySearchInput = (name, data) => {
    const filteredEvents = filtrarEventos(data);
    const infoEvents = !filteredEvents.length ? data : filteredEvents;
    return infoEvents.filter(evento => {
        return evento.name.toLocaleLowerCase().startsWith(name);
    });
};

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
export const search = events => {
    searchButton.addEventListener('click', event => {
        event.preventDefault();
        const value = searchInput.value.toLocaleLowerCase();
        const data = filterBySearchInput(value, events);
        const textoNoEncontrado = document.getElementById('textoNoEncontrado');
        const estructuraFiltrada = crearTemplate(data);
        imprimirCards(estructuraFiltrada, 'containerCards');
    });
};
