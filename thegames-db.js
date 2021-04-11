const requestPromise = require("request-promise");
const $ = require("cheerio");
const url = `https://thegamesdb.net/browse.php`;
data = [];
function saveInCSV() {
  const otocsv = require("objects-to-csv");
  const transformed = new otocsv(data);
  try {
    transformed.toDisk("./platforms-games.csv");
    return true;
  } catch (e) {
    return false;
  }
}

requestPromise(url)
  .then((html) => {
    ///success!
    // console.log(html);
    const images = $(".grid-item img", html);
    const platforms = $(".grid-item", html);
    images.each((i, el) => {
        image = $(el).attr("src");
        txt = $(platforms[i]).text();
        txt = txt.replace(/\t/g, "").replace(/\n/g, "");
        
        console.log(txt);
        
        data.push({
            id: i + 1,
            game: txt,
            img: image
        });
    });
    saveInCSV();
  })
  .catch((error) => {
    ///handling error
    console.log(error);
  });

