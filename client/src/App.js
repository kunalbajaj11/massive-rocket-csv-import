import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Auth from './pages/Auth';
import Register from './pages/Register';
import { AuthContext } from './context/AuthContext';
import { useMemo, useState } from 'react';
import Uploads from './pages/Uploads';

function App() {
  const [res, setRes] = useState([]);
  const providerValue = useMemo(() => ({res, setRes}), [res, setRes]);

  return (
    <Router>
      <>
        <AuthContext.Provider value={providerValue}>
          <Header />
          {/* <Main /> */}
          <div className='container'>
            <Routes>
              <Route exact path='/' Component={Main} />
              <Route exact path='/uploads' Component={Uploads} />
              <Route exact path='/login' Component={Auth} />
              <Route exact path='/register' Component={Register} />
            </Routes>
          </div>
          <Footer />
        </AuthContext.Provider>
      </>
    </Router>
  );
}

export default App;
