import React from 'react';
import ReactDOM from 'react-dom';
import './pages/Index/index.css';
import App from './pages/App/App';
import reportWebVitals from './utils/reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
