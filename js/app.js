const searchLoad = () => {
    document.getElementById('loadContainer').style.display = 'none'
    const searchInput = document.getElementById('searchInput')
    const searchText = searchInput.value
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayClub(data.teams))
    searchInput.value = ''
}

const displayClub = teams => {
    // console.log(teams)
    const resultContainer =document.getElementById('resultContainer')
    resultContainer.textContent =''
    teams.forEach(team => {
        const searchResultDiv = document.createElement('div')
        searchResultDiv.classList.add('col')
        if(team.strDescriptionEN !='') {
            
            searchResultDiv.innerHTML = `
        <div class="card h-100" onclick="teamDetails(${team.idTeam})" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${team.strTeam}</h5>
            <p class="card-text">${team.strDescriptionEN.slice(0,100)}</p>
        </div>
    </div>
        `
        }
        resultContainer.appendChild(searchResultDiv)
    });

}

const teamDetails = teamID =>{
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamID}`
    console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(data =>displayModal(data.teams[0]))
}

const displayModal = teamName =>{
    document.getElementById('exampleModalLabel').innerText = teamName.strTeam
    document.getElementById('modal-body').innerHTML = `
    <img width="70%" src="${teamName.strTeamBadge}" alt="">
    <p>${teamName.strDescriptionEN}</p>
    `
}


const loadTeam = () =>{
    const url = `https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?s=Soccer&c=Spain`
    fetch(url)
    .then(res=> res.json())
    .then(data => displayloadData(data.teams))
}



const pageLoad = () => {
    const preLoader = document.getElementById('loadPage')
    preLoader.style.display = 'none'

    const url = `https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?s=Soccer&c=Spain`
    fetch(url)
    .then(res=> res.json())
    .then(data => displayloadHome(data.teams))
}

const displayloadHome = teams => {
    const loadContainer = document.getElementById('loadContainer')
    teams.forEach(team => {
        const loadResulDiv = document.createElement('div')
        loadResulDiv.classList.add('col')
        if(team.strDescriptionEN !='') {
            
            loadResulDiv.innerHTML = `
        <div class="card h-100" onclick="teamDetails(${team.idTeam})" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${team.strTeam}</h5>
            <p class="card-text">${team.strDescriptionEN.slice(0,100)}</p>
        </div>
    </div>
        `
        }
        loadContainer.appendChild(loadResulDiv)
    });
}