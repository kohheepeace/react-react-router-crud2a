import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default class MyPostsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
    };
  }
  
  // https://reactjs.org/docs/faq-ajax.html#how-can-i-make-an-ajax-call
  componentDidMount() {
    axios.get("http://localhost:3000/posts")
      .then((res) => {
        const posts = res.data;
        this.setState({
          isLoaded: true,
          posts
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
    const { error, isLoaded, posts } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <h1>Home Page</h1>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </>
      );
    }
  }
}