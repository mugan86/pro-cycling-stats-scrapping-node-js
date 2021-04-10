const requestPromise = require("request-promise");
const $ = require("cheerio");
const mainUrl = 'https://www.procyclingstats.com/';
const url = `${mainUrl}race/volta-a-catalunya/2021/gc`;
const rankingItems = [];
function saveInCSV() {
    const otocsv = require('objects-to-csv');
    const transformed = new otocsv(rankingItems);
    try {
      transformed.toDisk('./volta-catalunya-2021.csv');
      return true;
    } catch(e) {
      return false;
    }
    
  }
requestPromise(url)
  .then((html) => {
    ///success!
    // console.log(html);
    const head = $(".result-cont[data-id=255575] .basic thead tr th", html);
    head.each((i, el) => {
      // RECORREMOS TODOS LOS NODOS QUE HEMOS ALMACENADO

      if (i > -1 && i <= 4 && i % 2 == 0) {
        // console.log($(el).text());
        // console.log(i);
      }
    });
    const riders = $(".result-cont[data-id=255575] .basic tbody tr", html);
    riders.each((i, el) => {
        const rank = $('td:nth-child(1)', el).text();
        const rider = $('td:nth-child(3) a', el).text();
        const team = $('td:nth-child(3) .riderteam', el).text();
        const url = $('td:nth-child(3) a', el).attr("href");
        const riderUrl = `${mainUrl}${url}`;
        console.log(rider, team, riderUrl);
        rankingItems.push({
            position: rank,
            name: rider,
            teamName: team,
            details: riderUrl
        });
    });
    saveInCSV();
  })
  .catch((error) => {
    ///handling error
    console.log(error);
  });
