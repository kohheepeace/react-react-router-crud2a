import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import axios from 'axios';

import { getAccessToken, isAuthenticated } from "./utils/auth";
import { userContext } from './utils/userContext';
import PrivateRoute from './utils/PrivateRoute';

import Navbar from "./components/Navbar";

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PostsNewPage from './pages/PostsNewPage';
import PostsEditPage from './pages/PostsEditPage';
import PostsShowPage from './pages/PostsShowPage';
import MyPostsPage from './pages/MyPostsPage';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUser: {}
    };
  }

  componentDidMount() {
    // Fetch current_user if user logged in.
    if (isAuthenticated) {
      // https://stackoverflow.com/questions/44245588/how-to-send-authorization-header-with-axios
      axios.get(`http://localhost:3000/me`, { 
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`
        },
      })
        .then((res) => {
          const currentUser = res.data;
          this.setState({
            currentUser
          });
        })
    }
  }

  render() {
    const { currentUser } = this.state;

    return (
      /* Wrap Router by Context Provider */
      /* By doing this, you can access currentUser by using Consumer */
      <userContext.Provider value={currentUser}>
        <Router>
          <div>
            <Navbar />

            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>

              <Route path="/sign_up">
                <SignUpPage />
              </Route>

              <Route path="/login">
                <LoginPage />
              </Route>

              {/* https://stackoverflow.com/questions/46621334/react-react-router-dom-two-route-conflict */}
              {/* Order is important */}
              <PrivateRoute path="/posts/new">
                <PostsNewPage />
              </PrivateRoute>

              <Route exact path="/posts/:id">
                <PostsShowPage />
              </Route>

              <PrivateRoute path="/my-posts">
                <MyPostsPage />
              </PrivateRoute>

              <PrivateRoute path="/posts/:id/edit">
                <PostsEditPage />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
      </userContext.Provider>
    );
  }
}