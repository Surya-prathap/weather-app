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
      console.error("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("delhi");
  }, []);
  return (
    <div>
      <div>
        <input ref={inputRef} placeholder="Enter City....." />
        <button onClick={() => search(inputRef.current.value)}>search</button>
      </div>
      {weatherData ? (
        <>
          <div>
            <h2>{weatherData.name}</h2>
            <h3>Temperature: {weatherData.temp}&deg;C </h3>
          </div>
          <div>
            <h3>Location Latitude : {weatherData.lat}&deg;N </h3>
            <h3>Location Longitude : {weatherData.lon}&deg;E</h3>
            <h3>Wind speed : {weatherData.speed} km/h</h3>
            <h3>Humidity : {weatherData.humidity}%</h3>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
