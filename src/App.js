import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

// Pages
import login from './pages/login';
import signup from './pages/signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = "/" component = {signup}/>
          <Route exact path = "/login" component = {login}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
