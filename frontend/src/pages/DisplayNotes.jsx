
import React,{useState,useEffect} from 'react';

import { Link } from 'react-router-dom'

 import axios from 'axios'


const DisplayNotes = () => {
    const [notes,setNotes]= useState([])

    useEffect(()=>{
        axios.get('http://localhost:5001/notes').
        then(res=>setNotes(res.data)).catch(err=>console.log("error fertchig data",err)
        )
    },[])


    const deleteNote = async(id) =>{
      await axios.delete(`http://localhost:5001/notes/${id}`);
      setNotes(notes.filter(n=> n._id !== id));
    }
  return (
   <>
   
   <div>
    <h2>All Notes</h2>
    <Link to={'/add'}> Add New Notes</Link>
    {notes.map(note=>(
      <div key={note._id}>
        <h3>{note.title}</h3>
        <p>{note.text}</p>
        <Link to={`/edit/${note._id}`}>Edit</Link>
        <button onClick={()=>deleteNote(note._id)}>Delete</button>
      </div>
    ))}
   </div>
   
   </>
  )
}

export default DisplayNotes
