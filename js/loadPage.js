document.addEventListener('DOMContentLoaded', function() {
    let response = fetch("http://localhost:8000/plants")
        .then(res => res.json())
        .then(res => loadPlants(res))
});

function loadPlants(data) {
    const table = document.querySelector("#plants");

    data.forEach(function ({id, name, description, researchers, status}) {
        table.innerHTML += `<div class="card col-xs-12 col-sm-5 col-lg-3 m-1 p-0">
                            <img src="img/rareherb1.jpg" class="card-img-top w-100" alt="Rare herb">
                                <div class="card-body h-auto">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${description}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item px-3 py-1">Исследователи: ${researchers}</li>
            <li class="list-group-item px-3 py-1">Статус: ${status}</li>
        </ul>

        <button type="button" onclick="location.href='herb.html?id=${id}'"class="btn btn-primary my-2 mx-4 p-2" >Подробнее
        </button>
    </div>`;
    });
}
