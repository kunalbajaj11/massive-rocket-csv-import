import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Register() {
    let { res, setRes } = useContext(AuthContext);
    const navigate = useNavigate();
    const BASE_URL = 'http://localhost:5000';
    const [formData, setFormData] = useState({
        "name": "",
        "email": "",
        "password": ""
    });

    const { name, email, password } = formData;

    const onChangeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmitHandler = async e => {
        e.preventDefault();
        console.log(formData);
        // const { data, loading, error } = useFetch(`${BASE_URL}/api/users`);

        const newUser = {
            name,
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

            const res = await axios.post(`${BASE_URL}/api/users`, body, config);
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
            <h3 className='mt-5 mb-5'>Register User</h3>

            <form onSubmit={e => onSubmitHandler(e)}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nameInput"
                        name="name"
                        placeholder="Full Name"
                        value={name}
                        onChange={e => onChangeHandler(e)}
                    />
                </div>
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

export default Register