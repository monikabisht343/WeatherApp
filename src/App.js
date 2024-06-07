// import { useEffect, useState } from 'react';
// import { WEATHER_API_KEY, WEATHER_API_URL } from './Api';
// import './App.css';
// import CurrentWeather from './components/current-weather/current-weather'; // Correct import
// import Forecast from './components/forecast/forecast';
// import Search from './components/search/search';


// function App() {
//     const [currentWeather, setCurrentWeather] = useState(null);
//     const [forecast, setForecast] = useState(null);
//     const [error, setError] = useState(null);

//     const handleOnSearchChange = (searchData) => {
//         const [lat, lon] = searchData.value.split(" ");

//         const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
//         const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
        
//         Promise.all([currentWeatherFetch, forecastFetch])
//         .then(async (response) => {
//             const weatherResponse = await response[0].json();
//             const forecastResponse = await response[1].json();

//             setCurrentWeather({ city: searchData.label, ...weatherResponse });
//             setForecast({ city: searchData.label, ...forecastResponse });
//             setError(null); // Clear any previous errors
//         })
//         .catch((err) => {
//             console.log(err);
//             setError("Failed to fetch weather data. Please try again.");
//         });
//     };

//     useEffect(() => {
//         const fetchWeatherByLocation = async (latitude, longitude) => {
//             const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
//             const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
            
//             Promise.all([currentWeatherFetch, forecastFetch])
//             .then(async (response) => {
//                 const weatherResponse = await response[0].json();
//                 const forecastResponse = await response[1].json();

//                 setCurrentWeather({ city: weatherResponse.name, ...weatherResponse });
//                 setForecast({ city: weatherResponse.name, ...forecastResponse });
//                 setError(null); // Clear any previous errors
//             })
//             .catch((err) => {
//                 console.log(err);
//                 setError("Failed to fetch weather data. Please try again.");
//             });
//         };

//         const getLocation = () => {
//             return new Promise((resolve, reject) => {
//                 if (navigator.geolocation) {
//                     navigator.geolocation.getCurrentPosition(
//                         (position) => {
//                             resolve({
//                                 latitude: position.coords.latitude,
//                                 longitude: position.coords.longitude
//                             });
//                         },
//                         (error) => {
//                             reject(error);
//                         }
//                     );
//                 } else {
//                     reject(new Error("Geolocation is not supported by this browser."));
//                 }
//             });
//         };

//         getLocation()
//         .then((location) => {
//             fetchWeatherByLocation(location.latitude, location.longitude);
//         })
//         .catch((error) => {
//             console.log(error);
//             setError("Failed to get your location. Please enable location services and refresh the page.");
//         });
//     }, []);

//     return (
//         <div className='container'>
//             <Search onSearchChange={handleOnSearchChange} />
//             {error && <div className="error-message">{error}</div>}
//             {currentWeather && <CurrentWeather data={currentWeather} />}
//             {forecast && <Forecast data={forecast} />}
//         </div>
//     );
// }

// export default App;


import { useEffect, useState } from 'react';
import { WEATHER_API_KEY, WEATHER_API_URL } from './Api';
import './App.css';
import WeatherChart from './components/WeatherChart/WeatherChart';
import WeatherMap from './components/WeatherMap/WeatherMap';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import Search from './components/search/search';


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch weather data. Please try again.");
      });
  };

  useEffect(() => {
    const fetchWeatherByLocation = async (latitude, longitude) => {
      const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
      const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);

      Promise.all([currentWeatherFetch, forecastFetch])
        .then(async (response) => {
          const weatherResponse = await response[0].json();
          const forecastResponse = await response[1].json();

          setCurrentWeather({ city: weatherResponse.name, ...weatherResponse });
          setForecast({ city: weatherResponse.name, ...forecastResponse });
          setError(null); // Clear any previous errors
        })
        .catch((err) => {
          console.log(err);
          setError("Failed to fetch weather data. Please try again.");
        });
    };

    const getLocation = () => {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          reject(new Error("Geolocation is not supported by this browser."));
        }
      });
    };

    getLocation()
      .then((location) => {
        fetchWeatherByLocation(location.latitude, location.longitude);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to get your location. Please enable location services and refresh the page.");
      });
  }, []);

  const prepareChartData = () => {
    if (!forecast) return [];
    return forecast.list.map(entry => ({
      time: entry.dt_txt,
      temperature: entry.main.temp,
      humidity: entry.main.humidity,
    }));
  };

  const chartData = prepareChartData();

  return (
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange} />
      {error && <div className="error-message">{error}</div>}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      {forecast && <WeatherChart weatherData={chartData} />}
      {forecast && <WeatherMap weatherData={forecast}/>}
    </div>
  );
}

export default App;
