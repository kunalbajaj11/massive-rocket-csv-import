import { useEffect, useState } from 'react'
import axios from 'axios';

function FileUpload({triggerUpdate}) {
    const BASE_URL = 'http://localhost:5000';
    const [file, setFile] = useState('');
    const [uploadedFile, setUploadedFile] = useState(0);

    const onChangeHandler = (e) => {
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        triggerUpdate(uploadedFile)
    }, [uploadedFile])

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setUploadedFile(Math.random());
        triggerUpdate(uploadedFile);
        const formData = new FormData();

        formData.append('file', file);

        try {
            // post request to upload
            debugger
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                }
            }
            const uploadRes = await axios.post(`${BASE_URL}/api/uploads`, {}, config);
            const uploadResId = uploadRes.data._id;

            const res = await axios.post(`${BASE_URL}/api/uploadrecords?refId=${uploadResId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': localStorage.getItem('token')
                }
            })

            console.log(res.data);
            // const { upsertedCount, matchedCount } = res.data;
            // setUploadedFile({ fileName, filePath });

            // const updateUpload = await axios.put(`${BASE_URL}/api/uploads`, {
            //     "upload_id": uploadResId,
            //     "synced": "completed",
            //     "inserted_records": upsertedCount,
            //     "duplicates_found": matchedCount
            // }, config)

            // alert(updateUpload.data);
            setFile('');
            setTimeout(() => {
                setUploadedFile(Math.random());
                triggerUpdate(uploadedFile);
            }, 1000);
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h5 className='display-4 text-center m-4'>
                <p>CSV File Upload</p>
            </h5>
            <form onSubmit={onSubmitHandler} className="mb-5">
                <div className="mb-4">
                    <input className="form-control p-0" type="file" id="formFile" onChange={onChangeHandler} />
                </div>
                <input type='submit' value='Upload' className='btn btn-secondary btn-block mt-4'></input>
            </form>
        </>
    )
}

export default FileUpload