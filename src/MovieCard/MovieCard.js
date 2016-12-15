import React, { PropTypes } from 'react';
import LazyLoad from 'react-lazyload';
import { getAbsImgPath } from '../app/utils';
import MovieRating from '../Movie/MovieRating';
import MovieGenresContainer from '../Movie/MovieGenresContainer';
import MoviePropType from '../Movie/MoviePropType';
import './movieCard.css';

// The empty placeholder
const PlaceHolderMovieCard = () => (
	<MovieCard
		mData={{
			movie: {
				id: '',
				year: '',
				title: '',
				genres: [],
				voteCount: 0,
				voteAverage: 10
			}
		}}
		onClick={() => {}}
		genres={{}}
	/>
);

export const MovieCard = ({mData, onClick}) => (
	<div onClick={onClick} className="movie-card mdl-card mdl-shadow--2dp">
		<div
			className="movie-card__poster mdl-card__media"
			style={{
				backgroundImage:
					mData.movie.posterPath ?
						`url(${getAbsImgPath(mData.movie.posterPath)}),
						url(${process.env.PUBLIC_URL}/static/img/no-poster.png)` :
						`url(${process.env.PUBLIC_URL}/static/img/no-poster.png)`
			}}
		>
		</div>
		<div className="movie-card-content">
			<div className="movie-card-content-title">
				<h2
					className="movie-card-content-title__text"
					title={mData.movie.title}
				>
					{mData.movie.title}
				</h2>
				<div className="movie-card-content-title__subtitle">
					<MovieGenresContainer movieGenres={mData.movie.genres} />
				</div>
			</div>

			<MovieRating
				voteAverage={mData.movie.voteAverage}
				voteCount={mData.movie.voteCount}
			/>
		</div>
	</div>
);

// I had to move this to a separate component, otherwise I couldn't have reused
// the MovieCard in the PlaceHolder component
const LazyMovieCard = ({mData, onClick}) => (
	<LazyLoad
		height={360}
		offset={180}
		debounce={100}
		overflow={true}
		unmountIfInvisible={true}
		placeholder={<PlaceHolderMovieCard />}
	>
		<MovieCard
			mData={mData}
			onClick={onClick}
		/>
	</LazyLoad>
);

MovieCard.propTypes = {
	mData: PropTypes.shape({
		movie: MoviePropType.isRequired
	}).isRequired,
	onClick: PropTypes.func.isRequired
};

export default LazyMovieCard;
