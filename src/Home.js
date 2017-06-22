import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase'
import Expenses from './Expenses'
import TotalExpenses from './TotalExpenses'

class Home extends Component {
    constructor(){
        super();
        this.state={
            expense:'',
            title:'',
            amount:0,
            spend_by:'',
            email:'',
            trip:'',
            tripTo:'',
            view:false
        }
    }

    componentWillMount(){
        let by = this.props.user;
        let rootRef = firebase.database().ref().child('expenses');
        rootRef.orderByChild("posted_by").equalTo(by).on('value', snap => {
            this.setState({
               expense:snap.val()
            },()=>{
                console.log('*******',this.state.expense);
            })
        });
        rootRef.on('child_added', snap => {
            console.log('****child added',snap.val());
        });
    }

    changeHandler(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    clickHandler(){
        this.setState({view:true})
    }

    submit(event) {//check here is friend is not in friends
        event.preventDefault();
        let regex=/^[0-9]{1,10}$/;
        if(this.state.email==''||this.state.spend_by==''||this.state.amount==''||this.state.title==''){
            alert("Fields cannot be empty!!!")
        }else if(regex.test(this.state.amount)==false){
            alert("Amount should be a number only")
        }else {
            let expense_by = this.state.spend_by;
            let rootRef = firebase.database().ref().child('expenses');
            let friendRef = firebase.database().ref().child('friends');
            friendRef.orderByChild("friend").equalTo(expense_by).on('value', snap => {
                if (snap.val()) {
                    if (this.state.title.length !== 0 && this.state.amount.length !== 0) {
                        rootRef.push().set({
                            title: this.state.title,
                            amount: this.state.amount,
                            spend_by: this.state.spend_by,
                            posted_by: this.props.user,
                            email: this.state.email,
                            trip:this.state.trip
                        });
                        this.setState({
                            title: '',
                            amount: '',
                            spend_by: '',
                            email: '',
                            trip:''
                        });
                    } else {
                        alert("Fields cannot be empty!!!")
                    }
                } else {
                    alert("First add your friend in Friends list!!!")
                }
            });
        }
    }

    render() {
        return (
            <div >
                <div className="home">
                    <div className="writeExpense">
                        <div className="bottom text-center">
                             <a href="#" data-toggle="modal" data-target="#modalBill"><b>Add Bill</b></a>
                        </div>

                        <div id="modalBill" className="modal fade register-modal" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        <h4 className="modal-title register-tag">Bill Generator</h4>
                                    </div>
                                    <div className="modal-body">
                                       Person's Name: <input type="text"
                                               value={this.state.spend_by}
                                               name="spend_by"
                                               placeholder="Enter Person's name"
                                               onChange={this.changeHandler.bind(this)}
                                        />
                                       Person's email: <input type="text"
                                               value={this.state.email}
                                               name="email"
                                               placeholder="Enter Person's email"
                                               onChange={this.changeHandler.bind(this)}
                                               required="true"
                                        />
                                        Spend on:<input type="text"
                                               value={this.state.title}
                                               name="title"
                                               placeholder="Title"
                                               onChange={this.changeHandler.bind(this)}
                                        />
                                        Trip to :<input type="text"
                                               value={this.state.trip}
                                               name="trip"
                                               placeholder="Enter Your Trip to"
                                               onChange={this.changeHandler.bind(this)}
                                        />
                                        Amount :<input type="text"
                                               value={this.state.amount}
                                               name="amount"
                                               placeholder="Amount"
                                               onChange={this.changeHandler.bind(this)}
                                        />
                                        <button onClick={this.submit.bind(this)}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="tripName">
                        <input type="text"
                               value={this.state.tripTo}
                               name="tripTo"
                               placeholder="Enter Trip name to see Expenditures on"
                               onChange={this.changeHandler.bind(this)}
                        />
                        <button onClick={this.clickHandler.bind(this)}>See</button>
                    </div>
                    {
                        this.state.view ?
                            <Expenses expenses={this.state.expense} tripTo={this.state.tripTo}/>
                            :
                            <img src="https://static01.nyt.com/images/2012/02/25/business/MONEY/MONEY-jumbo.jpg" className="friendsImage2"/>
                    }

            </div>
                {
                    this.state.view ?
                        <TotalExpenses expenses={this.state.expense} myFriend={this.props.myFriend} tripTo={this.state.tripTo} user={this.props.user}/>:''
                }
            </div>
        );
    }
}

export default Home;
