import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import moment from "moment";

const store = configureStore();

store.dispatch(addExpense({description: 'Water bill', amount: 4500, createdAt: moment()}));
store.dispatch(addExpense({description: 'Gas bill', createdAt: moment()}));
store.dispatch(addExpense({description: 'water-Gas2 bill', amount: 500, createdAt: moment()}));


setTimeout(() => {
    store.dispatch(setTextFilter(''));
}, 3000)

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
