## React with React Router Crud2A

## Packages
- react-router
- react
- axios: Make ajax call (https://reactjs.org/docs/faq-ajax.html)
- js-cookie: For storing token. (// https://stackoverflow.com/questions/44133536/is-it-safe-to-store-a-jwt-in-localstorage-with-reactjs)


## Step1 Create react app
https://create-react-app.dev/docs/getting-started
`temrianl`
```bash
npx create-react-app react-react-router-crud2a
cd react-react-router-crud2a
yarn start
```

If template is not created,
https://github.com/facebook/create-react-app/issues/8097

`terminal`
```bash
which create-react-app
~path # copy this path
rm -rf ~path
```

## Step2 Install necessary packages
```bash
yarn add axios@0.19.0 react-router-dom@5.1.2 js-cookie
```

## Step3 Copy and paste react-router auth example code
https://reacttraining.com/react-router/web/example/auth-workflow


I added comment with `/* ... */`

`src/App.js`
```js
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <AuthButton />

        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/public">
            <PublicPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/protected">
            <ProtectedPage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

/* auth utils */
// https://stackoverflow.com/questions/40870777/where-to-put-utility-functions-in-a-react-redux-application
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

/* Components */
function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

/* Router Wrapper (utils) */
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

/* Pages */
function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}
```

## Step4 folder structure

Refs:
- https://reactjs.org/docs/faq-structure.html#grouping-by-file-type
- https://developer.okta.com/blog/2018/07/10/build-a-basic-crud-app-with-node-and-react
- https://medium.com/p/ac9a754df5eb/responses/show

Make folders:
1. `pages`
2. `components`
3. `utils`

### pages
Create pages in advance.
1. `HomePage.js`
2. `LoginPage.js`
3. `SignUpPage.js`
4. `PostsNewPage.js`
5. `PostsEditPage.js`
6. `PostsShowPage.js`
7. `MyPostsPage.js`

`HomePage.js`
```js
import React from "react";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>HomePage</h1>
      </div>
    )
  }
}
```

`LoginPage.js`
```js
import React from "react";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>LoginPage</h1>
      </div>
    )
  }
}
```

`SignUpPage.js`
```js
import React from "react";

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>SignUpPage</h1>
      </div>
    )
  }
}
```

`PostsNewPage.js`
```js
import React from "react";

export default class PostsNewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>PostsNewPage</h1>
      </div>
    )
  }
}
```

`PostsEditPage.js`
```js
import React from "react";

export default class PostsEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>PostsEditPage</h1>
      </div>
    )
  }
}
```

`PostsShowPage.js`
```js
import React from "react";

export default class PostsShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>PostsShowPage</h1>
      </div>
    )
  }
}
```

`MyPostsPage.js`
```js
import React from "react";

export default class MyPostsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>MyPostsPage</h1>
      </div>
    )
  }
}
```

### components
`Navbar.js`:
```js
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
```

### utils
Create `auth.js` and `PrivateRoute.js`

`auth.js`:
```js
// https://stackoverflow.com/questions/44133536/is-it-safe-to-store-a-jwt-in-localstorage-with-reactjs
import Cookies from 'js-cookie'

export const getAccessToken = () => Cookies.get('accessToken');
export const isAuthenticated = !!Cookies.get('accessToken');

export const logout = () => {
  Cookies.remove('accessToken');
}

export const setToken = (accessToken) => {
  Cookies.set('accessToken', accessToken);
}
```

`PrivateRoute.js`:
- Almost same code with example.
- Use custom `isAuthenticated`


```js
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./auth"; 

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
```

## Edit `App.js`

`src/App.js`
```js
export default class App extends React.Component {
  render() {
    return (
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
    );
  }
}
```

## Yarn start with 3001 port
We want to use 3000 for api.
https://github.com/facebook/create-react-app/issues/3513
```bash
PORT=3001 yarn start
```


## Step5 SignUp
Refs:
- https://reactjs.org/docs/faq-ajax.html#how-can-i-make-an-ajax-call
- https://reactjs.org/docs/forms.html#handling-multiple-inputs
- https://github.com/axios/axios#example

`src/pages/SignUpPage.js`
```js
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

    // https://github.com/axios/axios#example
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
```

## Step6 Login
Login is almost same with **Sign Up** page.

`src/pages/LoginPage.js`
```js
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
```


## Step7 PostsNew
- **Send accessToken** with axios
- After successfully submitting post, **redirect_to PostShowPage**
  

`src/pages/PostsNewPage.js`
```js
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
```

## Step8 Home fetch all posts
- Do just as official react docs example shows https://reactjs.org/docs/faq-ajax.html#how-can-i-make-an-ajax-call


`src/pages/HomePage.js`
```js
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
```

## Step9 PostsShow
- Fetch in componentDidMount.
https://reactjs.org/docs/faq-ajax.html#how-can-i-make-an-ajax-call
- To get **post id** for GET request, use `this.props.match.params` and `withRouter`
https://stackoverflow.com/questions/35352638/react-how-to-get-parameter-value-from-query-string

`src/pages/PostsShowPage.js`
```js
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

  // https://reactjs.org/docs/faq-ajax.html
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
```

## Step10 My Posts Page and Delete Post
`src/pages/MyPostsPage.js`
```js
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
```

## Step11 PostsEdit
**PostsEditPage** is a combination of **PostsShowPage** and **PostsNewPage**.
1. Fetch post by using `:id` and set initial form value
2. Send PUT request for updating post

`src/pages/PostsEditPage.js`:
```js
import React from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";

import { getAccessToken } from "../utils/auth";

class PostsEditPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      post: null,
      title: "",
      content: "",
      isSubmitting: false,
      isLoaded: false
    };
  }

  componentDidMount() {
    // https://reacttraining.com/react-router/web/api/Route/component
    // https://stackoverflow.com/questions/35352638/react-how-to-get-parameter-value-from-query-string
    const { id } = this.props.match.params

    axios.get(`http://localhost:3000/posts/${id}`)
      .then((res) => {
        const post = res.data;
        const { title, content } = post;
        this.setState({
          isLoaded: true,
          post,
          title,
          content
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        });
      })
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

    const { id } = this.props.match.params
    const { title, content } = this.state;


    axios.put(`http://localhost:3000/posts/${id}/`, {
      title,
      content
    }, {
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      },
    })
      .then((res) => {
        const post = res.data;
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
    const { title, content, error, isSubmitting, isLoaded } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return(
        <>
          <h1>Posts#Edit</h1>
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
}

export default withRouter(PostsEditPage);
```


## Step12 Client Side Authorization
1. If **current_user** visit other user's **PostsEditPage**
2. Redirect to **HomePage**
3. Use Context of react
https://reactjs.org/docs/context.html

### Step12-1 Make User context
Make `src/utils/userContext.js`:
```js
import React from "react";

const userContext = React.createContext({
  currentUser: {}
}); // Create a context object

export {
  userContext // Export it so it can be used by other Components
};
```

### Step12-2 Fetch current_user and Provide it

`src/App.js`
```js
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
```

### Step12-3 Consume(use) currentUser in PostsEditPage
```js
<userContext.Consumer>
  {(currentUser) => {
    if (currentUser.id !== post.user_id) {
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )
    }
    return(
      <>
        <h1>Posts#Edit</h1>
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
  }}
</userContext.Consumer>
```


`src/pages/PostsEditPage.js`:
```js
import React from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";

import { userContext } from '../utils/userContext';
import { getAccessToken } from "../utils/auth";

class PostsEditPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      post: null,
      title: "",
      content: "",
      isSubmitting: false,
      isLoaded: false
    };
  }

  componentDidMount() {
    // https://reacttraining.com/react-router/web/api/Route/component
    const { id } = this.props.match.params

    axios.get(`http://localhost:3000/posts/${id}`)
      .then((res) => {
        const post = res.data;
        const { title, content } = post;
        this.setState({
          isLoaded: true,
          post,
          title,
          content
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        });
      })
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

    const { id } = this.props.match.params
    const { title, content } = this.state;


    axios.put(`http://localhost:3000/posts/${id}/`, {
      title,
      content
    }, {
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      },
    })
      .then((res) => {
        const post = res.data;
        // https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4
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
    const { post, title, content, error, isSubmitting, isLoaded } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <userContext.Consumer>
          {(currentUser) => {
            if (currentUser.id !== post.user_id) {
              return (
                <Redirect
                  to={{
                    pathname: "/"
                  }}
                />
              )
            }
            return(
              <>
                <h1>Posts#Edit</h1>
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
          }}
        </userContext.Consumer>
      )
    }    
  }
}

export default PostsEditPage;
```