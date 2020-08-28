//Zomato API key
//e837a876e70699ddba470278b5ab35b7
//e837a876e70699ddba470278b5ab35b7

//YELP Client ID
//N1hTylJpErfM0PTSMXNZtQ

//YELP API KEY
//Vd1zpIoR0d0Fea-QPLkT3FL-9GClEngVl7jPfju1Qkkwq3LmlZg6gurvh0Vk8l61lCJGI0Lmes1CeREx3g3K3qWgd38cDZt66-Zfjk9CkEuuuigua-s8cNLIG1pFX3Yx

//good reads
// key: pqWEnSvlig83ogoJrLqCKA
// secret: kcvZL03CJqWGoCdWStrFixB7Z7LEYT6MCdEHDF8riA

//NASA API key
//y5Q4wPs4Q0fycf0rnmMhEJTuJc9e5yHUQEm4FtJz

//ALPHA VANTAGE API key
//FWDP2B8C75PGXARR

//financialmodelingprep.com API key
//ee6dfd910b7c250ad88b85d3981e27a3

const baseNYSETickerURL =
  "https://financialmodelingprep.com/api/v3/search?apikey=ee6dfd910b7c250ad88b85d3981e27a3&limit=10&exchange=NYSE&query=";
const baseNASDAQTickerURL =
  "https://financialmodelingprep.com/api/v3/search?apikey=ee6dfd910b7c250ad88b85d3981e27a3&limit=10&exchange=NASDAQ&query=";
const baseProfileURL =
  "https://www.alphavantage.co/query?function=OVERVIEW&apikey=ee6dfd910b7c250ad88b85d3981e27a3&symbol=";
const baseChartURL =
  "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&apikey=ee6dfd910b7c250ad88b85d3981e27a3&symbol=";

let ticker = "";

function getNYSETickerSymbol(truck) {
  let searchNYSETickerURL = baseNYSETickerURL + truck;
  console.log("this is the URL to search for ticker", searchNYSETickerURL);

  $.ajax({
    url: searchNYSETickerURL,
    method: "GET",
  }).then(function (nyseTickerData) {
    console.log(nyseTickerData);
  });
}

function getNASDAQTickerSymbol(truck) {
  let searchNASDAQTickerURL = baseNASDAQTickerURL + truck;
  console.log("this is the URL to search for ticker", searchNASDAQTickerURL);

  $.ajax({
    url: searchNASDAQTickerURL,
    method: "GET",
  }).then(function (nasdaqTickerData) {
    console.log(nasdaqTickerData);
  });
}

function getProfile(car) {
  let searchProfileURL = baseProfileURL + car;
  console.log("this is the URL to search for profile", searchProfileURL);

  $.ajax({
    url: searchProfileURL,
    method: "GET",
  }).then(function (profileData) {
    console.log(profileData);
  });
}

function getChartInfo(miniVan) {
  let searchChartURL = baseChartURL + miniVan;

  $.ajax({
    url: searchChartURL,
    method: "GET",
  }).then(function (chartData) {
    console.log(chartData);
  });
}

$("#nyse-ticker-searchBtn").on("click", function () {
  event.preventDefault();
  ticker = $("#nyse-ticker-input").val().trim();
  ticker = ticker.split(" ").join("_");
  getNYSETickerSymbol(ticker);
});

$("#nasdaq-ticker-searchBtn").on("click", function () {
  event.preventDefault();
  ticker = $("#nasdaq-ticker-input").val().trim();
  ticker = ticker.split(" ").join("_");
  getNASDAQTickerSymbol(ticker);
});

$("#stock-profile-searchBtn").on("click", function () {
  event.preventDefault();
  ticker = $("#stock-profile-input").val().trim();
  ticker - ticker.split(" ").join("_");
  getProfile(ticker);
  getChartInfo(ticker);
});
