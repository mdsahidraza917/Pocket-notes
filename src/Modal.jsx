import React,{useState,useEffect}from 'react'
import './Modal.css'

function Modal({onClose,handleCreate}) {
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [color, setColor] = useState('');

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

    const handleSubmit = (e)=>{
      e.preventDefault();
      if (groupName.trim() === "") return;
      const newGroup = { name: groupName, color: color };
      handleCreate(newGroup);
     
      setGroupName('');
      setColor('#000000');
      onClose();

    }
  return (
    <div className='modal-overlay'>
      <div className="modal">
        <h3>Create New group</h3>
        <div className="form-group">
          <label>Group Name</label>
          <input type="text"
          className='groupname-input'
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          />
         </div>
         <div className="color-picker">
         <label>Choose colour</label>
         {['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'].map((clr) => (
            <span
            key={clr}
            style={{ backgroundColor: clr }}
            className={`color-swatch ${color === clr ? 'selected' : ''}`}
            onClick={() => setColor(clr)}
            />
            ))}
         </div>
         <div className="create-button">
         <button onClick={handleSubmit}>Create</button>
         </div>
    </div>
    </div>
  )
}

export default Modal
