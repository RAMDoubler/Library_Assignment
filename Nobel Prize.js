var firstNameList = getColumn("Nobel Prize Winners 1901-2016", "First name");

var lastNameList = getColumn("Nobel Prize Winners 1901-2016", "Last name");

var categoryList = getColumn("Nobel Prize Winners 1901-2016", "Category");

var nobelCitiesList = getColumn("Nobel Prize Winners 1901-2016", "City of birth");
    var filteredCitiesList = [];
var citiesList = getColumn("City Coordinates", "city");

var userCoordinates = [];

var  longitudeList = getColumn("City Coordinates", "lng");
    var filteredLongitudeList = [];
var latitudeList = getColumn("City Coordinates", "lat");
    var filteredLatitudeList = [];

var rowCounter;

var filteredCitiesPlaceholder;

onEvent("nobelprizeButton", "click", function () {
    setScreen("screen2");

});


onEvent("nobelprizebutton2", "click", function() {

setScreen("screen4");

var userName = getText("nameInput");

setText("calculatingTextBox", "Calculating...");
//creates filtered cities list
var userCategory = getText("interestdropDown");
    for (var t=0;t<categoryList.length;t++) {
        var citiesPlaceholder = nobelCitiesList[t];
        var categoryPlaceholder = categoryList[t];

            if (categoryPlaceholder == userCategory) {
                appendItem(filteredCitiesList, citiesPlaceholder);
                
            }
    }

//creates the user's coordinates
var userLocation = getText("cityOfBirthInput");
    for (var j=0;j<citiesList.length;j++) {
        cityPlaceholder = citiesList[j];
        lngPlaceholder = longitudeList[j];
        latPlaceholder = latitudeList[j];
            if (userLocation == cityPlaceholder) {
                appendItem(userCoordinates, latPlaceholder);
                appendItem(userCoordinates, lngPlaceholder);
                break;


            }

    }
setText("triangulatingTextBox", "Triangulating...");
//creates filtered latitude and longitude lists
for (var a=0;a<filteredCitiesList.length;a++) {
    filteredCitiesPlaceholder = filteredCitiesList[a];
    for (var c=0;c<citiesList.length;c++) {
      var cityPlaceholder = citiesList[c];
    var latPlaceholder = latitudeList[c];
    var lngPlaceholder = longitudeList[c];
    if (cityPlaceholder == filteredCitiesPlaceholder) {
        appendItem(filteredLatitudeList, latPlaceholder);
        appendItem(filteredLongitudeList, lngPlaceholder);
        
    }

    }
}
setText("finishTextBox", "Finishing...");
//need to use filtered latitude and longlitude lists since we need to account for the category that the user has selected
for (var i=0;i<citiesList.length;i++) {
    var latitude = filteredLatitudeList[i];

    var startingLatitude = filteredLatitudeList[0];

    var longitude = filteredLongitudeList[i];

    var startingLongitude = filteredLongitudeList[0];

    var cityCoordinates = coordinateConverter(latitude, longitude);

    var startingCityCoordinates = coordinateConverter(startingLatitude, startingLongitude);

    var distance = distanceMeasurer(userCoordinates[0], userCoordinates[1], cityCoordinates[0], cityCoordinates[1]);

    var minDistance = distanceMeasurer(userCoordinates[0], userCoordinates[1], startingCityCoordinates[0], startingCityCoordinates[1]);

        if (minDistance>distance) {
            minDistance = distance;
             rowCounter = i;
        }
}
setScreen("screen3");

var nobelPrizeWinnerName = firstNameList[rowCounter]+ " "+ lastNameList[rowCounter];

setText("outputText", "Congrats! "+ userName+ " you are most similar to " + nobelPrizeWinnerName);

});

//converts the coordinates into pi radians
function coordinateConverter(lat, lng) {
    lat = lat*(Math.PI/180);
    lng = lng*(Math.PI/180);
    return [lat, lng];
}
//measures the distance between the two inputed latitude and two inputed longitudes
function distanceMeasurer (lat1, lng1, lat2, lng2) {
    var d = 3963.0 * Math.acos((Math.sin(lat1) * Math.sin(lat2)) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2-lng1));
    return d;
}
