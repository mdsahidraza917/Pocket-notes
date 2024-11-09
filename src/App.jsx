import React,{useState,useEffect} from 'react'
import './App.css'
import Sidebar from './Sidebar'
import MainContent from './MainContent'

function App() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroupColor, setSelectedGroupColor] = useState(null);
  const [notes, setNotes] = useState({});

  const handleAddGroup = (newGroup) => {
    // Add the new group to the list of groups
    setGroups((prevGroups) => [...prevGroups, newGroup]);
    // Initialize an empty array for the new group's notes
    setNotes((prevNotes) => ({ ...prevNotes, [newGroup]: [] }));
  };

  const handleSelectGroup  = (groupName) => {
    setSelectedGroup(groupName); 
    // Update selected group
  };
  const handleSelectGroupColor  = (selectedGroupColor) => {
    setSelectedGroupColor(selectedGroupColor); 
    // Update selected group
  };
  const handleAddNote = (newNoteText) => {
    if (!selectedGroup) return;
    const newNote = {
      text: newNoteText,
      date: new Date().toLocaleString(),
    };
    setNotes((prevNotes) => ({
      ...prevNotes,
      [selectedGroup]: [...(prevNotes[selectedGroup] || []), newNote],
    }));
  };

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || {};

    setGroups(savedGroups);
    setNotes(savedNotes);
    console.log("Loaded groups from localStorage:", savedGroups);
    console.log("Loaded notes from localStorage:", savedNotes);
  }, []);

  useEffect(() => {
    if (groups.length > 0){
    console.log("Saving notes to localStorage:", notes);
    localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  // Save groups to localStorage whenever groups state changes
  useEffect(() => {
    if (groups.length > 0){
    console.log("Saving groups to localStorage:", groups);
    localStorage.setItem('groups', JSON.stringify(groups));
    }
  }, [groups]);

  return (
    <div className="app">
      <Sidebar 
      groups={groups}
      onAddGroup={handleAddGroup}
      onSelectGroup={handleSelectGroup}
      selectedGroupColor={handleSelectGroupColor } />
      <MainContent 
      selectedGroup={selectedGroup}
      selectedGroupColor={selectedGroupColor}
      notes={notes[selectedGroup] || []}
      addNote={handleAddNote}
      />
    </div>
  )
}

export default App
