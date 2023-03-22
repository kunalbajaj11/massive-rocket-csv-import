import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Uploads({update}) {
  const BASE_URL = 'http://localhost:5000';
  const columns = ['User Name', 'Inserted Records', 'Duplicate Entries', 'Status'];

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token')
    }
  }

  let [gridData, setGridData] = useState([]);

  useEffect(() => async () => {
    const res = await axios.get(`${BASE_URL}/api/uploads`, config)
    console.log(res.data);
    setGridData(res.data);
  }, [update])

  return (
    <>
      <h3 className='display-5 text-center m-4'>
        <p>List of Uploads</p>
      </h3>

      <table className="table">
        <thead>
          <tr>
            {columns.map((item, index) =>
              <th scope="col" key={index}>{item}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {gridData.map((item, index) =>
            <tr key={index}>
              <td>{item.username}</td>
              <td>{item.synced === 'completed' ? item.inserted_records : ''}</td>
              <td>{item.synced === 'completed' ? item.duplicates_found : ''}</td>
              <td>{item.synced === 'completed' ? <h6>Completed</h6>
              : <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Uploads;