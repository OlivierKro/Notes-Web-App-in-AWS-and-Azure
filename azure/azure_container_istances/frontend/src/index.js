import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const URL="https://notes-webapp.lemonflower-c4cb3782.germanywestcentral.azurecontainerapps.io"
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
