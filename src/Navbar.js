import React, { Component } from 'react';
import './App.css';
import Home from './Home'
import * as firebase from 'firebase'

class Navbar extends Component {
    constructor(){
        super();
        this.state={
            friend_name:'',
            email:'',
            friends:'',
            trip:''
        }
    }

    componentWillMount(){
        let by = this.props.user;
        let rootRef = firebase.database().ref().child('friends');
        rootRef.orderByChild("posted_by").equalTo(by).on('value', snap => {
            this.setState({
                friends:snap.val()
            },()=>{
                console.log("###########3",this.state.friends)
            })
        });
        rootRef.on('child_added', snap => {
            console.log('****child added',snap.val());
        });
    }

    logOut(){
        firebase.auth().signOut();
    }

    onChangeHandler(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submit(event){
        event.preventDefault();
        let rootRef = firebase.database().ref().child('friends');
        if (this.state.friend_name.length !==0 || this.state.trip.length !==0 || this.state.email.length !==0) {
            rootRef.push().set({
               friend:this.state.friend_name,
                email:this.state.email,
                posted_by:this.props.user,
                trip:this.state.trip
            });
            this.setState({
               friend_name:'',
                email:'',
                trip:''
            });
        }
    }

    render() {
        let my_friends=[];
        let index=0;
        for (let key in this.state.friends) {
            if (this.state.friends.hasOwnProperty(key) ) {
                my_friends.push(this.state.friends[key]);
            }
        }


        return (
            <div>
                <div className="navContainer">
                    <div>
                        <img className="friendsImage" src="https://en.opensuse.org/images/0/0b/Icon-user.png"/>
                        <button className="signInButton" onClick={this.logOut.bind(this)}>LogOut</button>
                        <div className="myEmail"><label>{this.props.user}</label></div>
                    </div>
                    <div>
                        <img className="allExpense" src="http://images.freeimages.com/images/premium/previews/5758/57581642-shopping-credit-card-flat-icon-with-long-shadow-eps10.jpg"/>
                        <div className="allExpenseLink"><a href="/">All expenses </a></div>
                        <input className="friends"
                               type="text"
                               placeholder="Enter Friend's name"
                               name="friend_name"
                               onChange={this.onChangeHandler.bind(this)}
                               value={this.state.friend_name}/>
                        <input className="friends"
                               type="text"
                               name="email"
                               placeholder="Enter Friend's email"
                               onChange={this.onChangeHandler.bind(this)}
                               value={this.state.email}/>
                        <input className="friends"
                               type="text"
                               name="trip"
                               placeholder="Enter trip"
                               onChange={this.onChangeHandler.bind(this)}
                               value={this.state.trip}/>
                        <button onClick={this.submit.bind(this)}>Add</button>
                       {my_friends.map((item)=>{
                            return(
                                <div key={index++}>
                                    <img className="friendsImage" src="https://en.opensuse.org/images/0/0b/Icon-user.png"/>
                                    <div className="friendsLink">{item.friend}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Home user={this.props.user} myFriend={my_friends}/>
            </div>
        );
    }
}

export default Navbar;
