import React from "react";
import axios from 'axios';

import { setToken } from "../utils/auth";

export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isSubmitting: false,
      error: null
    };

  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isSubmitting: true
    })
    const { email, password } = this.state;

    axios.post('http://localhost:3000/login', {
      email,
      password
    })
      .then((res) => {
        const { data } = res
        // console.log(data); => {token: "tqFPtiq7Lvv4DzhZNyJaTXYw"}
        setToken(data.token);

        // redirect To Root
        window.location.href = '/'
      })
      .catch((error) => {
        this.setState({
          isSubmitting: false,
          error
        });
      })
  }

  render(){
    const { error, isSubmitting } = this.state
    return (
      <>
        <h1>Login</h1>
        <div>{error && error.message}</div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input name="email" type="text" value={this.state.email} onChange={this.handleInputChange} />
          </label>
          <br/>
          <label>
            Password:
            <input name="password" type="text" value={this.state.password} onChange={this.handleInputChange} />
          </label>
          <br/>
          <input type="submit" value="Submit" disabled={isSubmitting} />
        </form>
      </>
    )
  }
}