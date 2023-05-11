async function fetchData(url, query) {
    const response = await fetch(url, {
      method: "POST",  
      headers: {
        "Content-Type" : "text/plain",
        "Client-ID" : "xsw674khdtlg95mmk12786dh50co8a",
        "Authorization" : "Bearer bqwnfzfqqolnlgsl9ap6wq24pfg8lj",
        "Origin" : "null"
      },
      body: query,
    });
    const json = await response.json();
    return json;
}

function insertPopularGames(){
  let popularGamesCards = document.getElementsByClassName("games-container__cards-container__card");
  let query = "fields name,release_dates.date,hypes; where release_dates.date > 1673084012 & hypes > 80; limit 5;";
  let url = `http://localhost:8080/https://api.igdb.com:443/v4/games/`
  fetchData(url, query).then((response) => {
    console.log(popularGamesCards);
  })


}

insertPopularGames();



