import React from 'react';
import {shallow} from 'enzyme';
import {LoginPage} from "../../components/LoginPage";
import {Header} from "../../components/Header";

test('should correctly render Login Page', () => {
    const wrapper = shallow(<LoginPage startLogin={()=> {}}/>);
    expect(wrapper).toMatchSnapshot();
})


test('should call startLogin on button click ', () => {
    const startLogin = jest.fn();
    const wrapper = shallow(<Header startLogin={startLogin()} />)
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled()
})

