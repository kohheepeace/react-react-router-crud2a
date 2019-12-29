import React from "react";
import axios from 'axios';
import { setToken } from "../utils/auth";

export default class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isSubmitting: false,
      error: null
    };

  }

  // https://reactjs.org/docs/forms.html#handling-multiple-inputs
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  // https://reactjs.org/docs/faq-ajax.html#how-can-i-make-an-ajax-call
  handleSubmit = (event) => {
    event.preventDefault();
    
    this.setState({
      isSubmitting: true
    })

    const { email, password } = this.state;

    axios.post('http://localhost:3000/users', {
      email,
      password
    })
      .then((res) => {
        const { data } = res
        // console.log(data); => {token: "tqFPtiq7Lvv4DzhZNyJaTXYw"}
        setToken(data.token);
        // redirect To Home
        window.location.href = '/';
      })
      .catch((error) => {
        // console.log(error.response);
        this.setState({
          isSubmitting: false,
          error
        });
      })
  }

  render(){
    const { isSubmitting, error } = this.state;

    return (
      <>
        <h1>Sign Up</h1>
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