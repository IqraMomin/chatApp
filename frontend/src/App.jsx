import React from 'react'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom'
import WelcomeScreen from './pages/WelcomeScreen'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function App() {
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);

  return (
    <Container fluid className='g-0'>
    <Switch>
      <Route path="/signup">
      {isLoggedIn && <Redirect to="/welcome"/>}
      {!isLoggedIn && <Signup/>}
      </Route>
      <Route path="/login">
      {isLoggedIn && <Redirect to="/welcome"/>}
      {!isLoggedIn && <Login/>}</Route>
      <Route path="/welcome">      
      {isLoggedIn && <WelcomeScreen/>}
      {!isLoggedIn && <Redirect to="/login"/>}</Route>
      <Route path="/" exact>
      {isLoggedIn && <Redirect to="/welcome"/>}
      {!isLoggedIn && <Redirect to="/login"/>}</Route>
    </Switch>
    </Container>
  )
}

export default App
