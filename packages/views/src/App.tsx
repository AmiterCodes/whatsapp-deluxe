import React from 'react';
import { Client } from '@react-fullstack/fullstack-socket-client'
import * as Components from "./components";


function App() {
  return (
    <div>
      <Client host={"localhost"} port={9494} views={Components} /> 
    </div>
  );
}

export default App;