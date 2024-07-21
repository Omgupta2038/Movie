import './searchlist.scss'
import React, { Fragment } from 'react'
import Movie from '../Movie/Movie'

const SearchList = (props) => {
    return (
        <div className="searchlist">
        {
            props.movies.map((movie, index) => {
                return(
                    <Fragment>
                        <Movie 
                            key={index} 
                            image={movie.poster_path} 
                            title={movie.title} 
                            date={movie.release_date} 
                            popularity={movie.popularity} 
                            vote_count={movie.vote_count} 
                            vote_average={movie.vote_average} 
                            id ={movie.id} 
                            watched={props.watched}
                        >
                        </Movie>
                    </Fragment>
                )
            })
        }
        </div>
    )
}

export default SearchList
