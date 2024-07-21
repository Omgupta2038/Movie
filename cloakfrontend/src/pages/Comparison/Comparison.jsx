import './comparison.scss'
import { useState } from 'react'
import { AddCircleOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import axios from "axios"

const Comparison = () => {

    const [searchLeft, setSearchLeft] = useState("") // used for search bar
    const [moviesLeft, setMoviesLeft] = useState([]) // used for movie slider
    const [moviesLeftCompare, setMoviesLeftCompare] = useState({}) // used to store info once + button is clicked

    const [searchRight, setSearchRight] = useState("")
    const [moviesRight, setMoviesRight] = useState([])
    const [moviesRightCompare, setMoviesRightCompare] = useState({})

    const handleChangeLeft = (e) => {
        axios.post('http://localhost:4000/search', {
            search: `${searchLeft}`
        })
            .then((response) => {
                setMoviesLeft([...response.data])
            })
            .catch((error) => {
                console.log(error);
            });

    }
    const handleChangeRight = (e) => {
        axios.post('http://localhost:4000/search', {
            search: `${searchRight}`
        })
            .then((response) => {
                setMoviesRight([...response.data])
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const leftCompare = (id) => {
        axios.post('http://localhost:4000/movie', {
            id: `${id}`
        })
            .then((response) => {
                console.log(response.data)
                setMoviesLeftCompare(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const rightCompare = (id) => {
        axios.post('http://localhost:4000/movie', {
            id: `${id}`
        })
            .then((response) => {
                setMoviesRightCompare(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="comparison">
            <div className="comparison__wrapper">
                <div className="compare__block">
                    <h1>CHOOSE MOVIE TO COMPARE</h1>
                    <div className="search__wrapper">
                        <form
                            className="search__form"
                            onChange={handleChangeLeft}
                            onSubmit={e => {
                                e.preventDefault()
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Search"
                                id="search"
                                className="input__search__form"
                                onChange={e => setSearchLeft(e.target.value)}
                            />
                        </form>
                    </div>
                    <div className="searchslider">
                        {
                            moviesLeft.map((movie, index) => {
                                return (
                                    <div className="movie">
                                        <div className="movie__image__container">
                                            {
                                                movie.poster_path == null ?
                                                    <img
                                                        src="https://www.medstartr.com/main/images/no-image.png"
                                                        alt="no img"
                                                        className="movie__img"
                                                    />
                                                    :
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                        alt="no img"
                                                        className="movie__img"
                                                    />
                                            }
                                            <div className="circle__button">
                                                <IconButton
                                                    onClick={() => leftCompare(movie.id)}
                                                >
                                                    <AddCircleOutlined style={{ fontSize: 90, color: 'white' }} ></AddCircleOutlined>
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="compare__info">
                        {
                            moviesLeftCompare.title &&
                            <h1 className="info__title">{moviesLeftCompare.title}</h1>
                        }
                        {
                            moviesLeftCompare.release_date &&
                            <div className="fetched__data">
                                <div className="data__subheading">RELEASE DATE </div>
                                <img src="./Assets/Images/dateicon.png" alt="date icon" />
                                <div className="pulled__data"> {moviesLeftCompare.release_date}</div>
                            </div>
                        }
                        {
                            moviesLeftCompare.vote_average &&
                            <div className="fetched__data">
                                <div className="data__subheading">RATING </div>
                                <img src="./Assets/Images/staricon.png" alt="star icon" />
                                <div className="pulled__data"> {moviesLeftCompare.vote_average}</div>
                            </div>
                        }
                        {
                            moviesLeftCompare.vote_count &&
                            <div className="fetched__data">
                                <div className="data__subheading">VOTE COUNT </div>
                                <img src="./Assets/Images/personicon.png" alt="star icon" />
                                <div className="pulled__data"> {moviesLeftCompare.vote_count}</div>
                            </div>
                        }
                        {
                            moviesLeftCompare.runtime &&
                            <div className="fetched__data">
                                <div className="data__subheading"> RUNTIME </div>
                                <img src="./Assets/Images/movieicon.png" alt="star icon" />
                                <div className="pulled__data"> {(moviesLeftCompare.runtime / 60).toFixed().toString() + " hours " + (moviesLeftCompare.runtime % 60).toFixed().toString() + " minutes"}</div>
                            </div>
                        }
                        {
                            moviesLeftCompare.popularity &&
                            <div className="fetched__data">
                                <div className="data__subheading">POPULARITY</div>
                                <img src="./Assets/Images/popularityicon.png" alt="star icon" />
                                <div className="pulled__data"> {moviesLeftCompare.popularity}</div>
                            </div>
                        }
                        {
                            moviesLeftCompare.genres &&
                            <div className="fetched__data">
                                <div className="data__subheading">GENRES</div>
                                <img src="./Assets/Images/genreicon.png" alt="star icon" />
                                <div className="pulled__data">
                                    {
                                        moviesLeftCompare.genres.map((element) => (
                                            (element.name + " ").toString()
                                        ))
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="compare__block left__border">
                    <h1>CHOOSE MOVIE TO COMPARE</h1>
                    <div className="search__wrapper">
                        <form
                            className="search__form"
                            onChange={handleChangeRight}
                            onSubmit={e => {
                                e.preventDefault()
                            }}
                        >
                            <input
                                type="text"
                                placeholder="search"
                                id="search"
                                className="input__search__form"
                                onChangeCapture={(e) => setSearchRight(e.target.value)}
                            />
                        </form>
                    </div>
                    <div className="searchslider">
                        {
                            moviesRight.map((movie, index) => {
                                return (
                                    <div className="movie">
                                        <div className="movie__image__container">
                                            {
                                                movie.poster_path == null ? <img src="https://www.medstartr.com/main/images/no-image.png" alt="no img" className="movie__img" /> : <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="no img" className="movie__img" />
                                            }
                                            <div className="circle__button">
                                                <IconButton
                                                    onClick={e => rightCompare(movie.id)}
                                                >
                                                    <AddCircleOutlined style={{ fontSize: 90, color: 'white' }}></AddCircleOutlined>
                                                </IconButton>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="compare__info">
                        {
                            moviesRightCompare.title &&
                            <h1 className="info__title">{moviesRightCompare.title}</h1>
                        }
                        {
                            moviesRightCompare.release_date &&
                            <div className="fetched__data">
                                <div className="data__subheading">RELEASE DATE </div>
                                <img src="./Assets/Images/dateicon.png" alt="date icon" />
                                <div className="pulled__data"> {moviesRightCompare.release_date}</div>
                            </div>
                        }
                        {
                            moviesRightCompare.vote_average &&
                            <div className="fetched__data">
                                <div className="data__subheading">RATING </div>
                                <img src="./Assets/Images/staricon.png" alt="star icon" />
                                <div className="pulled__data"> {moviesRightCompare.vote_average}</div>
                            </div>
                        }
                        {
                            moviesRightCompare.vote_count &&
                            <div className="fetched__data">
                                <div className="data__subheading">VOTE COUNT </div>
                                <img src="./Assets/Images/personicon.png" alt="star icon" />
                                <div className="pulled__data"> {moviesRightCompare.vote_count}</div>
                            </div>
                        }
                        {
                            moviesRightCompare.runtime &&
                            <div className="fetched__data">
                                <div className="data__subheading"> RUNTIME </div>
                                <img src="./Assets/Images/movieicon.png" alt="star icon" />
                                <div className="pulled__data"> {(moviesRightCompare.runtime / 60).toFixed().toString() + " hours " + (moviesRightCompare.runtime % 60).toFixed().toString() + " minutes"}</div>
                            </div>
                        }
                        {
                            moviesRightCompare.popularity &&
                            <div className="fetched__data">
                                <div className="data__subheading">POPULARITY</div>
                                <img src="./Assets/Images/popularityicon.png" alt="star icon" />
                                <div className="pulled__data"> {moviesRightCompare.popularity}</div>
                            </div>
                        }
                        {
                            moviesRightCompare.genres &&
                            <div className="fetched__data">
                                <div className="data__subheading">GENRES</div>
                                <img src="./Assets/Images/genreicon.png" alt="star icon" />
                                <div className="pulled__data">
                                    {
                                        moviesRightCompare.genres.map((element) => (
                                            (element.name + " ").toString()
                                        ))
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comparison