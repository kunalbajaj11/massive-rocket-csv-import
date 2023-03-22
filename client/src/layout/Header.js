import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


function Header() {
    const {res, setRes} = useContext(AuthContext);

    const signoutHandler = () => {
        localStorage.removeItem('token');
        setRes(false);
    }
    return (
        <>
            <header className="p-3 mb-3 border-bottom">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="/" className="nav-link px-2 link-secondary">Massive Rocket</Link></li>
                            {res && <li><Link to="/uploads" className="nav-link px-5 link-dark ml-5">Uploads</Link></li>}
                            <li><p className="nav-link px-5 link-dark ml-5"></p></li>
                            <li><p className="nav-link px-5 link-dark ml-5"></p></li>
                            <li><p className="nav-link px-5 link-dark ml-5"></p></li>
                            <li><p className="nav-link px-5 link-dark ml-5"></p></li>
                            {res && <li><Link to="/login" onClick={signoutHandler} className="nav-link px-5 link-dark">Sign Out</Link></li>}
                        </ul>

                        {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 offset-lg-5" role="search">
                            <li><a className="nav-link px-5 link-dark ml-5">Uploads</a></li>
                        </form> */}


                    </div>
                </div>
            </header>
        </>
    )
}

export default Header