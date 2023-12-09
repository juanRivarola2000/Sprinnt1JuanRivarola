import { crearTemplate, insertarCategorias, filtrarEventos, imprimirCards, search, filtroDeCard } from '../js/modules/fuctions.js';

const ContenedorCards = document.getElementById('containerCards');

const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing';

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
