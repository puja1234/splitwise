import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar'

class SpecificExpense extends Component {
    render() {
        return (
            <div className="mainContainer">
                <div className="navbar">
                    <div className="logo">SPLITWISE</div>
                    <img className="userImage" src="https://en.opensuse.org/images/0/0b/Icon-user.png"/>
                </div>
                <Navbar/>

            </div>
        );
    }
}

export default SpecificExpense;
