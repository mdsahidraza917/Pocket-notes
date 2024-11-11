import React,{useState} from 'react'
import './MainContent.css'
import illustration from  '../src/assets/illustration.png'
import lock from  '../src/assets/lock.png'
import send from  '../src/assets/send.png'
import back from  '../src/assets/back.png'


function MainContent({selectedGroup,notes,addNote,selectedGroupColor,showBackButton,onBackClick}) {
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      addNote(newNote);
      setNewNote(""); 
    }
  };

  const getInitials = (name) => {

    return name
    .split(' ')
    .slice(0, 2) 
    .map((word) => word[0])
    .join('')
    .toUpperCase();
  };
  const isButtonEnabled = newNote.trim() !== '';


  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year} `;
  };
  const formatTime = (dateString)=>{
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12 || 12; // Convert to 12-hour format
    const time = `${hours}:${minutes} ${ampm}`;
    return `${time}`;
  };
  return (
<div className="main-content-container " >
      {console.log(selectedGroup)}
      {selectedGroup ? (
        // Display notes for the selected group
        <div className="main-content-notes">
          <div className="group-item-maincontent">
          {showBackButton && (
              <button className="back-button" onClick={onBackClick}>
                <img src={back} alt="" />
              </button>
            )}
            <div
                className="group-icon-maincontent"
                style={{ backgroundColor: selectedGroupColor }}
              >
              {getInitials(selectedGroup)}
              </div>
              <h2 className="group-title">{selectedGroup}</h2>
          </div>
          <div className="notes-list">
            {notes.map((note, index) => (
                <div key={index} className="note-card">
                  <p>{note.text}</p>
                  <div className="date-time">
                    <span className="note-date">
                      {formatDate(note.date)}<span className="dot">•</span> {formatTime(note.date)}
                    </span>
                  </div>
                </div>
              ))
             }
          </div>
          <div className="note-input">
            <textarea
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter your text here..........."
              className="note-textarea"
              rows="6"
            />
            <button onClick={handleAddNote}disabled={!isButtonEnabled} className={!isButtonEnabled ? 'disabled-button' : ''}>
              <img src={send} alt="" />
            </button>
          </div>
        </div>
      ) : (
        // Display illustration and text when no group is selected
        <div className="main-content-empty">
          <div className="content-center">
            <img src={illustration} alt="Pocket notes" className="illustration" />
            <h1 className="app-title">Pocket Notes</h1>
            <p className="app-description">
              Send and receive messages without keeping your phone online.<br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
            </p>
          </div> 
          <div className="footer">
            <img src={lock} alt="Lock icon" className="lock-image" /> end-to-end encrypted
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent;
