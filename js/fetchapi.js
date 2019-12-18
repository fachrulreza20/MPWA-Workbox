const API_KEY = "e69cf4ab710e4247b11d77a28aadbe98";
const BASE_URL = "https://api.football-data.org/v2/";

//var LEAGUE_ID = ""; // default


const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText)) 
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

function cachesData(LEAGUE_ID) { // ambil data dari caches jika dalam keadaan offline. fetch data dari URL ENDPOINT

    const URL_ENDPOINT = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;

    if ("caches" in window) {
        caches.match(URL_ENDPOINT).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    //console.log("data:"+data);
                    showStanding(data);
                    //showAllTeam();
                })
            }
        })
    }

    fetchAPI(URL_ENDPOINT)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    let standings = "";
    let standingElement =  document.getElementById("klasemen");

  //  console.log(data);

    var x = 0;
    data.standings[0].table.forEach(function (standing) {

        // var teamName = data.standings[0].table[x].team.name;
        // var teamId = data.standings[0].table[x].team.id;



        standings += `
                <tr>
                    <td><a onclick='insertFavoriteTeam("${standing.team.name}","${standing.team.id}","${standing.team.crestUrl}")'><i class="material-icons" style="cursor:pointer">favorite_border</i></a></td>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td><b>${standing.team.name}<b></td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.goalDifference}</td>
                    <td><b>${standing.points}</b></td>
                </tr>
        `;

        x = x + 1;
    });

     standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="responsive-table highlight">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>GD</th>
                            <th>Points</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                
                </div>
    `;
}


  function insertFavoriteTeam(teamName, teamId, teamCrest) {

        const favTeam = {
            teamId: teamId,
            teamName: teamName,
            teamCrest: teamCrest,
        };

        dbInsertTeam(favTeam).then(() => {
            showAllTeam();
            M.toast({html: teamName + ' added to Favorites'}); // toast or alert
        })

}





    function showAllTeam() {

  
        var teamsRow =  document.getElementById("teamsRow");

        dbGetAllTeam().then(teams => {
           var listTeamsInText = "";
           teams.forEach(team => {
               listTeamsInText += `
               <tr>
                 <td><img src="${team.teamCrest.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                 <td>${team.teamName}</td>
                 <td><button id="${team.teamId}" class="removeButton waves-effect waves-light btn">Remove</button></td>
               </tr>
               `;
           });
          //console.log(listTeamsInText);
          if(listTeamsInText != null){
           teamsRow.innerHTML = listTeamsInText;            
          }

           let removeButtons = document.querySelectorAll(".removeButton");
           for(let button of removeButtons) {
               button.addEventListener("click", function (event) {
                   let teamId = event.target.id;
                   dbDeleteTeam(teamId).then(() => {
                    M.toast({html: 'Deleted from Favorites'});
                       showAllTeam();
                   })
               })
           }
       })
    }































