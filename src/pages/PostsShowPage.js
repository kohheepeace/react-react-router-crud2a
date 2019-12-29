import React from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";


class PostsShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      post: null,
    };
  }

  componentDidMount() {
    // https://reacttraining.com/react-router/web/api/Route/component
    // https://stackoverflow.com/questions/35352638/react-how-to-get-parameter-value-from-query-string
    const { id } = this.props.match.params

    axios.get(`http://localhost:3000/posts/${id}`)
      .then((res) => {
        const post = res.data;
        this.setState({
          isLoaded: true,
          post
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        });
      })
  }

  

  render() {
    const { error, isLoaded, post } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Posts#Show</h1>
          <h2>Title: {post.title}</h2>
          <p>Content: {post.content}</p>
        </div>
      )
    }
  }
}

export default withRouter(PostsShowPage);