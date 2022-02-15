import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';


export type Props = {
  offersCount: number;
}


ReactDOM.render(
  <React.StrictMode>
    <App offersCount={250} />
  </React.StrictMode>,
  document.getElementById('root'));
