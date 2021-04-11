const requestPromise = require("request-promise");
const $ = require("cheerio");
const mainUrl = 'https://es.wikipedia.org/wiki/';
const year = process.argv[2];
const url = `${mainUrl}Draft_de_la_NBA_de_${year}`;
const rankingItems = [];
const saveInCSV = require('./lib/save-in-csv').saveInCSV;
requestPromise(url)
  .then((html) => {
    ///success!
    // console.log(html);
    // '.wikitable.jquery-tablesorter'
    const draft_one = $("table.wikitable.sortable", html)[0];
    const draft_two = $("table.wikitable.sortable tbody tr", html)[1];
    one_tr = $('tbody tr', draft_one);
    one_tr.each((i, el) => {
      console.log($('td:nth-child(1)', el).text().concat(' - ')
      .concat($('td:nth-child(2)', el).text()));
    });
    /*head.each((i, el) => {
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
    saveInCSV('volta-catalunya-2021', rankingItems);*/
  })
  .catch((error) => {
    ///handling error
    console.log(error);
  });
