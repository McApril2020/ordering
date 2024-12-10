import '../CSS/Logout.css';

function Logout() {
    return (
        <>
            <div className="logout-container">
                <div className="wrapper-container">
                    <div className="loader-circle"></div>
                    <div className="loader-circle"></div>
                    <div className="loader-circle"></div>
                    <div className="loader-shadow"></div>
                    <div className="loader-shadow"></div>
                    <div className="loader-shadow"></div>
                </div>
                <div className='logout-desc'>
                    <h3>Logging Out...</h3>
                </div>
            </div>
        </>
    )
}

export default Logout;