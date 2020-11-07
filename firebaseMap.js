

// function initMap() {
//   var lati = getLatitude();
//   console.log("%f",lati);
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 51.049999, lng: -114.066666},
//     zoom: 9,
//     styles: [{
//       featureType: 'poi',
//       stylers: [{ visibility: 'off' }]  // Turn off points of interest.
//     }, {
//       featureType: 'transit.station',
//       stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
//     }],
//     disableDoubleClickZoom: true,
//     streetViewControl: false
//   });
//   // Create the DIV to hold the control and call the makeInfoBox() constructor
// // passing in this DIV.
// var infoBoxDiv = document.createElement('div');
// var infoBox = new makeInfoBox(infoBoxDiv, map);
// infoBoxDiv.index = 1;
// map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);
// // Listen for clicks and add the location of the click to firebase.
// map.addListener('click', function(e) {
//   data.lat = e.latLng.lat();
//   data.lng = e.latLng.lng();
//   addToFirebase(data);
// }); 

//         // Create a heatmap.
//         var heatmap = new google.maps.visualization.HeatmapLayer({
//           data: [],
//           map: map,
//           radius: 16
//         });

// initAuthentication(initFirebase.bind(undefined, heatmap));
// }

var map, infoWindow, currentLat, currentLng;
var markers = [];
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 51.049999, lng: -114.066666},
          zoom: 16
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            currentLat = pos.lat;
            currentLng =  pos.lng;
            map.setCenter(pos);
            //infoWindow.setPosition(pos);
            //infoWindow.setContent('You are here.');
            var image = 'images/location.png';
            var marker = new google.maps.Marker({
            position: pos,
            animation: google.maps.Animation.DROP,
            draggable: false,
            map: map,
            icon: image
                });
            //infoWindow.open(map);
            
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
        setMapOnAll(null);
      }

      // Shows any markers currently in the array.
function showMarkers() {
        setMapOnAll(map);
      }

      // Deletes all markers in the array by removing references to them.
function deleteMarkers() {
        clearMarkers();
        markers = [];
      }

 function searchingVendor(){
  console.log("Searching vendor clicked");
  //remove previous markers
  deleteMarkers();
 

  var i;
  var vendor = [
      ['John Cornor',      currentLat +.001 , currentLng +.002, 4.56, 3],
      ['Harry Potter',     currentLat +.001 , currentLng -.002, 4.82, 2],
      ['Ron Wisly',        currentLat -.001 , currentLng +.002, 3.86, 4],
      ['Robert Sabestain', currentLat -.001 , currentLng -.002, 4.26, 5],
      ['Metheu Walker',    currentLat +.003 , currentLng +.004, 4.84, 7],
      ['Thomas Odoyo',     currentLat +.003 , currentLng -.004, 3.76, 2],
      ['Pennelopi White',  currentLat -.003 , currentLng +.004, 4.92, 4],
    ];

    var e = document.getElementById("optionSelect");
    var selectedOption = e.options[e.selectedIndex].text;
    console.log("selected = %s",selectedOption);

    var image = 'images/vendorIcon.png';

    if(selectedOption == 'Electrician'){
      image = 'images/electrician.png';
    }
    else if(selectedOption == 'Plumber'){
      image = 'images/plumber.png';
    }
    else if(selectedOption == 'Cleaner'){
    image = 'images/cleaner.png';
    }

   for (i = 0; i < vendor.length; i++) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(vendor[i][1], vendor[i][2]),
        map: map,
        icon: image
      });
    markers.push(marker);

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          document.getElementById("profileCard").style.display = 'block';
          console.log("Show vendor Profile");
          console.log("Name: %s", vendor[i][0]);
          var name = vendor[i][0];
          document.getElementById("vendorName").innerHTML = name;
          document.getElementById("vendorType").innerHTML = selectedOption;
          var rating = vendor[i][3];
          document.getElementById("rating").innerHTML = rating;
          var experience = vendor[i][4];
          document.getElementById("workingExperience").innerHTML = experience +" Years";
          
        }
      })(marker, i));
  }

 }
