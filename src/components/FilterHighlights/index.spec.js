import React from 'react';
import { shallow, mount } from 'enzyme';
import { FilterHighlights } from './index.js';

describe('FilterHighlights Component', () => {
	const props = {
		highlights: [
			{
				color: 'red',
				value: 'val'
			}
		],
	};

	it('renders filter highlights and its elements', () => {
	  const wrapper = shallow(<FilterHighlights {...props} />, { disableLifecycleMethods: true });

	  expect(wrapper.find(".filter-highlights").exists()).toEqual(true);
	  expect(wrapper.find(".filter-highlights--filter-buttons").exists()).toEqual(true);
	  expect(wrapper.find(".filter-highlights--filtered").exists()).toEqual(true);
	});

	it('renders filter highlight buttons', () => {
	  const wrapper = shallow(<FilterHighlights {...props} />, { disableLifecycleMethods: true });

	  expect(wrapper.find(".filter-highlights--filter-buttons").children().length).toBe(3);
	});

	it('renders red highlights', () => {
	  const wrapper = mount(<FilterHighlights {...props} />);

	  wrapper.find(".filter-highlights--filter-button-red").simulate('click');

	  expect(wrapper.find(".filter-highlights--filtered").children().length).toEqual(1);
	});

	it('renders NONE green highlights', () => {
	  const wrapper = mount(<FilterHighlights {...props} />);

	  wrapper.find(".filter-highlights--filter-button-green").simulate('click');

	  expect(wrapper.find(".filter-highlights--filtered").children().length).toEqual(0);
	});
})