import { useNavigate, useLocation, Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../services/firebase'

const Header = () => {
  const navigate = useNavigate()
  const isAuthenticated = !!localStorage.getItem('authToken')

  const location = useLocation()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('authToken')
      navigate('/login')
    } catch (err) {
      console.error('Erro ao fazer logout:', err)
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        {location.pathname !== '/' && (
          <button onClick={handleBack} style={styles.backButton}>← Return</button>
        )}
        <h1 style={styles.logo}>☀️ Weather App</h1>
      </div>

      {isAuthenticated && (
        <div style={styles.actions}>
          <Link to="/favorites" style={styles.link}>⭐ Favorites</Link>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      )}
    </header>
  )
}

const styles = {
  header: {
    width: '100%',
    height: '60px',
    backgroundColor: '#ffffffcc',
    backdropFilter: 'blur(6px)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 30px',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10,
    fontFamily: 'Century Gothic',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
    color: '#333',
  },
  logoutButton: {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#4a90e2',
    fontWeight: 'bold',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  backButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    color: '#4a90e2',
    fontWeight: 'bold',
    padding: '0',
  },
}

export default Header