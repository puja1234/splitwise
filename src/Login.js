import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar'
import * as firebase from 'firebase'
import Footer from './Footer'

class Login extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            user:'',
            err:''
        }
    }

    changeHandler(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    login() {
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(this.state.email, this.state.password);
        promise.then(
            firebase.auth().onAuthStateChanged(User => {
                if (User) {
                    this.setState({
                        user: User
                    },()=>{
                        console.log("**********",this.state.user.email)
                    });
                } else {
                    this.setState({
                        user: ''
                    })
                }
            })
        ).catch(e=>{
            this.setState({
                err:'You are not Registered!!! '
            })
        })
    }

    signIn(){
        const auth=firebase.auth();
        const promise=auth.createUserWithEmailAndPassword(this.state.email,this.state.password);
        promise.catch(e=>{
            console.log(e.message)
        });

        firebase.auth().onAuthStateChanged(User => {
            if(User){
                this.setState({
                    user:User
                });
            }else{
                this.setState({
                    user:''
                })
            }
        })
    }



    render() {
        return (
            <div className="login">
                {this.state.user ?
                    <div>
                        <Navbar user={this.state.user.email}/>
                        <Footer />
                    </div>
                    :
                    <div className="loginForm">
                        {this.state.err}
                        <div className="imgcontainer">
                            <img src="https://en.opensuse.org/images/0/0b/Icon-user.png" alt="Avatar" className="avatar"/>
                        </div>
                        <div className="container">
                            <div><label><b>Username</b></label></div>
                            <input className="emailInput"
                                   type="text"
                                   placeholder="Enter email"
                                   name="email"
                                   value={this.state.email}
                                   onChange={this.changeHandler.bind(this)}
                            />
                             <div><label><b>Password</b></label></div>
                            <input type="password"
                                   className="pswdInput"
                                   placeholder="Enter Password"
                                   name="password"
                                   value={this.state.password}
                                   onChange={this.changeHandler.bind(this)}
                            />
                            <div className="login">
                                <button className="loginButton" onClick={this.login.bind(this)}>Login</button>
                                <button className="signInButton" onClick={this.signIn.bind(this)}>Sign In</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Login;
