import React from 'react'
import ReactDOM from 'react-dom'
// import Block from './frontend/block'
import BoardGUI from './frontend/boardgui'

document.addEventListener("DOMContentLoaded", () => {
  // Handler when the DOM is fully loaded
  const root = document.querySelector('#root')

  ReactDOM.render(
    <div className="main-container">
     <BoardGUI/>
    </div>,root
  )
});


