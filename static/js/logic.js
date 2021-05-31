// Create a map object
let baseMap = L.map("mapid", {
    center: [15.5994, -28.6731],
    zoom: 3
  });
 
// Add tile layer  
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(baseMap);

// Load in data
let geodata = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(geodata).then(function(data) {
    console.log(data);

    // Create radius function
    function radius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 3;
    }

    // Create function to get the marker colors
    function markercolor(depth) {
        switch (true) {
            case depth > 80:
                return "red";
            case depth > 60:
                return "orange";
            case depth > 40:
                return "yellow";
            case depth > 20:
                return "green";
            case depth > 0:
                return "blue";
            default:
                return "purple"
        }
    }
});

// var earthquakes = [{
//     location: [38.2296, 141.6646],
//     depth: 47.3,
//     mag: 6.8,
//     id: "us7000dz5t"
// },
// {
//     location: [26.7824, 92.4358],
//     depth: 34,
//     mag: 6,
//     id: "us7000dy3b"
// },
// {
//     location: [61.3409, -149.9892], 
//     depth: 42,
//     mag: 4.8,
//     id: "ak0215dsbmgn"
// },
// {
//     location: [-21.6393, -177.1304],
//     depth: 246,
//     mag: 6.4,
//     id: "us6000e4rl"
// },
// {
//     location: [39.1283333, -120.0433333],
//     depth: 7.51,
//     mag: 3.7,
//     id: "nc73554385"
// },
// {
//     location: [37.267, -121.6395],
//     depth: 7.66,
//     mag: 3.61,
//     id: "nc73554215"
// },
// {
//     location: [-18.8773, -176.2536],
//     depth: 301,
//     mag: 6.5,
//     id: "us6000e47c"
// },
// {
//     location: [29.7931,50.6793], 
//     depth: 8,
//     mag: 5.8,
//     id: "us6000e2k3"
// },
// {
//     location: [39.239, 26.0924],
//     depth: 11.2,
//     mag: 4.5,
//     id: "us6000e1pd"
// },
// {
//     location: [-8.5528, 112.5149],
//     depth: 67,
//     mag: 6,
//     id: "us6000e0iy"
// },
// {
//     location: [63.2011, -148.5799],
//     depth: 80.1,
//     mag: 5.5,
//     id: "ak0214icukav"
// },
// {
//     location: [33.9405, -118.3333333],
//     depth: 19.34,
//     mag: 4,
//     id: "ci39838928"
// }];

// for (var i = 0; i < earthquakes.length; i++) {
//     let quake = earthquakes[i];
//     L.marker(quake.location)
//     .bindPopup("<h1>ID: " + quake.id + "</h1> <hr> <h3>Magnitude: " + quake.mag + "</h3>")
//     .addTo(baseMap);
// };


// I tried to pull the data from the website to plug into
// variables, but I haven't figured it out yet. Still working
// on it, but any insight would be appreciated!

// var lat = [];
// var long = [];
// var depth = [];
// var mag = [];

// let lat = d3.json(geodata).map(function (feature) {
//     return features.geometry.coordinates[1];
//     // console.log(lat);
// });

// }), function(data) {
//     console.log(data)

//     for (var i = 0; i < data.length; i++) {
//         lat.push(data.features[i].geometry.coordinates[1]);
//         long.push(data.features[i].geometry.coordinates[0]);
//         depth.push(data.features[i].geometry.coordinates[2]);
//         mag.push(data.features[i].properties.mag);
//     };
    
//     console.log(lat);
//     console.log(long);
//     console.log(depth);
//     console.log(mag);
// };