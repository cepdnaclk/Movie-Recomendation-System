import React, { useEffect, useState } from 'react';
import { PRIMARY_INFO_FOR_MOVIE_API, MOVIE_ID } from '../api/movieDataBase';

export const Modal = (props) => {

    const {movie, onClickModalContainer} = props;
    
    const [moreMovieInfo, setMoreMovieInfo] = useState();


    let url = PRIMARY_INFO_FOR_MOVIE_API;
    // console.log(url);
    let finalURL = url.replace(MOVIE_ID, movie.id);
    // console.log(finalURL);

    useEffect(() => {

        fetch(finalURL)
            .then(response => {
                if (!response.ok) {
                    setMoreMovieInfo(null);
                    return null;
                }
                return response.json()
            }
            )

            .then(data => {
                console.log('Prime info >', data);
                if (data)
                    setMoreMovieInfo(data);
            })
            .catch(error => {
                console.log('Cannot fetch URL');
            });
    }, [finalURL]);

    return (
        <div className="movie_detail_container" onClick={onClickModalContainer}>
            <img className="cancel_image_button" src='close.png' alt='close button' />
    
            <section className="movie_details">
                <img className="movie_poster" src={movie.finalPoster} alt={movie.title + ' MoviePosterImage'} />
                <div className="movie_information">
                    <h1> {movie.title} </h1>
                    <h4>Type: {movie.media_type}</h4>
                    {moreMovieInfo && <>
                        <h4> Genre </h4>
                        <ul>
                            {
                                moreMovieInfo && moreMovieInfo.genres.map(genre => {
                                    return (
                                        <li key={genre.id} > {genre.name}</li>
                                    )
                                })
                            }
                        </ul>
                        <a href={moreMovieInfo.homepage}>Watch Trailer here </a>
                        <h4>Release Date: {movie.release_date}</h4>
                    </>
                    }
                    <h4>Avg Rating: {movie.vote_count}</h4>
                    <h4>Popularity: {movie.popularity}</h4>
                    <h4>Original Language: {movie.original_language}</h4>
                    <p className = "summary"> <strong>Summary</strong> : {movie.overview} </p>
                </div>
            </section>
        </div>
    )
}

