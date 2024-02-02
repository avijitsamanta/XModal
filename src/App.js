import './App.css';
import React,{useState} from 'react';
import XModal from './XModal';

function App() {
  const [isOpen,setIsOpen] = useState(false)

  function openModal(){
    setIsOpen(true)
  }
  function closeModal(){
    setIsOpen(false)
  }

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button className='button-primary' onClick={openModal}>Open Form</button>
      <XModal isOpen={isOpen} onClose={closeModal}/>
    </div>
  );
}

export default App;
