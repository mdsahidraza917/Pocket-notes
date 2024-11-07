import React from 'react'
import './MainContent.css'
import illustration from  '../src/assets/illustration.png'
import lock from  '../src/assets/lock.png'


function MainContent() {
  return (
    <div className="main-content-container">
      <div className='main-content'>
          <div className="content-center">
              <img src={illustration} alt="Pocket notes" className="illustration" />
              <h1 className="app-title">Pocket Notes</h1>
              <p className="app-description">
              Send and receive messages without keeping your phone online.<br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
              </p>
          </div> 
          <div className='footer'>
            <img src={lock}  className='lock-image'></img> end-to-end encrypted
          </div>
      </div>
    </div>
  )
}

export default MainContent;
