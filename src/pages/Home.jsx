import { useState, useEffect } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { getWeatherEmoji } from '../utils/getWeatherEmoji'

const Home = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    if (weather) {
      const saved = JSON.parse(localStorage.getItem('favorites') || '[]')
      const exists = saved.some((item) => item.id === weather.id)
      setIsFavorited(exists)
    }
  }, [weather])

  const fetchWeather = async () => {
    if (!city) return

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric&lang=pt_br`
      )
      setWeather(response.data)
      setError('')
    } catch (err) {
      setError('Cidade não encontrada. Tente novamente.')
      console.log(err)
      setWeather(null)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') fetchWeather()
  }

  const handleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]')
  
    const alreadyExists = saved.some((item) => item.id === weather.id)
    if (alreadyExists) return alert('Cidade já favoritada!')
  
    const newFavorites = [...saved, {
      id: weather.id,
      name: weather.name,
      country: weather.sys.country,
      temp: weather.main.temp,
      icon: weather.weather[0].icon,
      description: weather.weather[0].description
    }]
  
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setIsFavorited(true)
  }

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.box}>
          <h1 style={styles.title}>🌤️ Weather App</h1>

          <div style={styles.search}>
            <input
              type="text"
              placeholder="Digite o nome da cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.input}
            />
            <button onClick={fetchWeather} style={styles.button}>Buscar</button>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          {weather && (
            <div style={styles.card}>
              <h3 style={styles.city}>{weather.name}</h3>
              <p style={styles.country}>{weather.sys.country}</p>
              <span style={styles.emoji}>
                {getWeatherEmoji(weather.weather[0].icon)}
              </span>
              <p style={styles.temp}>{Math.round(weather.main.temp)}°C</p>
              <p style={styles.desc}>{weather.weather[0].description}</p>
              <p>💧 {weather.main.humidity}% &nbsp;&nbsp; 💨 {weather.wind.speed} m/s</p>

              {isFavorited ? (
                <button
                  disabled
                  style={{
                    ...styles.favButton,
                    backgroundColor: '#ccc',
                    cursor: 'default',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <i className="fas fa-check-circle" style={{ color: '#4caf50' }}></i>
                  Já favoritado
                </button>
              ) : (
                <button onClick={handleFavorite} style={styles.favButton}>
                  <i className="fas fa-heart" style={styles.favIcon}></i>
                  Favoritar
                </button>
              )}
            </div>
          )}
        </div>
      </div> 
    </>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '20px',
    background: 'linear-gradient(to bottom, #83a4d4, #b6fbff)',
    fontFamily: 'Arial, sans-serif',
  },
  box: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    marginBottom: '20px',
  },
    city: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '4px',
    color: '#222',
  },
  country: {
    fontSize: '14px',
    color: '#222',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  emoji: {
    fontSize: '48px',
    marginBottom: '10px',
    lineHeight: '1',
    height: '48px',
  },
  search: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#4a90e2',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    marginTop: '20px',
  },
  temp: {
    fontSize: '40px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  desc: {
    textTransform: 'capitalize',
    marginBottom: '10px',
    fontStyle: 'italic',
  },
  favButton: {
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#ff5e5e',
    border: 'none',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    margin: '15px auto 0',
  },
  favIcon: {
    fontSize: '16px',
  },
}

export default Home