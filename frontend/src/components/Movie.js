import React from 'react';
import {IMAGES_API} from "../api/movieDataBase"


const Movie = (props) =>{

    const {movieData, handleOnMovieClick} = props;
    
    const posterCode = movieData.poster_path;
    const poster = IMAGES_API+posterCode;
    const randomPoster = "https://images.unsplash.com/photo-1534267933751-06d5943f27f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80"
    const finalPoster = posterCode?poster:randomPoster;

    const setVoteClass = (vote) =>{
        if(vote >= 8){
            return "green";
        } else if(vote >= 6){
            return "orange";
        }else{
            return "red";
        }
    };

    return(

        <div className = "movie-component" onClick = {() => handleOnMovieClick(movieData, finalPoster)}>
            <img src = { finalPoster }
            alt = {movieData.title} />
            
            <div className = "movie-information" >
                <h3>{ movieData.title || movieData.name}</h3>
                <span className = {`tag ${setVoteClass(movieData.vote_average)}`} >
                    { movieData.vote_average }
                </span>
            </div>

            <div className = "movie-overview">
                <h2><strong>Overview</strong></h2>
                <p>{movieData.overview}</p>

            </div>
        </div>
    )
};

export default Movie;