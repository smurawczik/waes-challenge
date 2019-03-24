import React from 'react';

const Header = () => {
	return (
		<header className='header'>
			<h1 className='header--title'>Waes Highlighter</h1>
			<h2 className='header--title-instructions'>Instructions to use:</h2>
			<ul className='header--instructions'>
				<li>paste a text or write down whatever you want in the textarea</li> 
				<li>after that you can highlight all that you need and filter your highlights in the lower section</li>
				<li>if text changes, highlighted parts will be removed</li>
				<li>you can't overlap a highlight with another</li>
				<li>but if your highlight completely overrides another one, it will overwrite it</li>
			</ul>
		</header>
	);
}

export default Header;