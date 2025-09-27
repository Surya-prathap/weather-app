import { useEffect, useState, useRef } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);

  const inputRef = useRef();

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_OPENWEATHER_API_KEY
      }&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setWeatherData({
        humidity: data.main.humidity,
        temp: data.main.temp,
        lat: data.coord.lat,
        lon: data.coord.lon,
        name: data.name,
        speed: data.wind.speed,
      });
    } catch (error) {
      setWeatherData(false);
      alert("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("delhi");
  }, []);
  return (
    <div className="container">
      <h1 className="title">WEATHER APP</h1>
      <div className="search-info">
        <input ref={inputRef} placeholder="Enter City....." />
        <button
          className="search-btn"
          onClick={() => search(inputRef.current.value)}
        >
          search
        </button>
      </div>
      {weatherData ? (
        <>
          <div>
            <div className="info">
              <h2 className="name">{weatherData.name.toUpperCase()}</h2>
            </div>
            <div className="temp">
              <img
                className="temp-logo"
                src={
                  weatherData.temp > 30
                    ? "https://www.pngplay.com/wp-content/uploads/8/Climate-Temperature-PNG-Clipart-Background.png"
                    : "https://cdn-icons-png.flaticon.com/512/6636/6636013.png"
                }
              ></img>
              <h3>Temperature: {weatherData.temp}&deg;C </h3>
            </div>

            <div className="lat-lon">
              <h3>Location Latitude : {weatherData.lat.toFixed(2)}&deg;N </h3>

              <h3>Location Longitude : {weatherData.lon.toFixed(2)}&deg;E</h3>
            </div>

            <div className="speed-humidity-container">
              <div className="speed">
                <img
                  className="logo"
                  src="https://cdn-icons-png.flaticon.com/512/1247/1247767.png"
                ></img>
                <h3>Wind speed : {weatherData.speed} km/h</h3>
              </div>
              <div className="humidity">
                <img
                  className="logo"
                  src="https://static.vecteezy.com/system/resources/previews/011/652/634/original/humidity-3d-render-icon-illustration-png.png"
                ></img>
                <h3>Humidity : {weatherData.humidity}%</h3>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
