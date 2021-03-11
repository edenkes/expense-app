import configureStore from 'redux-mock-store' //ES6 modules
import thunk from "redux-thunk";
import {
    addExpense,
    editExpense,
    removeExpense,
    setExpenses,
    startAddExpense,
    startEditExpense,
    startRemoveExpense,
    startSetExpenses
} from '../../actions/expenses';
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureStore([thunk])

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = {description, note, amount, createdAt}
    });
    database.ref('expenses').set(expensesData).then(() => done());
})

test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});


test('should remove expense to database and store', (done) => {
    const store = createMockStore({});

    store.dispatch(startRemoveExpense(expenses[1])).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: expenses[1].id
        })
        return database.ref(`expenses`).once('value');
    }).then((snapshot) => {
        const firebaseExpenses = [];
        snapshot.forEach((snapshotChild) => {
            firebaseExpenses.push({
                id: snapshotChild.key,
                ...snapshotChild.val()
            })
        })
        expect(firebaseExpenses).toEqual([expenses[0], expenses[2]]);
        done();
    }, (e) => {
        expect("").toBe(e.message);
        done();
    })
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', {note: 'New note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    });
});


test('should edit expense on database and store', (done) => {
    const store = createMockStore({});
    const updates = {
        description: expenses[1].description
    };
    const id = expenses[0].id
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        })
        return database.ref(`expenses/${actions[0].id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().description).toEqual(expenses[1].description);
        expect(snapshot.val().value).toEqual(expenses[0].value);
        done();
    })
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: "cof",
        amount: 10,
        note: "empty note",
        createdAt: 3000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: "",
        amount: 0,
        note: "",
        createdAt: 0
    };

    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
});

test('should setup set expense action object with data ', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
});


test('should fetch the expenses from database', (done) => {
    const store = createMockStore({});

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })
        return database.ref(`expenses`).once('value');
    }).then((snapshot) => {
        const firebaseExpenses = [];
        snapshot.forEach((snapshotChild) => {
            firebaseExpenses.push({
                id: snapshotChild.key,
                ...snapshotChild.val()
            })
        })
        expect(firebaseExpenses).toEqual(expenses);
        done();
    }, (e) => {
        expect("").toBe(e.message);
        done();
    })
});