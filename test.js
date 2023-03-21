const fs = require("fs");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const targetURL = "https://newsweb.oslobors.no/";

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(targetURL);
  await page.waitForSelector("table");

  const html = await page.content();
  const $ = cheerio.load(html);

  const allEvents = [];

  $("table tr").each((i, elem) => {
    const event = {};

    event.time = $(elem).find(".kzwcbj").text();
    event.utst_id = $(elem).find(".hlFPFz").text();
    event.title = $(elem).find(".jzDNAp span span:first").text();
    event.vedlegg = $(elem).find(".edoIV").text();
    event.kategori = $(elem).find(".ePJIxm span span:first").text();

    allEvents.push(event);
  });

  await browser.close();

  allEvents.shift();

  console.log(allEvents);

  /*

  fs.writeFile("testEvents.json", JSON.stringify(allEvents, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data written to file successfully!");
  });


  */
}

run();
