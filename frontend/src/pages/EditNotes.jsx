import React from 'react'

import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';

const EditNotes = () => {
  const [note,setNote] = useState({title:'',text:''});
  const {id} = useParams();
  const navigate= useNavigate()

  useEffect(()=>{
    axios.get(`http://localhost:5001/notes`)
    .then(res=>{
      const existingNote = res.data.find(n=>n._id ===id)
      setNote(existingNote)
    });
  },[id]);



 

  const handleUpdate = async e =>{
    e.preventDefault();
    await axios.put(`http://localhost:5001/notes/${id}`,note);
    navigate('/')
  }

  return (
    <>
   <div className='mt-4'>
        <h2>Add New </h2>
        <form onSubmit={handleUpdate}>
            <input  className='mb-4' value ={note.title} placeholder='enter title'onChange={(e)=>setNote({...note, title:e.target.value})} required />

            <br />
                
          <textarea placeholder='enter note ' value={note.text} onChange={(e)=>setNote ({...note,text:e.target.value})} required/>
            
            
         <button className='mt-3' type="submit"> update</button>  
        </form>
         

    </div>
    </>
  )
}

export default EditNotes
