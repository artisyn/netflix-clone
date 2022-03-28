import React from 'react';
import { useState, useEffect } from 'react';
import axios from '../axios';
import '../components/row.scss';
import YouTube from 'react-youtube';

const base__url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');
	const [selectedMovie, setSelectedMovie] = useState('');

	// A snippet of code which runs based on a specific condition/variable

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			// console.log(request);
			setMovies(request.data.results);
			// console.log(movies);
			return request;
		}
		fetchData();
	}, [fetchUrl]);

	const opts = {
		height: '390',
		width: '100%',
		playerVars: {
			autoplay: 1,
		},
	};

	const handleClick = (movie) => {
		if (selectedMovie === movie) {
			setSelectedMovie('');
			console.log('already selected');
			setTrailerUrl('');
			return;
		}

		setSelectedMovie(movie);
	};
	useEffect(() => {
		if (selectedMovie === '') return;
		console.log(selectedMovie);

		const getMoviebyId = async (id) => {
			const request1 = await axios.get(
				`movie/${id}?api_key=81b5ac86648fd04fe0a5696982f88fc4&append_to_response=videos`
			);
			if (request1.status === 200) {
				// console.log(request1);
				const { videos } = request1.data;
				const trailer = videos.results.filter(
					(video) => video.type === 'Trailer'
				);
				if (trailer.length === 0) return;
				setTrailerUrl(trailer[0].key);
				return;
			}

			const request2 = await axios.get(
				`tv/${id}?api_key=81b5ac86648fd04fe0a5696982f88fc4&append_to_response=videos`
			);
			if (request2.status === 200) {
				const { videos } = request2.data;
				const trailer = videos.results.filter(
					(video) => video.type === 'Trailer'
				);
				if (trailer.length === 0) return;
				setTrailerUrl(trailer[0].key);
				return;
			}
		};

		const id = selectedMovie.id;
		getMoviebyId(id);
	}, [selectedMovie]);

	return (
		<div className="row">
			<h2>{title}</h2>

			<div className="row__posters">
				{movies.map((movie) => (
					<img
						key={movie.id}
						onClick={() => handleClick(movie)}
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
			{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
		</div>
	);
}

export default Row;
