// import * as d3 from 'd3';
// import React, { useEffect, useState } from 'react';

// const App = () => {
//   const [geoData, setGeoData] = useState(null);
//   const [weatherData, setWeatherData] = useState(null);

//   useEffect(() => {
//     // Fetch geographical data (GeoJSON) for the map
//     fetch('your_geojson_url')
//       .then(response => response.json())
//       .then(data => {
//         setGeoData(data);
//       })
//       .catch(error => {
//         console.error('Error fetching geographical data:', error);
//       });

//     // Fetch live weather forecast data
//     fetch('your_weather_api_url')
//       .then(response => response.json())
//       .then(data => {
//         setWeatherData(data);
//       })
//       .catch(error => {
//         console.error('Error fetching weather data:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (geoData && weatherData) {
//       drawMap();
//     }
//   }, [geoData, weatherData]);

//   const drawMap = () => {
//     const width = 800;
//     const height = 600;

//     // Setup Azimuthal projection
//     const projection = d3.geoAzimuthalEqualArea()
//       .rotate([-105, -40])
//       .translate([width / 2, height / 2])
//       .scale(1000);

//     // Setup path generator
//     const path = d3.geoPath().projection(projection);

//     // Create SVG element
//     const svg = d3.select('#map-container')
//       .append('svg')
//       .attr('width', width)
//       .attr('height', height);

//     // Draw map features
//     svg.selectAll('path')
//       .data(geoData.features)
//       .enter()
//       .append('path')
//       .attr('d', path)
//       .attr('fill', 'lightgray')
//       .attr('stroke', 'white')
//       .attr('stroke-width', 0.5);

//     // Map weather data to map features
//     // Add additional visualizations and interactivity as needed
//   };

//   return (
//     <div>
//       <h1>Live Weather Forecast</h1>
//       <div id="map-container"></div>
//     </div>
//   );
// };

// export default App;


import * as d3 from 'd3';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [geoData, setGeoData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [geoResponse, weatherResponse] = await Promise.all([
          fetch('your_geojson_url').then(response => response.json()),
          fetch('your_weather_api_url').then(response => response.json())
        ]);
        setGeoData(geoResponse);
        setWeatherData(weatherResponse);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (geoData && weatherData) {
      drawMap();
    }
  }, [geoData, weatherData]);

  const drawMap = () => {
    const width = 800;
    const height = 600;

    // Setup Azimuthal projection
    const projection = d3.geoAzimuthalEqualArea()
      .rotate([-105, -40])
      .translate([width / 2, height / 2])
      .scale(1000);

    // Setup path generator
    const path = d3.geoPath().projection(projection);

    // Create SVG element
    const svg = d3.select('#map-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Draw map features
    svg.selectAll('path')
      .data(geoData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', 'lightgray')
      .attr('stroke', 'white')
      .attr('stroke-width', 0.5);

    // Map weather data to map features
    svg.selectAll('path')
      .style('fill', d => {
        // Assuming each feature in geoData corresponds to a location in weatherData
        const location = weatherData[d.properties.name]; // Assuming name is the key
        if (location) {
          const temperature = location.temperature; // Assuming temperature is one of the properties
          // Add your logic to map temperature to a color
          // For example, you could use a linear scale to map temperature to a color gradient
          return temperature >= 25 ? 'red' : temperature >= 15 ? 'orange' : 'blue';
        } else {
          return 'lightgray'; // Default color for locations without weather data
        }
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Live Weather Forecast</h1>
      <div id="map-container"></div>
    </div>
  );
};

export default App;
