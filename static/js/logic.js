// Create a map object
let baseMap = L.map("mapid", {
    center: [15.5994, -28.6731],
    zoom: 3
  });
 
// Add tile layer  
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 15,
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
            case depth > 40:
                return "red";
            case depth > 30:
                return "orange";
            case depth > 20:
                return "yellow";
            case depth > 10:
                return "green";
            case depth > 0:
                return "blue";
            default:
                return "purple"
        }
    }

    // Style and bind the markers
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: radius(feature.properties.mag),
                fillColor: markercolor(feature.geometry.coordinates[2]),
                color: "black",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5
            })
        },

        onEachFeature: function (feature, layer) {
        layer.bindPopup("<h1>Earthquake ID: " + feature.id + "</h1> <hr> <h3>Magnitude: " + feature.properties.mag + "</h3>")
        .addTo(baseMap);

        // Referred to Leaflet documentation to add legend (https://leafletjs.com/examples/choropleth/)
        let legend = L.control({position: "bottomleft"});

        legend.onAdd = function (map) {
            let div = L.DomUtil.create("div", "info legend"),
            quakedepth = [0, 10, 20, 30, 40, 50];
            
            for (var i = 0; i < quakedepth.length; i++) {
                div.innerHTML += 
                '<i style="background:' + markercolor(quakedepth[i] + 1) + '"></i> ' +
                    quakedepth[i] + (quakedepth[i + 1] ? '&ndash;' + quakedepth[i + 1] + '<br>' : '+');
            }
            return div;
        };

        legend.addTo(baseMap);
    }})
});  