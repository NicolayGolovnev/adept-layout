document.addEventListener('DOMContentLoaded', function() {
    let params = (new URL(document.location)).searchParams
    thisPlantId = params.get("id")

    if (!!thisPlantId) {
        let response = fetch(`http://localhost:8000/herb/${thisPlantId}`)
        .then(res => res.json())
        .then(res => loadPlant(res))
    }

    let response = fetch("http://localhost:8000/preserves")
        .then(res => res.json())
        .then(res => loadPreserves(res))
});

function loadPreserves(data) {
    const preserves = document.querySelector("#preserves");

    data.forEach(function ({id, name, location}) {
        preserves.innerHTML += `<div class="form-check">
        <input class="form-check-input" type="checkbox" value="${id}" id="preserve${id}">
        <label class="form-check-label" for="preserve${id}">${name}</label>
      </div>`;
    });
}

function loadPlant(plant) {
    console.log(plant)

    if (!!thisPlantId)
        document.getElementById("herbId").value = plant.id;
    document.getElementById("forName").value = plant.name;
    document.getElementById("forDescriprion").value = plant.description;
    document.getElementById("forSearchers").value = plant.researchers;
    document.getElementById("forStatus").value = plant.status;
}

document.addEventListener('submit', function (event) {
    event.preventDefault();

    let id = null
    if (event.submitter.id === 'putButton')
        id = document.getElementById("herbId").value;
    const name = document.getElementById("forName").value;
    const description = document.getElementById("forDescriprion").value;
    const researchers = document.getElementById("forSearchers").value;
    const status = document.getElementById("forStatus").value;
    const preserves = document.getElementsByTagName('input.checkbox:checked');

    let plant = {
        id: id,
        name: name,
        description: description,
        researchers: researchers,
        status: status,
        preserves: preserves
    };
    if (event.submitter.id === 'putButton') {
        let response = fetch("http://localhost:8000/edit-herb", {
            headers: {'Content-type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(plant),
        })
            .then(res => res.text())
            .then(res => console.log(res))
    }
    else if (event.submitter.id === 'addButton') {
        let response = fetch("http://localhost:8000/add-herb", {
            headers: {'Content-type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(plant),
        })
            .then(res => res.text())
            .then(res => console.log(res))
    }

})

document.querySelector("#deleteButton").addEventListener('click', function (event) {
    let response = fetch(`http://localhost:8000/herb/delete/${thisPlantId}`)
            .then(res => res.text())
            .then(res => console.log(res))
})
