import React from 'react'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom'
import WelcomeScreen from './pages/WelcomeScreen'
import { Container } from 'react-bootstrap'

function App() {

  return (
    <Container fluid className='g-0'>
    <Switch>
      <Route path="/signup"><Signup/></Route>
      <Route path="/login"><Login/></Route>
      <Route path="/welcome"><WelcomeScreen/></Route>
      <Route path="/" exact>
       <Login/> 
      </Route>
    </Switch>
    </Container>
  )
}

export default App
