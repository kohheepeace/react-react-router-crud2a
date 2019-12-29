import React from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";


import { getAccessToken } from "../utils/auth";

class PostsNewPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      error: null,
      isSubmitting: false,
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

    const { title, content } = this.state;

    axios.post(`http://localhost:3000/posts`, {
      title,
      content
    }, {
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      },
    })
      .then((res) => {
        const post = res.data;

        // https://stackoverflow.com/a/58536772/6037441
        // let history = useHistory();
        // history.push(`/posts/${post.id}`);
        // => Not working because this is Class component
        // https://stackoverflow.com/questions/58435074/react-router-dom-invalid-hook-call-hooks-can-only-be-called-inside-of-the-body
        this.props.history.push(`/posts/${post.id}`);
      })
      .catch((error) => {
        this.setState({
          isSubmitting: false,
          error
        });
      })
  }

  render(){
    const { title, content, error, isSubmitting } = this.state
    return (
      <>
        <h1>Posts#New</h1>
        <div>{error && error.message}</div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input name="title" type="text" value={title} onChange={this.handleInputChange} />
          </label>
          <br/>
          <label>
            Content:
            <input name="content" type="text" value={content} onChange={this.handleInputChange} />
          </label>
          <br/>
          <input type="submit" value="Submit" disabled={isSubmitting} />
        </form>
      </>
    )
  }
}

export default withRouter(PostsNewPage);