import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [inputError, setInputError] = useState({ email: false, password: false })

  const navigate = useNavigate()

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
  
    const errors = {
      email: !email || !validateEmail(email),
      password: !password,
    }

    setInputError(errors)

    if (errors.email || errors.password) {
      setError('Verifique os campos preenchidos.')
      return
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      localStorage.setItem('authToken', user.uid)
      navigate('/')
    } catch (err) {
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-credential'
      ) {
        setError('E-mail ou senha incorretos.')
      } else {
        setError('Erro ao fazer login. Tente novamente.')
      }
    }
  }
  
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>🔐 Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <i
              className="fas fa-envelope"
              style={{
                ...styles.icon,
                color: inputError.email ? 'red' : '#666',
              }}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                ...styles.input,
                borderColor: inputError.email ? 'red' : '#ccc',
              }}
            />
          </div>

          <div style={styles.inputGroup}>
            <i
              className="fas fa-lock"
              style={{
                ...styles.icon,
                color: inputError.password ? 'red' : '#666',
              }}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...styles.input,
                borderColor: inputError.password ? 'red' : '#ccc',
              }}
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>Entrar</button>
          
          <div style={styles.signupContainer}>
            <p style={styles.signupText}>
              Ainda não tem uma conta?
              <Link to="/create-account" style={styles.signupLink}> Crie agora</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    overflow: 'hidden',
    background: 'linear-gradient(to bottom, #83a4d4, #b6fbff)',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    boxSizing: 'border-box',
  },
  box: {
    backgroundColor: '#ffffffcc',
    backdropFilter: 'blur(6px)',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    position: 'relative',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '16px',
    transition: 'color 0.3s',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 10px 10px 36px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#4a90e2',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  error: {
    backgroundColor: '#ffe0e0',
    color: '#b20000',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '14px',
    marginTop: '-8px',
    marginBottom: '12px',
    textAlign: 'center',
    border: '1px solid #f5c2c2',
  },
  signupText: {
    fontSize: '14px',
    marginTop: '10px',
    color: '#444',
  },
  signupLink: {
    color: '#4a90e2',
    fontWeight: 'bold',
    textDecoration: 'none',
  }
}

export default Login