import './createsession.scss'
import { useState } from 'react'
import axios from 'axios'

const CreateSession = () => {
    const [buttonInteger, setButtonInteger] = useState(0)
    const [requestToken, setRequestToken] = useState("")

    const handleGetRequestToken = () => {
        setButtonInteger(1)
        axios.get('http://localhost:4000/requesttoken')
            .then((response) => {
                setRequestToken(response.data.request_token)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleApproveToken = () => {
        setButtonInteger(2)
    }

    const handleGetSessionID = () => {
        setButtonInteger(3)
        axios.post('http://localhost:4000/updatesession', {
            request_token: requestToken
        })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="createsession">
            <div className="createsession__wrapper">
                <h1 className="createsession__heading">CREATE A TEMPORARY CONNECTION</h1>
                {
                    (buttonInteger === 0 || buttonInteger === 3) &&
                    <>
                        <input
                            type="button"
                            value="GET REQUEST TOKEN"
                            className="button__style"
                            onClick={handleGetRequestToken}
                        />
                        {
                            (buttonInteger === 3) &&
                            <>
                                <span>SESSION ID SUCCESFULLY CREATED!</span>
                                <span>YOU CAN NOW USE ADD TO WATCH FEATURE</span>
                            </>
                        }
                    </>
                }
                {
                    (buttonInteger === 1) &&
                    <button
                        className="button__style"
                    >
                        <a
                            href={`https://www.themoviedb.org/authenticate/${requestToken}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={handleApproveToken}
                        >APPROVE TOKEN</a>
                    </button>
                }
                {
                    (buttonInteger === 2) &&
                    <>
                        <input
                            type="button"
                            value="GET SESSION ID"
                            className="button__style"
                            onClick={handleGetSessionID}
                        />
                    </>
                }
            </div>
        </div>
    )
}

export default CreateSession
