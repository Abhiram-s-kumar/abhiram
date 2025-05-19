import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditNotes = () => {
  const [note, setNote] = useState({ title: '', text: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5001/notes/${id}`)
      .then(res => setNote(res.data))
      .catch(err => console.log("Error loading note", err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5001/notes/${id}`, note);
    navigate('/');
  };

  return (
    <>
      <div className='mt-4 text-center'>
        <h2>Edit Note</h2>
        <form onSubmit={handleUpdate}>
          <input
            className='mb-4 mb-4 inline-block  px-4 py-2 rounded'
            value={note.title}
            placeholder='enter title'
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            required
          />
          <br />
          <textarea
          className='mb-4 inline-block  px-4 py-2 rounded'
            placeholder='enter note  '
            value={note.text}
            onChange={(e) => setNote({ ...note, text: e.target.value })}
            required
          />
          <br />
          <button className='mt-3 btn btn-primary' type="submit">Update</button>
        </form>
      </div>
    </>
  );
};

export default EditNotes;
