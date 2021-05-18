import Register from './components/register/register';
import Login from './components/login/login';
import { BrowserRouter as Router, Route,  Switch} from "react-router-dom";
import './App.css';
import React, { Component } from 'react';
import Profile from './components/profile/profile';
import Home from './components/home';



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedIn : false
    }
  }

  render() {
    return (
      <Router>
      
        
      <div className="App">
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
         <Route path="/profile" component={Profile} onEnter={this.requireAuth}/>
        </Switch>
       
      </div>
      </Router> 
      
    );
  }
}

export default App;

