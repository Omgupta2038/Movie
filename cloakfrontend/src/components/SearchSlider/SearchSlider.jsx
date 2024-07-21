import './searchslider.scss'
import Movie from '../Movie/Movie'

const SearchSlider = (props) => {
    return (
        <div className="searchslider">
            {
                props.movies.map((movie, index) => {
                    return(
                        <Movie key={index} image={movie.poster_path}></Movie>
                    )
                })
            }
        </div>
    )
}

export default SearchSlider
