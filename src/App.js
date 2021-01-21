import logo from './logo.svg';
import './App.css';

import Json from './components/Json';

import {Table} from 'react-bootstrap';

import _ from 'lodash';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <UsersLanding />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function UsersLanding() {

  let {data: users} = theDataExample;

  let { path } = useRouteMatch();

  return (<Switch>
    <Route exact path={path}>
      <UserList data={theDataExample} />
    </Route>
    <Route path={`${path}/id/:userId`}>
      <User users={users} />
    </Route>
  </Switch>);
}


function UserList({data}) {

  let {data: users, ...theRest} = data;
  let { url } = useRouteMatch();

  return (<>
    <h2>Users</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>etc...</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => 
        <tr key={user.id} value={user}>
          <td><Link to={`${url}/id/${user.id}`}>{user.id}</Link></td>
          <td>{user.first_name} {user.last_name}</td>
          <td><Json value={user} open={false} /></td>
        </tr>
        )}
      </tbody>
    </Table>

    <div>The rest: <Json value={theRest} open={true} /></div>

  </>);
}

function User({users}) {

  let userId = parseInt(useParams().userId, 10);
  let user = _.find(users, {id: userId})
  
  return (<>
    <h2>User #{_.get(user, 'id')}</h2>
    
    <div><Json value={user} open={true} /></div>

  </>);
}

const theDataExample = {
  "page": 1,
  "per_page": 6,
  "total": 12,
  "total_pages": 2,
  "data": [
    {
      "id": 1,
      "email": "george.bluth@reqres.in",
      "first_name": "George",
      "last_name": "Bluth",
      "avatar": "https://reqres.in/img/faces/1-image.jpg"
    },
    {
      "id": 2,
      "email": "janet.weaver@reqres.in",
      "first_name": "Janet",
      "last_name": "Weaver",
      "avatar": "https://reqres.in/img/faces/2-image.jpg"
    },
    {
      "id": 3,
      "email": "emma.wong@reqres.in",
      "first_name": "Emma",
      "last_name": "Wong",
      "avatar": "https://reqres.in/img/faces/3-image.jpg"
    },
    {
      "id": 4,
      "email": "eve.holt@reqres.in",
      "first_name": "Eve",
      "last_name": "Holt",
      "avatar": "https://reqres.in/img/faces/4-image.jpg"
    },
    {
      "id": 5,
      "email": "charles.morris@reqres.in",
      "first_name": "Charles",
      "last_name": "Morris",
      "avatar": "https://reqres.in/img/faces/5-image.jpg"
    },
    {
      "id": 6,
      "email": "tracey.ramos@reqres.in",
      "first_name": "Tracey",
      "last_name": "Ramos",
      "avatar": "https://reqres.in/img/faces/6-image.jpg"
    }
  ],
  "support": {
    "url": "https://reqres.in/#support-heading",
    "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
  }
}


export default App;
