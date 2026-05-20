import React from 'react'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom'

function App() {

  return (
    <>
    <h1>Chat App</h1>
    <Switch>
      <Route path="/signup"><Signup/></Route>
      <Route path="/login"><Login/></Route>
      <Route path="/" exact>
        
      </Route>
    </Switch>
    </>
  )
}

export default App
