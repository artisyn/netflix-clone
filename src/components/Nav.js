import React, { useEffect, useState } from 'react';
import '../components/Nav.scss';

function Nav() {
	const [show, handleShow] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 100) handleShow(true);
			if (window.scrollY < 100) handleShow(false);
		});

		return () => {
			window.removeEventListener('scroll');
		};
	}, []);

	return (
		<div className={`nav ${show && 'nav__dark'}`}>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2014_logo.svg/2560px-Netflix_2014_logo.svg.png"
				alt="netflix logo"
			/>

			<div className="menu">
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

export default Nav;
