import React from 'react';
import ReactDOM from 'react-dom/client';
import ChipComponent from './components/ChipComponent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChipComponent />
  </React.StrictMode>
);
