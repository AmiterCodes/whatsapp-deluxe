import React from 'react';
import { Client } from '@react-fullstack/fullstack-socket-client'
import * as Components from "./components";
import './main.css'

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Client host={"localhost"} port={5000} views={Components} /> 
    </div>
  );
}

export default App;
