import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const URL="https://2pkvb43g77.execute-api.eu-central-1.amazonaws.com/prod"
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


