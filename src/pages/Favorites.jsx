import { useEffect, useState } from 'react'
import { getWeatherEmoji } from '../utils/getWeatherEmoji'
import Header from '../components/Header'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(saved)
  }, [])

  const handleRemove = (id) => {
    const filtered = favorites.filter((city) => city.id !== id)
    setFavorites(filtered)
    localStorage.setItem('favorites', JSON.stringify(filtered))
  }

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h2>🌟 Cidades Favoritas</h2>
        {favorites.length === 0 ? (
          <p>Nenhuma cidade favoritada ainda.</p>
        ) : (
          <div style={styles.list}>
            {favorites.map((city) => (
              <div key={city.id} style={styles.card}>
                <h3 style={styles.city}>{city.name}</h3>
                <p style={styles.country}>{city.country}</p>
                <span style={styles.emoji}>
                  {getWeatherEmoji(city.icon)}
                </span>
                <p style={styles.temp}>{Math.round(city.temp)}°C</p>
                <p>{city.description}</p>

                <button
                  onClick={() => handleRemove(city.id)}
                  style={styles.removeButton}
                >
                  <i className="fas fa-trash-alt" style={styles.removeIcon}></i> Remover
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )  
}

const styles = {
  container: {
    padding: '100px 20px 40px',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #83a4d4, #b6fbff)',
    textAlign: 'center',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
  },
  card: {
    backgroundColor: '#ffffffcc',
    padding: '20px',
    borderRadius: '12px',
    width: '200px',
    minHeight: '300px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    boxSizing: 'border-box',
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
  temp: {
    fontWeight: 'bold',
    fontSize: '22px',
  },
  removeButton: {
    marginTop: '10px',
    padding: '8px 14px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'background-color 0.3s',
  },
  removeIcon: {
    fontSize: '16px',
  },
  emoji: {
    fontSize: '48px',
    marginBottom: '10px',
    lineHeight: '1',
    height: '48px',
  },
}

export default Favorites