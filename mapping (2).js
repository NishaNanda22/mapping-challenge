var apiKey = "AIzaSyDOF0hn_T_2VQctaJ4JYy7uUzyszyzsvk4";

var graymap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: apiKey
});

var map = L.map("mapid", {
  center: [
    40.7, -94.5
  ],
  zoom: 3
});

graymap.addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  function getColor(magnitude) {
    switch (true) {
    case magnitude > 6:
      return "#961C1C";
    case magnitude > 5:
      return "#BB2323";
    case magnitude > 4:
      return "#FF7000";
    case magnitude > 3:
      return "#FFD966";
    case magnitude > 2:
      return "#D5A6BD";
    case magnitude > 1:
      return "#4EC718";
    default:
      return "#9FC5E8;
    }
  }

  // I do not like javascript !! 
  // all the bubbles are different sizes so have to make it dramatic
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }

    return magnitude * 3;
  }

  L.geoJson(data, {
    pointToLayer: function(feature, latlong) {
      return L.circleMarker(latlng);
    },

    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(map);
// i think i am missing something

