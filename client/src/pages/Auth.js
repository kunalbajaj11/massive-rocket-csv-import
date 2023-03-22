import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Auth() {
  const navigate = useNavigate();
  let { res, setRes } = useContext(AuthContext);
  const BASE_URL = 'http://localhost:5000';
  const [formData, setFormData] = useState({
    "email": "",
    "password": ""
  });

  const { email, password } = formData;

  const onChangeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmitHandler = async e => {
    e.preventDefault();
    console.log(formData);
    // const { data, loading, error } = useFetch(`${BASE_URL}/api/users`);

    const newUser = {
      email,
      password
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const body = JSON.stringify(newUser);

      const res = await axios.post(`${BASE_URL}/api/auth`, body, config);
      if (res.data && res.data.token) {
        // store this and route
        localStorage.setItem('token', res.data.token);
        setRes(true);
        console.log(res);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='row'>
        <h3 className='mt-5 mb-5 col-md-10'>Login</h3>
        <h4 className='mt-5 mb-5 col-md-2'><Link to="/register">Register User</Link></h4>
      </div>
      <form onSubmit={e => onSubmitHandler(e)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter email"
            value={email}
            onChange={e => onChangeHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={e => onChangeHandler(e)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Auth