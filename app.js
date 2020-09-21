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

//API Query URLs

//setting base URL for each of teh APIs used in the app
//API Query URLs

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
const baseNewsURL =
  "https://api-v2.intrinio.com/companies/news?api_key=OjY4MGQ0M2E2NDRhMGUwOWIyNjJiNzQwMWY5ZjI3ZWE1&page_size=15";

//setting global variables
//variable to hold exchange ticker symbol
let ticker = "";
//variable to hold company name
let company = "";

//global variable for getProfile AJAX call
let companyName = "";
let companyDescription = "";
let exchange = "";
let marketSector = "";
let ratioPE = 0;
let marketCap = 0;
let lastDividendAmount = 0;
let lastDividendDate = "";
let beta = 0;
let _200DayAvg = 0;
let _52WeekLow = 0;
let _52WeekHigh = 0;

//global variable for getQuote AJAX call
let price = 0;
let changePercent = 0;
let changeValue = 0;
let dailyOpen = 0;
let prevClose = 0;
let dailyHigh = 0;
let dailyLow = 0;
let dailyVolume = 0;
let lastTradingDay = "";

//placeholderData for use in the chart
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
      backgroundColor: "rgb(53, 94, 59)",
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

//vanila JS to grab chart element(provided by chart.js/https://www.chartjs.org/docs/latest/)
var ctx = document.getElementById("myChart").getContext("2d");

//chart function - also provided by chart.js/https://www.chartjs.org/docs/latest/
var chart = new Chart(ctx, {
  // The type of chart we want to create - chart.js comment
  type: "line",

  // The data for our dataset - chart.js comment
  data: placeholderData,

  // Configuration options go here - chart.js comment
  options: {},
});

//function to get NYSE symbol
//get NYSE function
function getNYSETickerSymbol(truck) {
  //adding user input to the end of base URL for API search to get ticker
  let searchNYSETickerURL = baseNYSETickerURL + truck;
  // console.log("this is the URL to search for ticker", searchNYSETickerURL);
  //ajax call to GET information from search URL
  $.ajax({
    url: searchNYSETickerURL,
    method: "GET",
    //JS promise to complete after ajax call comes back
  }).then(function (nyseTickerData) {
    // console.log(nyseTickerData);
    //setting ticker variable for use in app
    ticker = nyseTickerData[0].symbol;
    // console.log(ticker);
    //putting the space back into company and putting it to upper case letters for display on screen
    company = company.split("_").join(" ").toUpperCase();
    $("#nyse-ticker")
      .text(company + "'s ticker symbol: " + ticker)
      .css("display", "block")
      .css("background", "red");

    getProfile(ticker);
    getQuote(ticker);
    getChartInfo(ticker);
    getStockNews();
  });
}

//get NASDAQ function
function getNASDAQTickerSymbol(truck) {
  //adding user input to end of base URL for API search to get ticker
  let searchNASDAQTickerURL = baseNASDAQTickerURL + truck;
  // console.log("this is the URL to search for ticker", searchNASDAQTickerURL);
  //ajax call to GET information from search URL
  $.ajax({
    url: searchNASDAQTickerURL,
    method: "GET",
    //JS promise to complete after ajax call comes back
  }).then(function (nasdaqTickerData) {
    // console.log(nasdaqTickerData);
    //setting ticker variable for use in app
    ticker = nasdaqTickerData[0].symbol;
    // console.log(ticker);
    //putting the space back into company and putting it to upper case letters for display on screen
    company = company.split("_").join(" ").toUpperCase();
    $("#nasdaq-ticker")
      .text(company + "'s ticker symbol: " + ticker)
      .css("display", "block")
      .css("background", "red");

    getProfile(ticker);
    getQuote(ticker);
    getChartInfo(ticker);
    getStockNews();
  });
}

//get company profile function
function getProfile(car) {
  clearData();

  //setting search URL based on user input
  let searchProfileURL = baseProfileURL + car;
  // console.log("this is the URL to search for profile", searchProfileURL);
  //ajax call to GET company profile from search URL
  $.ajax({
    url: searchProfileURL,
    method: "GET",
    //JS promise to complete after ajax call comes back
  }).then(function (profileData) {
    //pulling values out of the returned object and putting them in global variables to populate the front-end elements
    // console.log(profileData);
    companyName = profileData.Name;
    // console.log(companyName, "is the company");
    companyDescription = profileData.Description;
    // console.log("this is the description", companyDescription);
    exchange = profileData.Exchange;
    // console.log("traded on ", exchange);
    marketSector = profileData.Sector;
    // console.log("market sector =", marketSector);
    ratioPE = profileData.PERatio;
    // console.log("Profits/Earnings ratio = ", ratioPE);
    marketCap = profileData.MarketCapitalization;
    marketCap = parseInt(marketCap).toLocaleString();
    // console.log("Market Cap is ", marketCap);
    lastDividendAmount = profileData.DividendPerShare;
    // console.log("amount of last dividend", lastDividendAmount);
    lastDividendDate = profileData.DividendDate;
    // console.log("last divdend on", lastDividendDate);
    beta = profileData.Beta;
    // console.log(companyName + " beta", beta);
    _200DayAvg = profileData["200DayMovingAverage"];
    // console.log("200 day average", _200DayAvg);
    _52WeekLow = profileData["52WeekLow"];
    // console.log("52 week low: " + _52WeekLow);
    _52WeekHigh = profileData["52WeekHigh"];
    // console.log("52 week high: " + _52WeekHigh);
    //putting the company description in the div
    let companyDiv = $("#company-profile");
    companyDiv.append("<p>", companyDescription);
    //adding information from this ajax call to front-end
    $("#left-ul").append(`<li>Company Name: ${companyName}</li>`);
    $("#right-ul").append(`<li>Market Sector: ${marketSector}</li>`);
    $("#right-ul").append(`<li>Exchange: ${exchange.toUpperCase()}</li>`);
    $("#right-ul").append(`<li>Market Capitalization: $${marketCap}</li>`);
    $("#right-ul").append(`<li>BETA: ${beta}</li>`);
    $("#right-ul").append(`<li>52 week low: $${_52WeekLow}</li>`);
    $("#right-ul").append(`<li>52 week high: $${_52WeekHigh}</li>`);

    // we don't put $ sign if no dividend
    if (isNaN()) {
      $("#right-ul").append(
        `<li>Last dividend amount per share: ${lastDividendAmount}</li>`
      );
    } else {
      $("#right-ul").append(
        `<li>Last dividend amount per share: $${lastDividendAmount}</li>`
      );
    }

    $("#right-ul").append(`<li>Last dividend date: ${lastDividendDate}</li>`);
  });
}

//get quote function
//function to get current price and other information for selected stock
function getQuote(hybrid) {
  //setting search URL based on user input
  let searchQuoteURL = baseQuoteURL + hybrid;
  // console.log("this is the URL to search for quote", searchQuoteURL);
  //ajax call to GET information from search URL to populate needed information
  $.ajax({
    url: searchQuoteURL,
    method: "GET",
    //JS promise to complete after ajax call returns
  }).then(function (quoteData) {
    //pulling values out of the returned object and putting them in global variables to populate the front-end elements
    // console.log(quoteData);
    price = quoteData["Global Quote"]["05. price"];
    price = parseFloat(price).toFixed(2);
    // console.log("Price is " + price);
    changePercent = quoteData["Global Quote"]["10. change percent"];
    changePercent = parseFloat(changePercent).toFixed(2);
    // console.log("change percent", changePercent);
    changeValue = quoteData["Global Quote"]["09. change"];
    changeValue = parseFloat(changeValue).toFixed(2);
    // console.log("absolute change", changeValue);
    dailyOpen = quoteData["Global Quote"]["02. open"];
    // console.log("daily trading open " + dailyOpen);
    prevClose = quoteData["Global Quote"]["08. previous close"];
    // console.log("previous trading close");
    dailyHigh = quoteData["Global Quote"]["03. high"];
    dailyHigh = parseFloat(dailyHigh).toFixed(2);
    // console.log("daily trading high", dailyHigh);
    dailyLow = quoteData["Global Quote"]["04. low"];
    dailyLow = parseFloat(dailyLow).toFixed(2);
    // console.log("daily trading low", dailyLow);
    dailyVolume = quoteData["Global Quote"]["06. volume"];
    dailyVolume = parseInt(dailyVolume).toLocaleString();
    // console.log("volume for day" + dailyVolume);
    lastTradingDay = quoteData["Global Quote"]["07. latest trading day"];
    // console.log("last trading day", lastTradingDay);

    //adding information from this ajax call to front-end

    $("#left-ul").append(`<li> Price: $${price}</li>`);

    // change of color green/red depending on the move
    $("#left-ul").append(
      `<li>Change: <span class='changeOfColor'>${changeValue}</span></li>`
    );
    $("#left-ul").append(
      `<li>Change: <span class='changeOfColor'>${changePercent}</span></li>`
    );

    if (changeValue < 0) {
      console.log("going down");
      $(".changeOfColor").attr("style", "color: red");
    } else {
      console.log("up");
      $(".changeOfColor").attr("style", "color: green");
    }

    $("#left-ul").append(`<li>Daily low: $${dailyLow}</li>`);
    $("#left-ul").append(`<li>Daily high: $${dailyHigh}</li>`);
    $("#left-ul").append(`<li>Daily volume: ${dailyVolume}</li>`);
    $("#left-ul").append(`<li>Last trading date: ${lastTradingDay}</li>`);
  });
}

//function to get new chart data based on user input
//get chart info function
function getChartInfo(miniVan) {
  //setting search URL based on user input
  let searchChartURL = baseChartURL + miniVan;
  //ajax call to GET information from API
  $.ajax({
    url: searchChartURL,
    method: "GET",
    //JS promise to complete after AJAX call comes back
  }).then(function (chartData) {
    // console.log(chartData);
    //taking the returned object and pulling out the needed values into an object
    let timeSeries = chartData["Monthly Time Series"];
    // console.log("timeSeries", timeSeries);
    //setting an empty array to hold the results of the for loop below
    let result = [];
    //using for in to create an array of keys and values in the empy array
    for (var i in timeSeries) {
      result.push([i, timeSeries[i]["4. close"]]);
    }
    //using the slice method to make the array only the values for the past 12 months
    var newResult = result.slice(0, 12);
    // console.log("result", newResult);

    //creating empty arrays to populate information into placeholderData with new information for company selected through user input
    let labels = [];
    let dataset = [];
    //for loop to take data from the 12 input long array and put it into the appropriate array for x and y axis of chart
    for (var i = 0; i < newResult.length; i++) {
      //taking object array key(date) and putting into the x axis
      let chartDate = newResult[i][0];
      //taking object array value(price) and putting into the y axis
      let chartPrice = newResult[i][1];
      // console.log(chartDate);
      // console.log(chartPrice);
      //adding each to the begining of the array to invert the order so the chart goes from oldest date to newest
      labels.unshift(chartDate);
      dataset.unshift(chartPrice);
    }
    //running the funciton to update chart
    setChartData(chart, labels, dataset);
  });
}

//funciton to update chart - big ups to Tariq for helping us with this aspect
function setChartData(chart, labels, dataset) {
  //adding the dates to the x axis
  chart.data.labels = labels;
  //adding the price to the y axis
  chart.data.datasets[0].data = dataset;
  //setting the chart label to the stock ticker searched
  chart.data.datasets[0].label = ticker.toUpperCase();
  // console.log("Chart Title right here", chartTitle);
  chart.update();
}

//function to clear chart - also with Tariq's help
function clearChartData(chart) {
  chart.data.labels = [];
  chart.data.datasets.forEach(function (dataset) {
    dataset.data = [];
  });
  chart.data.datasets[0].label = "";
  chart.update();
}

//function to get latest stock market news
function getStockNews() {
  //ajax call to GET needed information from base URL(also search URL in this instance)
  $.ajax({
    url: baseNewsURL,
    method: "GET",
    //JS promise to complete after ajax call comes back
  }).then(function (newsData) {
    // console.log(newsData);
    //using jQuery to get dummy div on prototype html
    let divStockNews = $("#stock-news");
    //adding an hr to the top of the display
    divStockNews.append("<hr>");
    //for loop to populate html with current stock news
    for (var i = 0; i < newsData.news.length; i++) {
      //setting variable to contain publication dat
      let publicationDate = newsData.news[i].publication_date;
      // console.log(publicationDate);
      //variable holding a sliced form of the publication date
      let publicationDate1 = publicationDate.slice(0, 10);
      //variable holding the final publication date and a ":" to display on screen
      let newPublicationDate = publicationDate1 + ": ";
      //variable to hold article title
      let publicationTitle = newsData.news[i].title;
      // console.log(publicationTitle);
      //variable to hold URL link to article
      let publicationURL = newsData.news[i].url;
      // console.log(publicationURL);
      //jQuery appending title, date, and publication to dummy html elements to see how display looks
      divStockNews.append(`<p id=publication-date>${newPublicationDate}</p>`);
      divStockNews.append(`<p id=pubication-title>${publicationTitle}</p>`);
      divStockNews.append(
        `<a id=publication-URL href=${publicationURL}>${publicationURL}</a>`
      );
      //adding an hr below each entry for style.
      divStockNews.append("<hr>");
    }
  });
}

function clearData() {
  $("#company-info").empty();
  $("#left-ul").empty();
  $("#right-ul").empty();
  $(".changeOfColor").empty();
  $("#company-profile").empty();
  $("#stock-news").empty();
}

//click function to search for NYSE stock symbols
//NYSE click event
$("#nyse-ticker-searchBtn").on("click", function () {
  //preventing default action of button
  event.preventDefault();

  //setting company to the value input by the user
  company = $("#nyse-ticker-input").val().trim();
  //splitting company at any spaces and joining back with an underscore because URL will not accept spaces
  company = company.split(" ").join("_");
  console.log(company);
  //sending company to search for ticker symbol
  getNYSETickerSymbol(company);
  $("#nyse-ticker-input").val("");
  $("#nyse-ticker-input").attr(
    "placeholder",
    "Enter company traded on NYSE..."
  );
});

//click function to search for NASDAQ stock symbols
//NASDAQ click event
$("#nasdaq-ticker-searchBtn").on("click", function () {
  //preventing default action of button
  event.preventDefault();
  //setting company to the value input by the user
  company = $("#nasdaq-ticker-input").val().trim();
  //splitting company at any spaces and joining back with an underscore because URL will not accept spaces
  company = company.split(" ").join("_");
  // console.log(company);
  //sending company to search for ticker symbol
  getNASDAQTickerSymbol(company);
  $("#nasdaq-ticker-input").val("");
  $("#nasdaq-ticker-input").attr(
    "placeholder",
    "Enter company traded on NASDAQ..."
  );
});

//clear search button
$("#clear-search-btn").on("click", () => {
  $("#company-profile").empty();
  clearChartData(chart);
  $("#right-ul").empty();
  $("#left-ul").empty();
  $("#stock-news").empty();
  $("#nyse-ticker").hide();
  $("#nasdaq-ticker").hide();
});
//click function to search for user input stock symbol
//company search click event
// $("#stock-profile-searchBtn").on("click", function () {
//preventing defautl action of button
// event.preventDefault();
//setting ticker to the value input bgy the user
// ticker = $("#stock-profile-input").val().trim();
//splitting ticker at any spaces and joining back with an underscore because URL will not accept spaces
// ticker = ticker.split(" ").join("_");
//running function to get profile information of user selected company
// getProfile(ticker);
//running function to get current price information of user selected company
// getQuote(ticker);
//running function to update chart with historical price/date information to update chart to user selected company
// getChartInfo(ticker);
//getting latest stock news and displaying on screen
//   getStockNews();
// });
