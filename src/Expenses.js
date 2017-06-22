import React, { Component } from 'react';
import './App.css';

class Expenses extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let expenditures =[];
        let index=0;
        for (let key in this.props.expenses) {
            if (this.props.expenses.hasOwnProperty(key) ) {
                expenditures.push(this.props.expenses[key]);
            }
        }

        return (
            <div className="expense">
                <table >
                    <tr>
                        <th>Expense By</th>
                        <th>Item</th>
                        <th>Amount</th>
                    </tr>
                    {expenditures.map((item)=> {
                        if(item.trip === this.props.tripTo){
                            return(
                                <tr key={index++}>
                                    <td>{item.spend_by}</td>
                                    <td>{item.title}</td>
                                    <td>{item.amount}</td>
                                </tr>
                            )
                        }
                     })
                    }
                </table>
            </div>
        );
    }
}

export default Expenses;
