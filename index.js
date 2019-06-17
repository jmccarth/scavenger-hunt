var app = new Vue({ 
  el: '#app',
  data: {
    points: [
      {
        name: "point1",
        coords: [-80.544742,43.473190],
        clue: "clue1"
      },
      {
        name: "point2",
        coords: [-80.45,43.54],
        clue: "clue2"
      }
    ],
    distance: 500,
    bearing: 80
  },
  mounted: getLocation
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(location){
      var from = turf.point([location.coords.longitude,location.coords.latitude]);
      var to = turf.point([-80,43.5]);
      var options = {units: 'kilometers'};
      var distcalc = turf.distance(from,to,options);
      var bearing = turf.bearing(from,to);
      app.distance = distcalc;
      app.bearing = bearing;
      document.querySelector("#arrow").style.transform = `rotate(${app.bearing}deg)`
    });
  }
}