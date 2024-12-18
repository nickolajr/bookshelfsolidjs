import { Component, Suspense } from 'solid-js';
import { Routes, Route, Router, useRoutes,} from 'solid-app-router';
import { routes } from './routes';
import Toolbar from './Components/Toolbar/Toolbar';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Settings from './components/Settings/Settings';
import ChangeEmail from './components/Settings/ChangeEmail';
import ChangePassword from './components/Settings/ChangePassword';
import ChangeUsername from './components/Settings/ChangeUsername';

const App: Component = () => {
  return (
    <Router>
      <Toolbar />
      <Routes>
        <Route path="/login" component={Login} />
        <Route path="/library" component={Book} />
        <Route path="/profile" component={Profile} />
        <Route path="/register" component={Register} />
        <Route path="/settings" component={Settings}>
          <Route path="/change-email" component={ChangeEmail} />
          <Route path="/change-password" component={ChangePassword} />
          <Route path="/change-username" component={ChangeUsername} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;