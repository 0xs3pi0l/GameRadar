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

async function insertPopularGames(){
  let popularGamesCards = document.getElementsByClassName("games-container__cards-container__card");
  let query = "fields name,release_dates.date,hypes,genres.name,cover.url; where release_dates.date > 1672541102 & hypes > 80; limit 5;";
  let url = `http://localhost:8080/https://api.igdb.com:443/v4/games/`
  let jsonData = await fetchData(url, query);
  let gameCoverUrl;
  
  for(let i = 0; i < 5; i++){
    gameCoverUrl = jsonData[i].cover.url.replace("t_thumb", "t_cover_big");
    gameCoverUrl = `https:${gameCoverUrl}`
    popularGamesCards[i].childNodes[1].src = gameCoverUrl;
    popularGamesCards[i].childNodes[3].childNodes[1].innerText = jsonData[i].name;
    popularGamesCards[i].childNodes[3].childNodes[3].innerText = jsonData[i].genres[0].name;
  }

}

async function insertHighestRatedGames(){
  let highestRatedGamesCards = document.getElementsByClassName("highest-rated-container__cards-container__card");
  let query = "fields name,release_dates.date,follows,genres.name,cover.url,total_rating; where release_dates.date > 1673084012; sort total_rating desc ; limit 6;";
  let url = `http://localhost:8080/https://api.igdb.com:443/v4/games/`
  let jsonData = await fetchData(url, query);
  let gameCoverUrl;

  for(let i = 0; i < 6; i++){

  }
}

insertPopularGames();



