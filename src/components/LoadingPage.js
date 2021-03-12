import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startAddExpense} from '../actions/expenses';

const LoadingPage = () => (
    <div className={"loader"}>
        <img className={"loader__image"} src={"/images/loader.gif"}/>
    </div>
)
export default LoadingPage;