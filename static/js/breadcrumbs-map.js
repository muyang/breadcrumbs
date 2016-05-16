function initMap() {
  
  // Specify where the map is centered
  // Note re: coordinates
  // North is positive / South is negative
  // West is negative / East is positive
  // TODO: Center the map based on user's city (get coordinates for city)
  var myLatLng = {lat: 37.3688, lng: -122.0363};

  // Create a map object and specify the DOM element for display
  // Customize the control options
  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 13,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    },
    streetViewControl: true,
    streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
  });

  // // ----------- Test code for plotting a marker on the map ----------- 
  // // Give coordinates of marker
  // var markerLatLng = {lat: 37.351158, lng: -122.03274};

  // // Create a marker object
  // var marker = new google.maps.Marker({
  //   position: markerLatLng,
  //   map: map,
  //   title: 'This is a marker!!'
  // });
  // // ------------------------------------------------------------------

  // // Test code for opening an info window when user clicks a marker ---
  // // Content of info window
  // var contentString = '<div id="content">' +
  //   '<h3>Restaurant Name: Blah blah</h3>' +
  //   'Address: blah blah blah blah<br>' +
  //   'Phone: 1234567890' +
  //   '</div>';

  // // Create an info window object
  // var infowindow = new google.maps.InfoWindow({
  //   content: contentString
  // });

  // // Create a marker object
  // var marker2 = new google.maps.Marker({
  //   position: {lat: 37.3765035, lng: -122.0321156},
  //   map: map,
  //   title: 'Nom Burger'
  // });

  // // Create an event handler that opens info window when marker is clicked
  // marker2.addListener('click', function() {
  //   infowindow.open(map, marker2);
  // });
  // // ------------------------------------------------------------------

  // Solution for multiple info windows:
  // http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/
  
  // Create an info window object
  // Note: This works whether placed inside or outside of the for loop
  // When inside the for loop, object is recreated each time???
  // But we just want the content of the info window to change
  // Which works using "this" in the event handler
  var infoWindow = new google.maps.InfoWindow({
    maxWidth: 200
  });

  // Make AJAX call to server to get JSON that has info re: user's visits
  // For every restaurant that the user has visited, place markers on map
  // with an info window for each marker when clicked
  $.get('/user-visits.json', function (visits) {

    for (var key in visits) {
      var visit = visits[key];

      // Content of info window 
      // Display information about the restaurant
      var contentString = '<div id="content">' +
        '<h3>'+ visit.restaurant + '</h3>' +
        'Address: ' + visit.address + '<br>' +
        'Phone: ' + visit.phone +
        '</div>';

      // This works whether placed inside or outside of the for loop
      // Decided to place outside of the for loop (above)
      // // Create an info window object
      // var infowindow = new google.maps.InfoWindow({
      //   maxWidth: 200
      // });

      // Specify marker coordinates with restaurant's coordinates
      var markerLatLng = {lat: visit.latitude, lng: visit.longitude};

      // Create a marker object
      var marker = new google.maps.Marker({
        position: markerLatLng,
        map: map,
        title: 'Restaurant: ' + visit.restaurant,
        html: contentString
      });

      // Add an event handler that sets content of info window to "this" 
      // marker being clicked and open the info window for "this" marker
      marker.addListener('click', function() {
        infoWindow.setContent(this.html);
        infoWindow.open(map, this);
      });

    }

  });

  
}