import React, { useState, useEffect } from 'react';
import axios from '../axios';
import requests from '../requests';
import '../components/Banner.scss';

function Banner() {
	const [movie, setMovie] = useState([]);
	const base__url = 'https://image.tmdb.org/t/p/original/';

	const truncStr = (str, n) => {
		return str?.length > n ? str.slice(0, n - 1) + '...' : str;
	};

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests.fetchNetflixOriginals);

			const randMovie = request.data.results.map((el) => {
				if (el.backdrop_path) return el;
			})[Math.floor(Math.random() * request.data.results.length)];
			// console.log(randMovie);
			setMovie(randMovie);
		}

		fetchData();
	}, []);

	return (
		<header
			className="banner"

			// style={{
			// 	backgroundImage: `url(${base__url}${movie?.backdrop_path})`,
			// }}
		>
			<div className="banner__contents">
				<h1>{movie?.title || movie?.name || movie?.original_name}</h1>
				<div className="banner__buttons">
					<button className="banner__button">Play</button>
					<button className="banner__button">My List</button>
				</div>
				<p className="banner__description">
					{truncStr(movie?.overview, 120)}
				</p>
			</div>
			{
				<div className="banner__container">
					<img
						src={`${base__url}${movie?.backdrop_path}`}
						alt="poster"
					/>
				</div>
			}
			<div className="banner--fadeBottom"></div>
		</header>
	);
}

export default Banner;
