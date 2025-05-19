import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNotes = () => {
  const [note, setNote] = useState({ title: '', text: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/notes', note);
    navigate('/');
  };

  return (
    <div className='mt-4 text-center  '>
      <h2> Add New</h2>
      <form  onSubmit={handleSubmit}>
        <input
          className='mb-4 inline-block  px-4 py-2 rounded '
          value={note.title}
          placeholder='enter title'
          onChange={e => setNote({ ...note, title: e.target.value })}
          required
        />
        <br />
        <textarea
        className='inline-block  px-4 py-2 rounded'
          placeholder='enter note '
          value={note.text}
          onChange={e => setNote({ ...note, text: e.target.value })}
          required
        />
        <br />
        <button className='mt-3 btn btn-success' type="submit">Add Notes</button>
      </form>
    </div>
  );
};

export default AddNotes;
