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
  "https://www.alphavantage.co/query?function=OVERVIEW&apikey=FWDP2B8C75PGXARR&symbol=";
const baseQuoteURL =
  "https://www.alphavantage.co/query?apikey=FWDP2B8C75PGXARR&function=GLOBAL_QUOTE&symbol=";

const baseChartURL =
  "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&apikey=FWDP2B8C75PGXARR&symbol=";

let ticker = "";
let companyName = "";
let companyDescription = "";
let exchange = "";
let marketSector = "";
let lastDividendDate = "";
let ratioPE = 0;
let price = 0;
let changePercent = 0;
let changeValue = 0;
let _52WeekHigh = 0;
let _52WeekLow = 0;
let _200DayAvg = 0;
let marketCap = 0;
let lastDividendAmount = 0;
let beta = 0;
let dailyOpen = 0;
let prevClose = 0;
let dailyHigh = 0;
let dailyLow = 0;
let dailyVolume = 0;
let lastTradingDay = "";

let placeholderData = {
  labels: [
    "2019-09-30",
    "2019-10-31",
    "2019-11-29",
    "2020-12-31",
    "2020-01-31",
    "2020-02-28",
    "2020-03-31",
    "2020-04-30",
    "2020-05-29",
    "2020-06-30",
    "2020-07-31",
    "2020-08-28",
  ],
  datasets: [
    {
      label: "",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [
        "54.0100",
        "56.1300",
        "56.6400",
        "53.9800",
        "54.9800",
        "46.1900",
        "35.6100",
        "31.2500",
        "32.1000",
        "34.1800",
        "30.8900",
        "38.8100",
      ],
    },
  ],
};

var ctx = document.getElementById("myChart").getContext("2d");

var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: placeholderData,

  // Configuration options go here
  options: {},
});


function getNYSETickerSymbol(truck) {
  let searchNYSETickerURL = baseNYSETickerURL + truck;
  console.log("this is the URL to search for ticker", searchNYSETickerURL);

  $.ajax({
    url: searchNYSETickerURL,
    method: "GET",
  }).then(function (nyseTickerData) {
    console.log(nyseTickerData);
    ticker = nyseTickerData[0].symbol;
    console.log(ticker);
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
    ticker = nasdaqTickerData[0].symbol;
    console.log(ticker);
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
    companyName = profileData.Name;
    console.log(companyName, "is the company");
    companyDescription = profileData.Description;
    console.log("this is the description", companyDescription);
    exchange = profileData.Exchange;
    console.log("traded on ", exchange);
    marketSector = profileData.Sector;
    console.log("market sector =", marketSector);
    ratioPE = profileData.PERatio;
    console.log("Profits/Earnings ratio = ", ratioPE);
    marketCap = profileData.MarketCapitalization;
    console.log("Market Cap is ", marketCap);
    lastDividendAmount = profileData.DividendPerShare;
    console.log("amount of last dividend", lastDividendAmount);
    lastDividendDate = profileData.DividendDate;
    console.log("last divdend on", lastDividendDate);
    beta = profileData.Beta;
    console.log(companyName + " beta", beta);
    _200DayAvg = profileData["200DayMovingAverage"];
    console.log("200 day average", _200DayAvg);
    _52WeekLow = profileData["52WeekLow"];
    console.log("52 week low: " + _52WeekLow);
    _52WeekHigh = profileData["52WeekHigh"];
    console.log("52 week high: " + _52WeekHigh);
  });
}

function getQuote(hybrid) {
  let searchQuoteURL = baseQuoteURL + hybrid;
  console.log("this is the URL to search for quote", searchQuoteURL);

  $.ajax({
    url: searchQuoteURL,
    method: "GET",
  }).then(function (quoteData) {
    console.log(quoteData);
    price = quoteData["Global Quote"]["05. price"];
    console.log("Price is " + price);
    changePercent = quoteData["Global Quote"]["10. change percent"];
    console.log("change percent", changePercent);
    changeValue = quoteData["Global Quote"]["09. change"];
    console.log("absolute change", changeValue);
    dailyOpen = quoteData["Global Quote"]["02. open"];
    console.log("daily trading open " + dailyOpen);
    prevClose = quoteData["Global Quote"]["08. previous close"];
    console.log("previous trading close");
    dailyHigh = quoteData["Global Quote"]["03. high"];
    console.log("daily trading high", dailyHigh);
    dailyLow = quoteData["Global Quote"]["04. low"];
    console.log("daily trading low", dailyLow);
    dailyVolume = quoteData["Global Quote"]["06. volume"];
    console.log("volume for day" + dailyVolume);
    lastTradingDay = quoteData["Global Quote"]["07. latest trading day"];
    console.log("last trading day", lastTradingDay);
  });
}

function getChartInfo(miniVan) {
  let searchChartURL = baseChartURL + miniVan;

  $.ajax({
    url: searchChartURL,
    method: "GET",
  }).then(function (chartData) {
    console.log(chartData);
    let timeSeries = chartData["Monthly Time Series"];
    console.log("timeSeries", timeSeries);
    let result = [];
    for (var i in timeSeries) {
      result.push([i, timeSeries[i]["4. close"]]);
    }
    var newResult = result.slice(0, 12);
    console.log("result", newResult);


    let labels = [];
    let dataset = [];
    for (var i = 0; i < newResult.length; i++) {
      let chartDate = newResult[i][0];
      let chartPrice = newResult[i][1];
      console.log(chartDate);
      console.log(chartPrice);
      labels.unshift(chartDate);
      dataset.unshift(chartPrice);
    }
    setChartData(chart, labels, dataset);
  });
}

function setChartData(chart, labels, dataset) {
  chart.data.labels = labels;
  chart.data.datasets[0].data = dataset;
  chart.update();
}

function clearChartData(chart) {
  chart.data.labels = [];
  chart.data.datasets.forEach(function (dataset) {
    dataset.data = [];
  });
  chart.update();
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
  getQuote(ticker);
  getChartInfo(ticker);
});
