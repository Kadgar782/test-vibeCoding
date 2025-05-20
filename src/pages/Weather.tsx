// Weather.tsx
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Weather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  const lat = 55.751244;
  const lon = 37.618423;
  const part = "minutely,hourly,daily,alerts";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&units=metric&appid=${API_KEY}`
        );
        setWeather(res.data);
      } catch (err: any) {
        setError("Error fetching weather");
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="appWrapper">
      <h2>🌤️ Weather in Moscow</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div className="weatherCard">
          <p>🌡 Temp: {weather.current.temp}°C</p>
          <p>☁ Condition: {weather.current.weather[0].description}</p>
          <p>🌬 Wind: {weather.current.wind_speed} m/s</p>
          <p>💧 Humidity: {weather.current.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
