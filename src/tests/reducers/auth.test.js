import authReducer from "../../reducers/auth";

test('should setup default auth values', () => {
    const state = authReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({});
});

test('should set uid for login', () => {
    const uid = '1'
    const action = {
        type: 'LOGIN',
        uid
    }
    const state = authReducer(undefined, action);
    expect(state).toEqual({uid});
})

test('should reset uid for logout', () => {
    const uid = '1'
    const action = {
        type: 'LOGOUT',
    }
    const state = authReducer({uid}, action);
    expect(state).toEqual({});
})