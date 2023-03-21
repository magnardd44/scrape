const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const puppeteer = require("puppeteer");

const UKAurl = "https://www.uka.no/";

const targetURL = "https://newsweb.oslobors.no/search?fromDate=2023-01-03";

const getEvents = ($) => {
  // Get all list items from the unodered list with a class name of 'products'
  const events = $(".news-tile-content");
  console.log(events.length);
  const eventsData = [];
  // The 'each()' method loops over all pokemon list items
  events.each((index, el) => {
    // Get the image, name, and price of each pokemon and create an object
    const event = {};

    // Selector to get the image 'src' value of a pokemon
    event.text = $(el).find("h2").text();
    eventsData.push(event);
  });

  console.log(eventsData);

  /*

  // Create a 'pokemon.json' file in the root directory with the scraped pokemonData
  fs.writeFile("events.json", JSON.stringify(eventsData, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data written to file successfully!");
  });
*/
};

// axios function to fetch HTML Markup from target URL
axios.get(UKAurl).then((response) => {
  const body = response.data;
  const $ = cheerio.load(body); // Load HTML data and initialize cheerio
  getEvents($);
});
