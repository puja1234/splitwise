import React, { Component } from 'react';
import './App.css';
import Login from './Login'

class App extends Component {
  render() {
    return (
       <div className="mainContainer">
           <div className="navbar">
               <div className="logo">SPLITWISE</div>
               <img className="userImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC4Ammc_cwp2lqbkJQzf9r3NaiwdaVqjgka1B56cQuxqrA4D4b"/>
           </div>
           <Login />
      </div>
    );
  }
}

export default App;
