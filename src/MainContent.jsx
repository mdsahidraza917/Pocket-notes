import React,{useState} from 'react'
import './MainContent.css'
import illustration from  '../src/assets/illustration.png'
import lock from  '../src/assets/lock.png'
import send from  '../src/assets/send.png'


function MainContent({selectedGroup,notes,addNote,selectedGroupColor}) {
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
  return (
<div className="main-content-container">
      {console.log(selectedGroup)}
      {selectedGroup ? (
        // Display notes for the selected group
        <div className="main-content-notes">
          <div className="group-item-maincontent">
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
                  <span className="note-date">{note.date}</span>
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
