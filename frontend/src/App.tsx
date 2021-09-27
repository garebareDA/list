import Router from './Router'
import { createGlobalStyle } from 'styled-components';
import {
  HashRouter
} from 'react-router-dom';

function App() {
  return (
    <div>
      <GlobalStyle />
      <HashRouter>
        <Router />
      </HashRouter>
    </div>
  )
}

export default App

const GlobalStyle = createGlobalStyle`
    html, body {
    height:100%;
  }

    body:after {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        content: "";
        z-index: -1;
        background: #d8d8d8
    }
`