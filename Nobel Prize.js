var firstNameList = getColumn("Nobel Prize Winners 1901-2016", "First Name");

var lastNameList = getColumn("Nobel Prize Winners 1901-2016", "Last name");

var categoryList = getColumn("Nobel Prize Winners 1901-2016", "Category");

var nobelCitiesList = getColumn("Nobel Prize Winners 1901-2016", "City of birth");
    var filteredCitiesList = [];
var citiesList = getColumn("worldcitites_clean", "city");

var userCoordinates = [];

var  longitudeList = getColumn("worldcities_clean", "lng");
    var filteredLongitudeList = [];
var latitudeList = getColumn("worldcities_clean", "lat");
    var filteredLatitudeList = [];

onEvent("nobelPrizeButton", "click", function () {
    setScreen("screen2");

});


onEvent("nobelPrizeButton2", "click", function() {

var userName = getText("nameInput");


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
                


            }

    }
    
//creates filtered latitude and longitude lists
for (var a=0;a<filteredCitiesList;a++)
    var filteredCitiesPlaceholder = filteredCitiesList[a];
    var cityPlaceholder = citiesList[a];
    var latPlaceholder = latitudeList[a];
    var lngPlaceholder = longitudeList[a];
    if (cityPlaceholder == filteredCitiesPlaceholder) {
        appendItem(filteredLatitudeList, latPlaceholder);
        appendItem(filteredLongitudeList, lngPlaceholder);
    }

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

    var rowCounter;
  
        if (minDistance>distance) {
            minDistance = distance;
             rowCounter = i;
        }
}

setScreen("screen3");

var nobelPrizeWinnerName = firstNameList[rowCounter]+ " "+ lastNameList[rowCounter];

setText("outputText", "Congrats! "+ userName+ " you are most similar to" + nobelPrizeWinnerName);

});

//converts the coordinates into pi radians
function coordinateConverter(lat, lng) {
    lat = lat*(Math.pi/180);
    lng = lng*(Math.pi/180);
    return [lat, lng];
}
//measures the distance between the two inputed latitude and two inputed longitudes
function distanceMeasurer (lat1, lng1, lat2, lng2) {
    var d = 3963.0 * Math.arccos[(Math.sin(lat1) * Math.sin(lat2)) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2-lng1)];
    return d;
}
