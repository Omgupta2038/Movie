import { useEffect, useState } from "react"

const InfoPopup = (props) => {
    const [movieInfo, setMovieInfo] = useState([])
    useEffect(() => {
    }, [])
    return (
        <div className="infopopup">
            <div className="infopopup__wrapper">
                <span className="close-icon" onClick={props.handleClose}>X</span>
                <>
                    <b>Design your Popup</b>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <input
                        type="button"
                        value="CLOSE"
                        onClick = {props.handleClose}
                    />
                </>
            </div>
        </div>
    )
}

export default InfoPopup
