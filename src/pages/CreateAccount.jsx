import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'
import { useNavigate, Link } from 'react-router-dom'

const CreateAccount = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [inputError, setInputError] = useState({ email: false, password: false })

  const navigate = useNavigate()

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email)

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    const errors = {
      email: !email || !validateEmail(email),
      password: !password || password.length < 6,
    }
    
    setInputError(errors)
    
    if (errors.email || errors.password) {
      setError('Preencha todos os campos corretamente.')
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      localStorage.setItem('authToken', user.uid)
      navigate('/')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso.')
      } else if (err.code === 'auth/weak-password') {
        setError('A senha precisa ter pelo menos 6 caracteres.')
      } else {
        setError('Erro ao criar conta. Tente novamente.')
        console.error(err)
      }
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Criar Conta</h2>
        <form onSubmit={handleRegister} style={styles.form}>
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
              placeholder="Senha (mín. 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...styles.input,
                borderColor: inputError.password ? 'red' : '#ccc',
              }}
            />
          </div>

          <button type="submit" style={styles.button}>Registrar</button>

          {error && <p style={styles.error}>{error}</p>}

          <p style={styles.loginText}>
            Já tem uma conta?{' '}
            <Link to="/login" style={styles.loginLink}>Entrar</Link>
          </p>
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
    height: '100vh',
    background: 'linear-gradient(to bottom, #83a4d4, #b6fbff)',
    fontFamily: 'Arial, sans-serif',
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
    boxSizing: 'border-box',
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
    padding: '10px 10px 10px 36px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s',
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
  },
  error: {
    backgroundColor: '#ffe0e0',
    color: '#b20000',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '14px',
    marginTop: '10px',
    textAlign: 'center',
    border: '1px solid #f5c2c2',
  },
  loginText: {
    fontSize: '14px',
    marginTop: '20px',
    textAlign: 'center',
    color: '#444',
  },
  loginLink: {
    color: '#4a90e2',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginLeft: '6px',
  }
}

export default CreateAccount