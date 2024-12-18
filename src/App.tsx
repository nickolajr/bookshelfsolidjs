import { Component, Suspense } from 'solid-js';
import { Router, Routes, Route } from 'solid-app-router';
import Toolbar from './Components/Toolbar/Toolbar';
import Login from './Components/Login/Login';
import Book from './Components/Book/Book';
import Profile from './Components/Profile/Profile';
import Register from './Components/Register/Register';
import Settings from './Components/Settings/Settings';
import ChangeEmail from './Components/Settings/ChangeEmail';
import ChangePassword from './Components/Settings/ChangePassword';
import ChangeUsername from './Components/Settings/ChangeUsername';

const App: Component = () => {
  return (
    <Router>
      <Toolbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" component={Book} />
          <Route path="/login" component={Login} />
          <Route path="/library" component={Book} />
          <Route path="/profile" component={Profile} />
          <Route path="/register" component={Register} />
          <Route path="/settings" component={Settings}>
            <Route path="change-email" component={ChangeEmail} />
            <Route path="change-password" component={ChangePassword} />
            <Route path="change-username" component={ChangeUsername} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
