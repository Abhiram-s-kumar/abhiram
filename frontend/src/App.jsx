
import './App.css'

import {Routes,Route} from 'react-router-dom'
import DisplayNotes from './pages/DisplayNotes';
import EditNotes from './pages/EditNotes';
import AddNotes from './pages/AddNotes';

function App() {
 

  return (
    <>
     <Routes>
      <Route path='/' element={<DisplayNotes/>}/>
      <Route path='/add' element={<AddNotes/>}/>

      <Route path='/edit/:id' element={<EditNotes/>}/>


     </Routes>
    </>
  )
}

export default App
