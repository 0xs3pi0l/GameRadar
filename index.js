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
    gameCoverUrl = `https:${gameCoverUrl}`;
    popularGamesCards[i].childNodes[1].src = gameCoverUrl;
    popularGamesCards[i].childNodes[3].childNodes[1].innerText = jsonData[i].name;
    popularGamesCards[i].childNodes[3].childNodes[3].innerText = jsonData[i].genres[0].name;
  }

}

async function insertHighestRatedGames(){
  let highestRatedGamesCards = document.getElementsByClassName("highest-rated-OTY-container__cards-container__card");
  let query = "fields name,release_dates.date,genres.name,screenshots.url,total_rating; where release_dates.date > 1673084012; sort total_rating asc; limit 6;";
  let url = `http://localhost:8080/https://api.igdb.com:443/v4/games/`
  let jsonData = await fetchData(url, query);

  for(let i = 0; i < 6; i++){
    gameScreenshotUrl = jsonData[i].screenshots[0].url.replace("t_thumb","t_screenshot_big");
    highestRatedGamesCards[i].childNodes[1].src = "https:" + gameScreenshotUrl;
    highestRatedGamesCards[i].childNodes[3].childNodes[1].innerText = jsonData[i].name;
    highestRatedGamesCards[i].childNodes[3].childNodes[3].innerText = jsonData[i].genres[0].name;
  } 
} 


async function insertLowerContent(){
  let url = `http://localhost:8080/https://api.igdb.com:443/v4/games/`;
  let lowerColumns = document.getElementsByClassName("lower-container-column");
  let gameItemThumbnail;
  let queries = [3];
  queries[0] = "fields name,release_dates.date,release_dates.human,cover.url; where release_dates.date > 1673084012; sort total_rating asc; limit 5;";
  queries[1] = "fields name,release_dates.date,release_dates.human,cover.url; where release_dates.date > 1684059271; sort release_dates.date asc; limit 5;";
  queries[2] = "fields name,release_dates.date,release_dates.human,cover.url,hypes; where release_dates.date > 1684059271; sort hypes asc; limit 5;";
  for(let i = 0; i < 3; i++){
    jsonData = await fetchData(url, queries[i]);
    for(let j = 0; j < 5; j++){
      gameItemThumbnail = jsonData[j].cover.url;
      lowerColumns[i].childNodes[3 + 2*j].childNodes[1].src = "https:" + gameItemThumbnail;
      lowerColumns[i].childNodes[3 + 2*j].childNodes[1].style.width = "5em";
      lowerColumns[i].childNodes[3 + 2*j].childNodes[3].childNodes[1].innerText = jsonData[j].name;
      lowerColumns[i].childNodes[3 + 2*j].childNodes[3].childNodes[3].innerText = jsonData[j].release_dates[0].human;
    }
   
  }
}

insertPopularGames();
insertHighestRatedGames();
insertLowerContent();



