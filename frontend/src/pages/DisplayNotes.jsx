import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DisplayNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/notes')
      .then(res => setNotes(res.data))
      .catch(err => console.log("error fetching data", err));
  }, []);

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5001/notes/${id}`);
    setNotes(notes.filter(n => n._id !== id));
  };

  return (
    <>
    <div className="mx-auto p-4">
  <h2 className=" fw-bold text-center mb-4"> NOTES</h2>
  <div className="text-center mb-6">
    <Link
      to="/add"
      className="inline-block  text-white rounded "
    >
     <button className='btn btn-primary mb-4'> Add New Note</button>
    </Link>
  </div>

  {notes.map(note => (
    <div
      key={note._id}
      className="border rounded-lg p-4 mb-4 "
    >
      <h3 >{note.title}</h3>
      <p className=" mt-2">{note.text}</p>
      <div className="mt-4 flex justify-end ">
        <Link
          to={`/edit/${note._id}`}
          className="text-success"
        >
         <button className='me-3 btn btn-success'> Edit</button>
        </Link>
        <button
          onClick={() => deleteNote(note._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

    </>
  );
};

export default DisplayNotes;



