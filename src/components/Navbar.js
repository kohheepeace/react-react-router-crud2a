import React from "react";
import { isAuthenticated, logout } from "../utils/auth";
import { Link } from "react-router-dom";

// https://reactjs.org/docs/components-and-props.html
export default function Navbar() {
  // https://reactjs.org/docs/handling-events.html
  function onClickLogout(){
    logout();
    window.location.href = '/';
  }

  // https://reactjs.org/docs/conditional-rendering.html
  if (isAuthenticated) {
    return(
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts/new">Post New</Link>
          </li>
          <li>
            <Link to="/my-posts">My Posts</Link>
          </li>
          <li>
            <button onClick={onClickLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sign_up">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    )
  }
}