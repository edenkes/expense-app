import React from "react";
import moment from "moment";
import {SingleDatePicker} from "react-dates";
import 'react-dates/lib/css/_datepicker.css'

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? props.expense.createdAt : moment(),
            buttonText: props.buttonText,
            error: '',
            calendarFocused: false
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState({description})
    }
    onNoteChange = (e) => {
        const note = e.target.value
        this.setState({note})
    }
    onAmountChange = (e) => {
        const amount = e.target.value
        if (amount.match(/^\d{0,10}(\d\.\d{0,2})?$/)) {
            this.setState({amount})
        }
    }
    onDateChange = (createdAt) => {
        if (createdAt){
            this.setState({createdAt})

        }
    }
    onFocusChange = ({focused}) => {
        this.setState({calendarFocused: focused})
    }
    onSubmit = (e) => {
        e.preventDefault()

        if (!this.state.description || !this.state.amount){
            this.setState({error: "must give description and amount!"})
        }else {
            this.setState({error: ""})
        }

        this.props.onSubmit({
            description: this.state.description,
            note: this.state.note,
            amount: parseFloat(this.state.amount) * 100,
            createdAt: this.state.createdAt,
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label >description</label>
                    <input type="text"
                           placeholder="description"
                           id="description"
                           value={this.state.description}
                           onChange={this.onDescriptionChange}
                    /><br/>

                    <label >note</label>
                    <textarea placeholder="note" id="note"
                              value={this.state.note}
                              onChange={this.onNoteChange}/><br/>

                    <label >amount</label>
                    <input type="text" placeholder="amount" id="amount"
                           value={this.state.amount}
                           onChange={this.onAmountChange}

                    /><br/>


                    <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={()=>false}
                    /><br/>
                    <button type="submit" value="Submit">{this.state.buttonText}</button>
                </form>
                <div>
                    {this.state.error}
                </div>
            </div>
        )
    }
}