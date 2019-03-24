import React from 'react';
import { shallow, mount } from 'enzyme';
import { Highlight } from './index.js';

describe('Highlight Component', () => {
	const props = {
		onTextareaChange: jest.fn(),
		mainTextareaValue: "textarea value",
	};

	it('renders highlight and its elements', () => {
	  const wrapper = shallow(<Highlight {...props} />, { disableLifecycleMethods: true });
	  const mainContainer = ".highlight";

	  expect(wrapper.find(mainContainer).exists()).toEqual(true);
	  expect(wrapper.find(".highlight--container").exists()).toEqual(true);
	  expect(wrapper.find(".highlight--textarea").exists()).toEqual(true);
	});

	it('renders highlight buttons', () => {
	  const wrapper = shallow(<Highlight {...props} />, { disableLifecycleMethods: true });

	  expect(wrapper.find(".highlight--selectors").children().length).toBe(3);
	});

	it('renders "textarea value" on textarea', () => {
	  const wrapper = mount(<Highlight {...props} />);

	  expect(wrapper.find(".highlight--textarea").getDOMNode().value).toEqual("textarea value");
	});
})