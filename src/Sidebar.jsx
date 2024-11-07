import React,{useState,useRef,useEffect} from 'react'
import './Sidebar.css'
import Modal from './Modal';
import plusIcon from '../src/assets/add-icon.png'

function Sidebar() {
  const [showModal,setShowModel] = useState(false);
  const modalRef = useRef(null);


  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModel(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);


  return (
    <div className="sidebar">
        <h2 className='sidebar-title'>Pocket Notes</h2>
        <div className="sidebar-content">
        </div>
        <button onClick={()=>setShowModel(true)} className='add-button'>
            <img src={plusIcon} alt="Add" className='add-icon' />
        </button>
        {showModal && (
        <div ref={modalRef}>
          <Modal onClose={() => setShowModel(false)} />
        </div>
      )}
    </div>
  )
}

export default Sidebar
