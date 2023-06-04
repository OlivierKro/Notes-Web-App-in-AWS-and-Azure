import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const URL="http://3.66.227.224"
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
