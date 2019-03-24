import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './index.js';

describe('Header Component', () => {

	it('renders header', () => {
	  const wrapper = shallow(<Header />);

	  expect(wrapper.find(".header").exists()).toEqual(true);
	  expect(wrapper.find(".header--title").exists()).toEqual(true);
	  expect(wrapper.find(".header--title-instructions").exists()).toEqual(true);
	});
})