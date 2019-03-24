import { hasFreeRange, removableHighlights, highlightsToRange, reducers } from './reducers.js';

describe('Reducers Helpers', () => {
	const highlights1 = [
		{
			id: 1,
			color: 'red',
			start: 0,
			end: 5,
			value: 'lorem ',
		},
		{
			id: 2,
			color: 'green',
			start: 7,
			end: 9,
			value: 'ips',
		},
		{
			id: 5,
			color: 'green',
			start: 15,
			end: 19,
			value: 'asdfg',
		}
	];

	it('converts to range map [start, end]', () => {
		const res = highlightsToRange(highlights1);
	  expect(res).toEqual([[0, 5], [7, 9], [15, 19]]);
	});

	it('removes unnecessary highlights', () => {
		const res = removableHighlights(highlights1, highlights1[2]);
	  expect(res).toEqual([5]);

	  const res2 = removableHighlights(highlights1, {
			id: 8,
			color: 'red',
			start: 22,
			end: 24,
			value: 'lo ',
		});
	  expect(res2).toEqual([]);
	});

	it('verifies if highlights have free range for given payload or not', () => {
		const res = hasFreeRange(highlights1, {
			id: 7,
			color: 'red',
			start: 2,
			end: 4,
			value: 'lo ',
		});
	  expect(res).toEqual(false);

	  const res2 = hasFreeRange(highlights1, {
			id: 8,
			color: 'red',
			start: 22,
			end: 24,
			value: 'lo ',
		});
	  expect(res2).toEqual(true);
	});


})