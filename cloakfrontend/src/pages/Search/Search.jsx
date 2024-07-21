import './search.scss'
import { useState, useEffect } from 'react'
import SearchList from '../../components/SearchList/SearchList'
import axios from 'axios'



const Search = () => {
    const [search, setSearch] = useState("")
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.post('http://localhost:4000/search', {
            search: `${search}`
        })
            .then((response) => {
                setMovies([...response.data])
            })
            .catch((error) => {
                console.log(error);
            });
    }, [search])

    return (
        <div className="search">
            <div className="search__wrapper">
                <form
                    className="search__form"
                    onSubmit={e => {
                        e.preventDefault()
                    }}
                >
                    <input
                        type="text"
                        placeholder="search"
                        id="search"
                        className="input__search__form"
                        onChange={e => setSearch(e.target.value)}
                    />
                </form>
            </div>
            <SearchList movies={movies} watched={true}></SearchList>
        </div>

    )
}

export default Search;
