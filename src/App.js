import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path = "/" component = {Signup}/>
          <Route exact path = "/login" component = {Login}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
