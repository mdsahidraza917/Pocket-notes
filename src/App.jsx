import React,{useState,useEffect} from 'react'
import './App.css'
import Sidebar from './Sidebar'
import MainContent from './MainContent'



function App() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroupColor, setSelectedGroupColor] = useState(null);
  const [notes, setNotes] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleAddGroup = (newGroup) => {
    // Add the new group to the list of groups
    setGroups((prevGroups) => [...prevGroups, newGroup]);
    // Initialize an empty array for the new group's notes
    setNotes((prevNotes) => ({ ...prevNotes, [newGroup]: [] }));
  };

  const handleSelectGroup  = (groupName) => {
    setSelectedGroup(groupName); 
    // Update selected group
    setShowSidebar(false); 
  };
  const handleSelectGroupColor  = (selectedGroupColor) => {
    setSelectedGroupColor(selectedGroupColor); 
    // Update selected group color
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const handleBackClick = () => setShowSidebar(true);

  return (
    <div className="app">
      {isMobile ? (
        showSidebar ? (
          <Sidebar 
            groups={groups}
            onAddGroup={handleAddGroup}
            onSelectGroup={handleSelectGroup}
            selectedGroupColor={handleSelectGroupColor}
          />
        ) : (
          <div>
            <MainContent
              selectedGroup={selectedGroup}
              selectedGroupColor={selectedGroupColor}
              notes={notes[selectedGroup] || []}
              addNote={handleAddNote}
              showBackButton={isMobile && !showSidebar} // Show back button only on mobile when sidebar is hidden
              onBackClick={handleBackClick}
            />
          </div>
        )
      ) : (
        <>
          <Sidebar
            groups={groups}
            onAddGroup={handleAddGroup}
            onSelectGroup={handleSelectGroup}
            selectedGroupColor={handleSelectGroupColor}
          />
          <MainContent
            selectedGroup={selectedGroup}
            selectedGroupColor={selectedGroupColor}
            notes={notes[selectedGroup] || []}
            addNote={handleAddNote}
          />
        </>
      )}
    </div>
  );
}

export default App
