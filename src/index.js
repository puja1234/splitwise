import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDySwiLJNOV6-tYf0v2gXeGcnaFeMfq1hE",
    authDomain: "split-4866c.firebaseapp.com",
    databaseURL: "https://split-4866c.firebaseio.com",
    projectId: "split-4866c",
    storageBucket: "split-4866c.appspot.com",
    messagingSenderId: "127066160224"
};
firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
