// Create a new Mappa instance using Leaflet.
const mappa = new Mappa('Leaflet');
let myMap;
let firstVisit = true;
// Lets put all our map options in a single object
let userMarker;

let mapLoaded;
let zone;
let tarArray = [
  [50.36557170459509, -4.142242670059204],
  [50.364353495477175, -4.141899347305298],
  [50.36239094957529, -4.149017930030823],
  [50.36522609226425, -4.1428327560424805],
  [50.3652363580133, -4.141775965690613],
  [50.3647299117452, -4.1442811489105225]
  ];




const options = {
  lat: 50.365389,
  lng: -4.142222,
  zoom: 16,
  style: "https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png"
}


function preload() {
  // This parses the JSON text file into a Javascript Object
  // zone = loadJSON("data/zone.geo.json");
  PopStart = loadSound('Sound/startPop.wav');
  Pop = loadSound('Sound/popUp.wav');
  Welcome = loadSound('welcome.wav');
}

function setup() {
  
  let canvas = createCanvas(windowWidth, windowHeight);
 
  
      
      myMap = mappa.tileMap(options);
      myMap.overlay(canvas, onMapLoaded);
  
  L.map('myMap').setView(tarArray[0], 16);   
  
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(gotPosition);
    
  }
  

}

function gotPosition(position) {

  // Unlikely but we might get position before map is loaded!
  // That would cause an error if we tried to create the marker
  if (!mapLoaded) return;

  if (!userMarker) {
    // Create the marker
    userMarker = L.circleMarker([position.coords.latitude, position.coords.longitude]).addTo(myMap.map);
  } else {
    // Move the marker
    userMarker.setLatLng([position.coords.latitude, position.coords.longitude]);
  }
  
  
}


function onMapLoaded() {
  mapLoaded = true;
  
  L.geoJSON(zone).addTo(myMap.map);

  //custom icon setup for smeaton
  var Smeaton = L.icon({
    iconUrl: 'light.gif',
    iconSize:  [50, 70], // size of the icon
    iconAnchor:  [25, 60], 
});
    
  //target markers
  
    drawtmark();
  
  
  
    var circle = L.circle(tarArray[0], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.3,
    radius: 5
    }).addTo(myMap.map);
  
   //opens modal by default
  $('#myModal').modal('show')
  //Plays morse code sound to start app
  Welcome.play();

function draw() {
  

}

  



function drawtmark(){
  
  
  
   var one = L.marker(tarArray[0],{icon: Smeaton}).addTo(myMap.map)
   
   
  

   var two = L.marker(tarArray[1], {icon: Smeaton}).addTo(myMap.map);
    two.remove();

  
   var three = L.marker(tarArray[2], {icon: Smeaton}).addTo(myMap.map);
    three.remove();

  
   var four = L.marker(tarArray[3], {icon: Smeaton}).addTo(myMap.map);
    four.remove();

  
   var five = L.marker(tarArray[4],{icon: Smeaton}).addTo(myMap.map); 
    five.remove();
  
   var six = L.marker(tarArray[5],{icon: Smeaton}).addTo(myMap.map);
    six.remove();
  
}


}