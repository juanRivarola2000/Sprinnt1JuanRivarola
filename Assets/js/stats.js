const tables = document.getElementById('tables');

const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing';

const getData = () => {
    return fetch(URL_API)
        .then(response => response.json())
        .then(data => {
            return data;
        });
};
