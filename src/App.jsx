
import './App.css'
import Search from './components/search/search'
import CurrentWeather from './components/current-weather/current-weather'
import { WEATHER_API_KEY, WEATHER_API_URL } from './api'
import { useState } from 'react'
import Forecast from './components/forecast/forecast'

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setforecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (Response) => {
        const weatherResposne = await Response[0].json()
        const forecastResposne = await Response[1].json()

        setCurrentWeather({ city: searchData.label, ...weatherResposne });
        setforecast({ city: searchData.label, ...forecastResposne });
      })
      .catch((err) => console.log(err));
  }

  console.log(currentWeather);
  console.log(forecast);


  return (
    <>
      <div className='container'>
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    </>
  )
}

export default App
