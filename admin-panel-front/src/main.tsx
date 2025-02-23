import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios from 'axios'
import { Provider } from 'react-redux'
import store from './redux/configureStore.ts'

axios.defaults.baseURL = "http://localhost:10009/api/";
axios.defaults.withCredentials = true; // for every request we can access the backend cookies
// const store = configurationStore(); // this will save states of app like user 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> 
    <App />
    </Provider>
  </StrictMode>,
)
