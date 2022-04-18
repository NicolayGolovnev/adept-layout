document.addEventListener('DOMContentLoaded', function() {
    let params = (new URL(document.location)).searchParams
    thisPlantId = params.get("id")

    if (!!thisPlantId) {
        let response = fetch(`http://localhost:8000/herb/${thisPlantId}`)
        .then(res => res.json())
        .then(res => loadPlant(res['plant'], res['preserves']))
    }

});

function loadPlant(plant, preserves) {
    document.querySelector("#name").textContent = plant.name
    document.querySelector("#description").textContent = plant.description
    document.querySelector("#researchers").textContent = 'Исследователи: ' + plant.researchers
    document.querySelector("#status").textContent = 'Статус: ' + plant.status
    document.querySelector("#preserves").textContent = 'Находится в заповедниках: ' + preserves['get_preserves']
}
