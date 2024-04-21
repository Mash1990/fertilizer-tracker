import "./input.css";
import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DistributorDash from "./components/Distributor";
import Home from "./components/Home";

import FertilizerTransfer from "./components/FertilizerTransfer";
import PendingOrders from "./components/PendingOrders";
import AllFertilizers from "./components/AllFertilizers";

function App() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={DistributorDash} />

          <Route path="/fertilizerdata" component={FertilizerTransfer} />
          <Route path="/pending" component={PendingOrders} />
          <Route path="/allfertilizers" component={AllFertilizers} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
