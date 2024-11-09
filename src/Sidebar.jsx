import React,{useState,useRef,useEffect} from 'react'
import './Sidebar.css'
import Modal from './Modal';
import plusIcon from '../src/assets/add-icon.png'

function Sidebar({ onSelectGroup,selectedGroupColor}) {
  const [groups, setGroups] = useState([]);
  const [showModal,setShowModel] = useState(false);
  const modalRef = useRef(null);
  
  const handleGroupClick = (group) => {
    console.log(group.name)
    console.log(group.color)
    onSelectGroup(group.name);
    selectedGroupColor(group.color) ;// Pass the group name to the parent
  };

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
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
  
    setGroups(storedGroups);
  }, []);

  // Save groups to local storage whenever groups change
  useEffect(() => {
    if (groups.length > 0){
    localStorage.setItem('groups', JSON.stringify(groups));
    console.log("Groups saved to local storage:", groups);
    }
  }, [groups]);

  const getInitials = (name) => {
    return name
      .split(' ')
      .slice(0, 2) 
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };
  const handleCreate = (newGroup) => {
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
  };



  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className='sidebar-title'>Pocket Notes</h2>
      </div>
      <div className="sidebar-content">
        <ul className="group-list">
        {groups.map((group, index) => (
          <li 
          key={index} 
          className="group-item"
          onClick={()=> handleGroupClick(group)}>
            <div
              className="group-icon"
              style={{ backgroundColor: group.color }}
            >
            {getInitials(group.name)}
            </div>
            <span className="group-name">{group.name}</span>
          </li>
        ))}
        </ul>
      </div>
      <button onClick={()=>setShowModel(true)} className='add-button'>
        <img src={plusIcon} alt="Add" className='add-icon' />
      </button>
      {showModal && (
        <div ref={modalRef}>
          <Modal onClose={() => setShowModel(false)} handleCreate={handleCreate} />
        </div>
      )}
    </div>
  )
}

export default Sidebar
