import React, { Component } from 'react';
import './App.css';

class TotalExpenses extends Component {
    constructor(){
        super();
        this.state={
            debit:[],
            credit:[]
        }
    }

 componentWillMount(){
     let debitors=[];
     let creditors=[];
     let expenditures=[];
     let expenditures_trip=[];
     let count=0;
     let index=0;
     let total=0;
     for (let key in this.props.expenses) {
         if (this.props.expenses.hasOwnProperty(key)) {
             expenditures.push(this.props.expenses[key]);
         }
     }

     expenditures.map((item)=>{
         if(item.trip === this.props.tripTo) {
             expenditures_trip.push(item)
         }
     });

     expenditures_trip.map((item)=>{
         if(item.trip === this.props.tripTo){
             total=total+parseInt(item.amount);
             if( item.email  === this.props.user){
                 count=count+parseInt(item.amount);
             }
         }
     });
     console.log("total expenditure :", total);
     console.log("by me:",count);

     let Array1=this.props.myFriend;
     let Array2=expenditures_trip;

     for (let i = 0; i<Array2.length; i++) {

         for (let j = 0; j<Array1.length; j++) {
             let one =Array2[i].spend_by;
             let two = Array1[j].friend;
             if ( one === two ) {
                 Array1 = Array1.slice(0, j).concat(Array1.slice(j+1, Array1.length));
             }
         }
     }
     console.log("!!!!!!!!!array1",Array1);

     let balance=total/(this.props.myFriend.length+1);
     for(let i=0;i<Array1.length;i++){
         debitors.push({name:Array1[i].friend,amount:balance});
     }

     if(count === 0){
         debitors.push({name:'pooja',amount:balance})
     }

     // console.log("debitors-------",debitors);
     expenditures_trip.map((item)=>{
         let per_balance =  balance - item.amount ;
         if(per_balance<0)
             creditors.push({name:item.spend_by,amount:-per_balance});
         else
             debitors.push({name:item.spend_by,amount:per_balance});
     });
     console.log("debitors----",debitors);
     console.log("creditors-----",creditors);


     //maintain account
     let accounts=[];let i=0;let j=0;
     while(i<creditors.length&&j<debitors.length){
         if(creditors[i].amount<debitors[j].amount){
             debitors[j].amount=debitors[j].amount-creditors[i].amount;
             console.log(debitors[j].name," will give ",creditors[i].name," ",creditors[i].amount);
             accounts.push({debitor:debitors[j].name,creditor:creditors[i].name,amount:creditors[i].amount});
             creditors[i]=0;
             i++
         }else{
             creditors[i].amount=creditors[i].amount- debitors[j].amount;
             accounts.push({debitor:debitors[j].name,creditor:creditors[i].name,amount:debitors[j].amount});
             console.log(debitors[j].name," will give ",creditors[i].name," ",debitors[j].amount);
             debitors[j]=0;
             j++;
         }
     }
     this.setState({
         debit:accounts
     },()=>{
         console.log("debiotrs are :",this.state.debit)
     })
 }

 pay(a){
     console.log("value is:",a);

 }

 /*onClear(){

 }*/

    render() {
        return (
            <div className="totalExpense">
                <div className="myExpenses">My Expense</div>
                {
                    this.state.debit.map((item)=>{
                        if(item.debitor === 'pooja'){
                            return(
                                <div>
                                    <p>{item.debitor+" => "+item.creditor+" amount "+item.amount}</p>
                                    <button onClick={this.pay.bind(this,item)}>Pay</button>
                                </div>
                            )
                        }else if(item.creditor === 'pooja'){
                            return(
                                <div>
                                    <p>{item.debitor+" => "+item.creditor+" amount "+item.amount}</p>
                                    <button >Clear</button>
                                </div>
                            )
                        }

                    })
                }
            </div>
        );
    }
}

export default TotalExpenses;
