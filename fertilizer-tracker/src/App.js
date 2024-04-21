import "./input.css"
import React, { useState } from 'react';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import DistributorDash from './components/Distributor';
import Home from './components/Home';
import ParentComponent from "./components/ParentComponent";
import FertilizerDataForm from "./components/FertilizerDataForm";

function App() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div className="App">
     
      <Router>
        <Switch>
        <Route exact path='/' component={Home}/>
          <Route path='/dashboard' component={DistributorDash}/>
          <Route path='/form' component={ParentComponent}/>
          <Route path='/fertilizerdata' component={FertilizerDataForm}/>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
