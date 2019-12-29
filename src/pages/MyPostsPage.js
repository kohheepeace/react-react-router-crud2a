import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import { getAccessToken } from '../utils/auth';

class MyPostsPage extends React.Component {
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
    axios.get("http://localhost:3000/me/posts", {
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      },
    })
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

  onClickDelete = (deletePost) => {
    axios.delete(`http://localhost:3000/posts/${deletePost.id}`, {
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      },
    })
      .then(() => {
        // https://stackoverflow.com/questions/36326612/delete-item-from-state-array-in-react
        const newPosts = this.state.posts.filter((post) => post.id !== deletePost.id);
        this.setState({
          posts: newPosts
        })
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
          <h1>My Posts</h1>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td><Link to={`/posts/${post.id}`}>Show</Link></td>
                <td><Link to={`/posts/${post.id}/edit`}>Edit</Link></td>
                {/* https://reactjs.org/docs/handling-events.html#passing-arguments-to-event-handlers */}
                <td><button onClick={() => this.onClickDelete(post)}>Delete</button></td>
              </tr>
            ))}
            </tbody>
          </table>
        </>
      );
    }
  }
}

export default MyPostsPage;