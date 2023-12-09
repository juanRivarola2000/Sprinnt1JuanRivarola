const tables = document.getElementById('tables');
const mayorAsistencia = document.getElementById('mayorAsistencia');
const menorAsistencia = document.getElementById('menorAsistencia');
const mayorCapacidad = document.getElementById('mayorCapacidad');
const tabla1 = document.getElementById('tabla1');
const tableUpcomingEventsStatistics = document.getElementById('upcomingEventsStatistics');
const tdCategories = document.getElementById('categories');
const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing';

const getData = () => {
    const response = fetch(URL_API)
        .then(response => response.json())
        .then(data => data);
    return response;
};

const dataEvents = await getData();

const insertarFilas = (id, fila) => {
    id.textContent = fila;
};

const eventosPorcentaje = [];
const calcularPorcentaje = eventos => {
    eventos.forEach((evento, index) => {
        if (evento.assistance) {
            const porcentaje = (evento.assistance / evento.capacity) * 100;
            eventosPorcentaje.push({ name: evento.name, porcentaje_asistencia: porcentaje, capacity: evento.capacity });
        } else if (evento.capacity) {
            eventosPorcentaje.push({ name: evento.name, capacity: evento.capacity });
        }
    });
};
calcularPorcentaje(dataEvents.events);

const encontrarEventoConMayorPorcentaje = eventos => {
    let eventoMayorPorcentaje = eventos[0];

    eventos.forEach(evento => {
        if (evento.porcentaje_asistencia > eventoMayorPorcentaje.porcentaje_asistencia) {
            eventoMayorPorcentaje = evento;
        }
    });

    return eventoMayorPorcentaje;
};

const eventoMayorPorcentaje = encontrarEventoConMayorPorcentaje(eventosPorcentaje);

insertarFilas(mayorAsistencia, `${eventoMayorPorcentaje.name} ${eventoMayorPorcentaje.porcentaje_asistencia} %`);

const encontrarEventoConMenorPorcentaje = eventos => {
    let eventoMenorPorcentaje = eventos[0];

    eventos.forEach(evento => {
        if (evento.porcentaje_asistencia < eventoMenorPorcentaje.porcentaje_asistencia) {
            eventoMenorPorcentaje = evento;
        }
    });

    return eventoMenorPorcentaje;
};

const eventoMenorPorcentaje = encontrarEventoConMenorPorcentaje(eventosPorcentaje);

insertarFilas(menorAsistencia, `${eventoMenorPorcentaje.name} ${eventoMenorPorcentaje.porcentaje_asistencia} %`);

function encontrarEventoConMayorCapacidad(eventos) {
    let eventoMayorCapacidad = eventos[0];

    eventos.forEach(evento => {
        if (evento.capacity && evento.capacity > eventoMayorCapacidad.capacity) {
            eventoMayorCapacidad = evento;
        }
    });

    return eventoMayorCapacidad;
}

const eventoMayorCapacidad = encontrarEventoConMayorCapacidad(eventosPorcentaje);

insertarFilas(mayorCapacidad, `${eventoMayorCapacidad.name} ${eventoMayorCapacidad.capacity} `);

const insertarFilasTabla = (tableId, text) => {
    const td = document.createElement('td');
    td.textContent = text;
    tableId.appendChild(td);
};

function processEvents(events) {
    const categories = {};

    events.forEach(event => {
        if (event.estimate) {
            if (!categories[event.category]) {
                categories[event.category] = {
                    category: event.category,
                    totalEvents: 0,
                    totalAttendancePercentage: 0,
                    ganancia: 0,
                };
            }

            const attendance = event.assistance || event.estimate || 0;
            const attendancePercentage = (attendance / event.capacity) * 100;

            categories[event.category].ganancia += event.price * attendance;
            categories[event.category].totalAttendancePercentage += attendancePercentage;
            categories[event.category].totalEvents += 1;
        }
    });

    const result = Object.values(categories).map(category => ({
        category: category.category,
        ganancia: `$${category.ganancia.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`,
        percentAttendance: (category.totalAttendancePercentage / category.totalEvents).toFixed(2) + '%',
    }));

    return result;
}

const results = processEvents(dataEvents.events);
const tableBody = document.getElementById('tableBody');

results.forEach(result => {
    const row = document.createElement('tr');

    const categoryCell = document.createElement('td');
    categoryCell.textContent = result.category;
    row.appendChild(categoryCell);

    const revenueCell = document.createElement('td');
    revenueCell.textContent = result.ganancia;
    row.appendChild(revenueCell);

    const attendanceCell = document.createElement('td');
    attendanceCell.textContent = result.percentAttendance;
    row.appendChild(attendanceCell);

    tableBody.appendChild(row);
});

function processPastEvents(events) {
    const categories = {};

    events.forEach(event => {
        if (event.assistance) {
            if (!categories[event.category]) {
                categories[event.category] = {
                    category: event.category,
                    totalEvents: 0,
                    totalAttendancePercentage: 0,
                    ganancia: 0,
                };
            }

            const attendance = event.assistance || event.estimate || 0;
            const attendancePercentage = (attendance / event.capacity) * 100;

            categories[event.category].ganancia += event.price * attendance;
            categories[event.category].totalAttendancePercentage += attendancePercentage;
            categories[event.category].totalEvents += 1;
        }
    });

    const result = Object.values(categories).map(category => ({
        category: category.category,
        ganancia: `$${category.ganancia.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`,
        percentAttendance: (category.totalAttendancePercentage / category.totalEvents).toFixed(2) + '%',
    }));

    return result;
}

const resultadosPastEvents = processPastEvents(dataEvents.events);
const tableBodyPastEvent = document.getElementById('tableBodyPastEvents');

resultadosPastEvents.forEach(result => {
    const row = document.createElement('tr');

    const categoryCell = document.createElement('td');
    categoryCell.textContent = result.category;
    row.appendChild(categoryCell);

    const revenueCell = document.createElement('td');
    revenueCell.textContent = result.ganancia;
    row.appendChild(revenueCell);

    const attendanceCell = document.createElement('td');
    attendanceCell.textContent = result.percentAttendance;
    row.appendChild(attendanceCell);

    tableBodyPastEvents.appendChild(row);
});
