import React from 'react';
import ExpenseForm from "./ExpenseForm";
import {connect} from "react-redux";
import {addExpense} from "../actions/expenses";


const AddExpensePage = (props) => (
    <div>
        <ExpenseForm
            onSubmit={(expense) => {
                props.dispatch(addExpense(expense))
                props.history.push("/")
            }}
            buttonText="Add Expense :) "/>
    </div>
);

// const onSubmit =

export default connect()(AddExpensePage);
