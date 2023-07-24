import React from 'react'
import { BrowserRouter as Router} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './Styles/global.css'
import { UserProvaider } from './Context/UserProvider.tsx'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
    <UserProvaider>
    <App />
    </UserProvaider>
    </Router>
  </React.StrictMode>,
)
