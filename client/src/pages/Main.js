import {useState} from 'react'
import FileUpload from '../components/FileUpload';
import Uploads from '../pages/Uploads';

function Main() {
  const [update, setUpdate] = useState();
  const triggerUpdate = (flag) => {
    setUpdate(flag);
  }

  return (
    <div className='container'>
      
      <FileUpload triggerUpdate={triggerUpdate}></FileUpload>
      <hr />
      <Uploads update={update}></Uploads>
    </div>
  )
}

export default Main