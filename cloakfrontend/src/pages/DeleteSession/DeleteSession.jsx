import './deletesession.scss'
import axios from 'axios'

const DeleteSession = () => {
    const handleDeleteSession = () => {
        axios.get('http://localhost:4000/deletesession')
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className="deletesession">
            <div className="deletesession__wrapper">
                <h1 className="deletesession__heading">DELETE YOUR SESSION</h1>
                <input
                    type="button"
                    value="DELETE SESSION"
                    className="button__style"
                    onClick={handleDeleteSession}
                />

            </div>
        </div>
    )
}

export default DeleteSession
