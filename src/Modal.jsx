import React,{useState}from 'react'
import './Modal.css'

function Modal({onClose}) {
    const [groupName, setGroupName] = useState('');
    const [color, setColor] = useState('');

    const handleCreate = ()=>{
      console.log("Group Created:",{groupName},", Color:",{color});
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
         <button onClick={handleCreate}>Create</button>
         </div>
    </div>
    </div>
  )
}

export default Modal
