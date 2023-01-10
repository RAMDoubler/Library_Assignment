var firstNameList = getColumn("Nobel Prize Winners 1901-2016", "First Name")

var lastNameList = getColumn("Nobel Prize Winners 1901-2016", "Last name");
    var filteredNameList = [];
var categoryList = getColumn("Nobel Prize Winners 1901-2016", "Category");

var nobelCitiesList = getColumn("Nobel Prize Winners 1901-2016", "City of birth");
    var filteredCitiesList = [];
var citiesList = getColumn("worldcitites_clean", "city")

var userCoordinates = [];

var  longitudeList = getColumn("worldcities_clean", "lng");
    var filteredLongitudeList = [];
var latitudeList = getColumn("worldcities_clean", "lat");
    var filteredLatitudeList = [];

onEvent("nobelPrizeButton", "click", function () {
    setScreen(screen2)

});


onEvent("nobelPrizeButton2", "click", function() {

var userName = getText("nameInput")


//creates filtered cities list
var userCategory = getText(placeholder1);
    for (var i=0;i<categoryList.length;i++) {
        citiesPlaceholder = nobelCitiesList[i];
            if (categoryPlaceholder == userCategory) {
                appendItem(filteredCitiesList, citiesPlaceholder);
            }
    }

//creates the user's coordinates
var userLocation = getText(placeholder2);
    for (var i=0;i<citiesList.length;i++) {
        cityPlaceholder = citiesList[i];
        lngPlaceholder = longitudeList[i];
        latPlaceholder = latitudeList[i];
            if (userLocation == cityPlaceholder) {
                appendItem(userCoordinates, latPlaceholder)
                appendItem(userCoordinates, lngPlaceholder)
                


            }

    }
//creates filtered latitude and longitude lists
for (var i=o;i<filteredCitiesList;i++)
    var filteredCitiesPlaceholder = filteredCitiesList[i]
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

    var cityCoordinates = coordinateConverter(latitude, longitude)

    var startingCityCoordinates = coordinateConverter(startingLatitude, startingLongitude)

    var distance = distanceMeasurer(userCoordinates[0], userCoordinates[1], cityCoordinates[0], cityCoordinates[1]);

    var minDistance = distanceMeasurer(userCoordinates[0], userCoordinates[1], startingCityCoordinates[0], startingCityCoordinates[1]);

        if (minDistance>distance) {
            minDistance = distance;
            var rowCounter = i;
        }
}

setScreen(screen3);

var nobelPrizeWinnerName = firstNameList[rowCounter]+ " "+ lastNameList[rowCounter];

setText("outputText", "Congrats! "+ userName+ " you are most similar to" + nobelPrizeWinnerName);

});

//converts the coordinates into pi radians
function coordinateConverter(lat, lng) {
    lat = lat*(pi/180);
    lng = lng*(pi/180);
    return [lat, lng]
}
//measures the distance between the two inputed latitude and two inputed longitudes
function distanceMeasurer (lat1, lng1, lat2, lng2) {
    d = 3963.0 * arccos[(sin(lat1) * sin(lat2)) + cos(lat1) * cos(lat2) * cos(lng2-lng1)];
    return d
}

