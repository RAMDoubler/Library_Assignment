var firstNameList = getColumn("Nobel Prize Winners 1901-2016", "First Name")

var lastNameList = getColumn("Nobel Prize Winners 1901-2016", "Last name");
    var filteredNameList = [];
var categoryList = getColumn("Nobel Prize Winners 1901-2016", "Category");

var nobelCitiesList = getColumn("Nobel Prize Winners 1901-2016", "City of birth");

var citiesList = getColumn("worldcitites_clean", "city")

var userCoordinates = []

var  longitudeList = getColumn("worldcities_clean", "lng");
    var filteredLongitudeList = []
var latitudeList = getColumn("worldcities_clean", "lat");
    var filteredLatitudeList = []

var userCategory = getText(placeholder1);
    for (var i=0;i<categoryList.length;i++) {
        citiesPlaceholder = nobelCitiesList[i];
            if (categoryPlaceholder == userCategory) {
                appendItem(filteredCitiesList, citiesPlaceholder);
            }
    }

var userLocation = getText(placeholder2);
    for (var i=0;i<citiesList.length;i++) {
        cityPlaceholder = citiesList[i];
        longPlaceholder = longitudeList[i];
        latPlaceholder = latitudeList[i];
            if (userLocation == cityPlaceholder) {
                appendItem(userCoordinates, latPlaceholder)
                appendItem(userCoordinates, longPlaceholder)
                


            }

    }
//do this in the morning
//||
//vv

//need to use filtered latitude and longlitude lists since we need to account for the category that the user has selected
for (var i=0;i<citiesList.length;i++) {
    var latitude = latitudeList[i]

    var startingLatitude = latitudeList[0]

    var longitude = longitudeList[i]

    var startingLongitude = longitudeList[0]

    var cityCoordinates = coordinateConverter(latitude, longitude)

    var startingCityCoordinates = coordinateConverter(startingLatitude, startingLongitude)

    var distance = distanceMeasurer(userCoordinates[0], userCoordinates[1], cityCoordinates[0], cityCoordinates[1]);

    var minDistance = distanceMeasurer(userCoordinates[0], userCoordinates[1], startingCityCoordinates[0], startingCityCoordinates[1]);

        if (minDistance>distance) {
            minDistance = distance;
            var rowCounter = i;
        }
}



function coordinateConverter(lat, lng) {
    lat = lat*(pi/180);
    lng = lng*(pi/180);
    return [lat, lng]
}

function distanceMeasurer (lat1, lng1, lat2, lng2) {
    d = 3963.0 * arccos[(sin(lat1) * sin(lat2)) + cos(lat1) * cos(lat2) * cos(lng2-lng1)];
    return d
}