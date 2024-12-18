import { Component, Suspense } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import Book from './Components/Book/Book';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Toolbar from './Components/Toolbar/Toolbar';



const App: Component = () => {
  return (
    <div>
      <Toolbar></Toolbar>
      <Router>            
          <Route>         
              <Route path="/" component={Book} />
              <Route path="/Login" component={Login} />
              <Route path="/Register" component={Register} /> 
              
          </Route>
      </Router>
    </div>
  );
};

export default App;
