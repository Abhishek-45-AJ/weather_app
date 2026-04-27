import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [city, setCity] = useState('Mumbai')
  const [weatherData, setWeatherData] = useState(null)

  const currentDate = new Date()
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
  const month = months[currentDate.getMonth()]
  const day = currentDate.getDate()
  const year = currentDate.getFullYear()

  const date = month + " " + day + ", " + year; //find the current date

  const API_KEY = "5cee0acb631b02c018befa5ac745315a"
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      const data = await response.json()
      setWeatherData(data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchWeatherData()
  }, [])

  const handleCityName = (event) => {
    setCity(event.target.value)

  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchWeatherData()

  }

  const getWeatherImage = (type) => {
    switch (type) {
      case 'Clouds':
        return '/public/clouds.png'
        break;
      case 'Rain':
        return '/public/rain.webp'
        break;
      case 'Clear':
        return '/public/clear.webp'
        break;
      case 'Mist':
        return '/public/tornado.png'
        break;
      case 'Maza':
        return '/public/sunny.webp'
        break;
      default:
        return '/public/normal.png'
    }
  }

  return (
    <div className='App'>
      <div className='container'>
        {
          weatherData && (
            <>
              <h1 className='container_date'>{date}</h1>
              <div className='weather_data'>
                <h1 className='container_city'>{weatherData.name}</h1>
                <img className='container_img' src={getWeatherImage(weatherData.weather[0].main)} alt="thunder image" width='180px' />
                <h2 className='container_degree'>{weatherData.main.temp} C</h2>
                <h2 className='container_disc'>{weatherData.weather[0].main}</h2>
                <form action="" className='form' onSubmit={handleSubmit}>
                  <input type="text" className='input' placeholder='Enter city name' onChange={handleCityName} />
                  <button type='submit' className='button'>Get</button>
                </form>

              </div>

            </>
          )
        }

      </div>

    </div>
  )
}

export default App
