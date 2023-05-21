import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const URL="http://localhost:7071/api"
const USERNAME = "Test_user"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
    	<App
      		url={URL}
      		username={USERNAME}
    	/>
  	</React.StrictMode>
);
