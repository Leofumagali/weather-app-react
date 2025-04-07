# ☀️ Weather App

Aplicação de previsão do tempo desenvolvida em **React** com autenticação via **Firebase**, integração com a **API do OpenWeatherMap** e funcionalidade de **favoritar cidades**.

---

## 🚀 Funcionalidades

- 🔍 Buscar clima atual por cidade
- 📍 Exibir temperatura, descrição e condição visual com ícones
- ❤️ Favoritar cidades
- 🗑️ Remover cidades dos favoritos
- 🔐 Autenticação com Firebase (login e cadastro)
- ✅ Roteamento protegido (Private Routes)
- 🌈 Interface responsiva, bonita e funcional

---

## 🔧 Tecnologias

- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [OpenWeatherMap API](https://openweathermap.org/current)
- [Font Awesome](https://fontawesome.com/) (ícones)
- CSS-in-JS com `style={{}}` (estilização inline)

---

## 📦 Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/leofumagali/weather-app-react.git

# Acesse a pasta
cd weather-app

# Instale as dependências
npm install

# Crie o arquivo de variáveis de ambiente:
touch .env

# Configure o .env com as suas chaves do Firebase e da OpenWeatherMap:


```VITE_FIREBASE_API_KEY=XXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=XXXXXXXX.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=XXXXXXXX
VITE_FIREBASE_STORAGE_BUCKET=XXXXXXXX.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=XXXXXXXX
VITE_FIREBASE_APP_ID=XXXXXXXX

VITE_OPENWEATHER_API_KEY=SUA_CHAVE_DA_OPENWEATHER```

# 🔑 Você pode obter sua chave da OpenWeatherMap em: https://openweathermap.org/api

# Rode o app
npm run dev
