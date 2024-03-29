import React from 'react';
import { 
  BrowserRouter as Router, 
  Route 
} from "react-router-dom";
import logo from '../logo.svg';
import { ROUTES } from './ROUTES';
import { Counter } from '../features/counter/Counter';
import '../App.css';
import Calendar from '../components/calendar/calendar';

function App() {
  return (
    <Router>
        <div className="App">
          <Calendar />
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Counter />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <span>
              <span>Learn </span>
              <a
                className="App-link"
                href="https://reactjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React
              </a>
              <span>, </span>
              <a
                className="App-link"
                href="https://redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux
              </a>
              <span>, </span>
              <a
                className="App-link"
                href="https://redux-toolkit.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux Toolkit
              </a>
              ,<span> and </span>
              <a
                className="App-link"
                href="https://react-redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React Redux
              </a>
            </span>
          </header> */}
        </div>
    </Router>
  );
}

export default App;
