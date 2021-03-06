import React from 'react';
import {editExpense, removeExpense} from "../actions/expenses";
import {connect} from "react-redux";
import ExpenseForm from "./ExpenseForm";

const EditExpensePage = (props) => {
    return (
        <div>
            <ExpenseForm
                buttonText={"Edit Expense"}
                expense= {props.expense}
                onSubmit={(expense => {
                    props.dispatch(editExpense(props.match.params.id, expense))
                    props.history.push("/")
                })}
            />
            <button onClick={() => {
                props.dispatch(removeExpense({id: props.match.params.id}))
                props.history.push("/")
            }}>Remove
            </button>

        </div>
    );
};

const mapStateToProps = (state, props) =>{
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(EditExpensePage);
