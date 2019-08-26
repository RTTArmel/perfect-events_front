import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Accueil from './components/home'
import Login from './components/login'
import Register from './components/register'
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import Article from './components/article'
import Admin from './components/admin'
import Upload from './components/postupload'
function App() {
  return (
    <div className="">
      <Provider store={Store}>
        <Router>
          <div>
            <Route exact path="/" component={Accueil} />
            <div className="container">
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              {/* <Route path="/article/:id" component={Article } /> */}
              <Route path="/admin" component={Admin} />
              <Route path="/upload" component={Upload} />
              <Route path="/article" component={Article} />
            </div>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
