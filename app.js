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

const baseTickerURL = "https://financialmodelingprep.com/api/v3/search?apikey=ee6dfd910b7c250ad88b85d3981e27a3&limit=10&exchange=NYSE&query="
let ticker = "";

function getTickerSymbol(truck) {
    let searchTickerURL = baseTickerURL + truck;
    console.log("this is the ULR to search for ticker", searchTickerURL);

    $.ajax({
        url: searchTickerURL,
        method:  "GET"
    }).then(function(tickerData) {
        console.log(tickerData);
    });
}






$("#ticker-searchBtn").on("click", function(){
event.preventDefault()
ticker = $("#ticker-input").val().trim()
ticker = ticker.split(" ").join("_")
getTickerSymbol(ticker);
})