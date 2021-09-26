import { useState } from 'react'
import logo from './logo.svg'
import Router from './Router'
import {
  HashRouter
} from 'react-router-dom';

function App() {
  return (
    <div>
      <HashRouter>
        <Router/>
      </HashRouter>
    </div>
  )
}

export default App
