import React, { useState, useEffect } from 'react';
import axios from '../axios';
import requests from '../requests';
import '../components/Banner.scss';

function Banner() {
	const [movie, setMovie] = useState([]);
	const base__url = 'https://image.tmdb.org/t/p/original/';

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests.fetchNetflixOriginals);

			const randMovie =
				request.data.results[
					Math.floor(Math.random() * request.data.results.length)
				];
			console.log(randMovie);
			setMovie(randMovie);
		}

		fetchData();
	}, []);

	return (
		<header
			className="banner"
			style={{
				backgroundImage: `url(${base__url}${movie?.backdrop_path})`,
			}}
		>
			<div className="banner__contents"></div>
			<h1>{movie?.title || movie?.name || movie?.original_name}</h1>{' '}
			{/* <<< Background image */}
			{/* title */}
			{/* div > 2 buttons */}
			{/* description */}
		</header>
	);
}

export default Banner;
