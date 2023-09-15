const tables = document.getElementById('tables');

const URL_API = 'https://mindhub-xj03.onrender.com/api/amazing';

const getData = () => {
    return fetch(URL_API)
        .then(response => response.json())
        .then(data => {
            console.log(data.data);
            return data;
        });
};

getData()
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
