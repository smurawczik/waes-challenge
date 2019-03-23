import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers/reducers';

const state = {
	highlights: [], mainTextareaValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Haec bene dicuntur, nec ego repugno, sed inter sese ipsa pugnant. Sed venio ad inconstantiae crimen, ne saepius dicas me aberrare; Urgent tamen et nihil remittunt. Sed ne, dum huic obsequor, vobis molestus sim.",
};

export default function configureStore(initialState = state) {
 return createStore(
   reducers,
   initialState,
   applyMiddleware(thunk)
 );
}