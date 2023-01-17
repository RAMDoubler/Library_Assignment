var firstNameList = getColumn("Nobel Prize Winners 1901-2016", "First name");

var lastNameList = getColumn("Nobel Prize Winners 1901-2016", "Last name");

var categoryList = getColumn("Nobel Prize Winners 1901-2016", "Category");

var countriesList = getColumn("Nobel Prize Winners 1901-2016", "Country of birth");

var filteredCategoriesList = [];

var filteredCountriesList = [];

var counter;

var counterList = [];

onEvent("nobelprizeButton", "click", function () {
    setScreen("screen2");

});


onEvent("nobelprizebutton2", "click", function() {

setScreen("screen4");

var userName = getText("nameInput");

setText("calculatingTextBox", "Calculating...");
//filters the countries list by only recording countries that have won a nobel prize in a subject that the user has chosen
var userCategory = getText("interestdropDown");
    for (var t=0;t<categoryList.length;t++) {
        var categoryPlaceholder = categoryList[t];
        var countryPlaceholder = countriesList[t];

            if (categoryPlaceholder == userCategory) {
                appendItem(filteredCategoriesList, categoryPlaceholder);
                appendItem(filteredCountriesList, countryPlaceholder);
                appendItem(counterList, t);
            }
    }
    
    
for (var j=0;j<countriesList.length;j++) {
  
}
  //uses filtered countries list to find if the user's country is in the list
  var userCountry = getText("countryOfBirthInput");
    for (var i=0;i<countriesList.length;i++) {
      var filtCountryPlaceholder = filteredCountriesList[i];
      var counterPlaceholder = counterList[i];
        if (filtCountryPlaceholder == userCountry) {
          counter = counterPlaceholder;
          break;
          //if the user is not in the filtered countries list then it will pump out a random nobel prize winner
        }else if (filtCountryPlaceholder == undefined) {
          var random = randomNumber(0, counterList.length-1);
          counter = counterList[random];
        }
    }
    
  winner();
  
  setScreen("screen3");
  
  //takes all of the important information to create the nobel prize winner that matches the user
  function winner() {
    setText("outputText", "Congrats " + userName +" you are most similar to "+firstNameList[counter]+" "+lastNameList[counter]);
  }
});
