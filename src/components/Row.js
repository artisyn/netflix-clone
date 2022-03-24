import React from 'react';
import { useState, useEffect } from 'react';
import axios from '../axios';
import '../components/row.scss';

const base__url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const x = 11;

	// A snippet of code which runs based on a specific condition/variable

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			console.log(request);
			setMovies(request.data.results);
			console.log(movies);
			return request;
		}
		fetchData();
	}, [fetchUrl]);

	return (
		<div className="row">
			<h2>{title}</h2>

			<div className="row__posters">
				{movies.map((movie) => (
					<img
						key={movie.id}
						className={`row__poster ${
							isLargeRow && 'row__posterLarge'
						}`}
						src={
							movie.poster_path
								? `${
										isLargeRow
											? `${base__url}${movie.poster_path}`
											: `${base__url}${movie.backdrop_path}`
								  }`
								: 'https://i.im.ge/2022/03/09/lyUsWa.png'
						}
						alt={movie.name}
					/>
				))}
			</div>
		</div>
	);
}

export default Row;
