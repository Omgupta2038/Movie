import { useEffect, useState } from 'react'
import axios from 'axios'
import './watched.scss'
import SearchList from '../../components/SearchList/SearchList'

const Watched = () => {
    const [movies, setMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    useEffect(() => {
        axios.post('http://localhost:4000/watchlist', {
            page: currentPage
        })
            .then((response) => {
                console.log(response)
                setMovies([...response.data.results])
                setTotalPage(response.data.totalPage)

            })
            .catch((error) => {
                console.log(error);
            });
    })

    const handleLeftPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleRightPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div className="watched">
            <h1 className="watched__header">WATCHED MOVIES</h1>
            <SearchList movies={movies}></SearchList>
            <div className="watched__pagination">
                <button
                    type="button"
                    onClick={handleLeftPage}
                >
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/left.png" alt="left" />
                </button>
                <p>{currentPage} / {totalPage}</p>
                <button
                    type="button"
                    onClick={handleRightPage}
                >
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/right--v1.png" alt="right" />
                </button>


            </div>

        </div>
    )
}

export default Watched
