const API_URL = 'https://swapi.co/api/';
const PEOPLE_URL = 'people/:id';
const opts = { crossDomain: true }
const onPeopleResponse = function (person) {
    console.log(`Hola, yo soy ${person.name}`);
}

function obtenerPersonaje(id) {
    return new Promise((resolve, reject) => {
        const url = `${API_URL}${PEOPLE_URL.replace(':id', id)}`;
        $.get(url, opts, function (data) {
            resolve(data);
        }).fail(() => reject(id))
    })
}

function onError(id) {
    console.log(`Sucedió un error al obtener el personaje ${id}`);
}

var ids = [1, 2, 3, 4, 5, 6, 7];
var promesas = ids.map(id => obtenerPersonaje(id));

Promise
    .all(promesas)
    .then(function imprimirPersonajes (personajes) {        
        personajes.forEach(element => {
            onPeopleResponse(element);
        });
    })
    .catch(onError);

