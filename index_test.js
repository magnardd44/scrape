const http = require("http");

const request = require("request");
const cheerio = require("cheerio");

// Set the URL you want to scrape
//const url = "https://newsweb.oslobors.no/";
const url =
  "https://newsweb.oslobors.no/search?category=&issuer=&fromDate=2023-01-03&toDate=&market=&messageTitle=";

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  // Make the request to the URL
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      // Load the HTML into cheerio
      const $ = cheerio.load(html);

      // Find all the table rows
      const rows = $("table tr");

      console.log(rows);
      // Check if there are any new rows
      // You'll have to implement this part yourself
      // You can use the rows variable to access the table rows and check their timestamps
      // to see if they were added within the last 10 minutes
    }
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
