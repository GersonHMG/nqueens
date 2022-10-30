import { useState } from 'react';
import Chessboard from './nqueens/Chessboard';
import './App.css'


function App() {
    return ( 
    <div className="center">
      <Chessboard/> 
    </div>
    );
}

export default App;