import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Signup}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
