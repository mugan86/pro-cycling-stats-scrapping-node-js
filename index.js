const requestPromise = require("request-promise");
const $ = require("cheerio");
const url = `https://thegamesdb.net/browse.php`;
data = [];
const saveInCSV = require("./lib/save-in-csv").saveInCSV;

// Importamos la función para descargar imágenes
const imageDownloader = require("./lib/img-downloader").download;

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

      data.push({
        id: i + 1,
        game: txt,
        img: image,
      });
      // URL de la imagen que queremos descargar
      const imageUrl = image;

      // Fichero de salida con el directorio al que vamos a guardar
      const filename = "tgdb/".concat(`${i}.png`);

      // Función para descargar las imágenes
      imageDownloader(imageUrl, filename, function () {
        console.log(`${imageUrl} image download!!`);
      });
    });

    saveInCSV('platforms-games', data);
  })
  .catch((error) => {
    ///handling error
    console.log(error);
  });
