const fetch = require("node-fetch");

module.exports = async function () {
  dts = await fetch("https://raw.githubusercontent.com/KazeDevID/results/master/quotesanime.json");
  json = await dts.json();
  random = json[Math.floor(Math.random() * json.length)];
  return { status: dts.status, creator: "KazeDevID", result: random };
}.bind();
