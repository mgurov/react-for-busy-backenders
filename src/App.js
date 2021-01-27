import './App.css';
import Json from './components/Json'
import { Table, ListGroup, Alert } from 'react-bootstrap'
import _ from 'lodash'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

function App() {


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>

            <hr />
          </div>
        </header>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UsersLanding />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

function UsersLanding() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <ListUsers users={theData.data} url={url} />
        </Route>
        <Route path={`${path}/id/:userId`}>
          <User users={theData.data} />
        </Route>
      </Switch>
    </div>
  );
}

function User({users}) {
  let { userId } = useParams();
  let user = _.find(users, {'id': parseInt(userId, 10)})
  if (!user) {
    return <Alert variant="danger">
      Couldn't find user with id {userId}
    </Alert>;
  }
  return <>
    <div>show user #{userId}</div>
    <ListGroup>
      {
        _.map(user, (value, key) => {
          return <ListGroup.Item key={key}>{key}: {value}</ListGroup.Item>
        })
      }
    </ListGroup>
    <Json value={user} open={true} />
  </>
}

function ListUsers({ users, url }) {
  return <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>json</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(user => {
            return <tr key={user.id}>
              <td><a href={`${url}/id/${user.id}`}>{user.id}</a></td>
              <td>{user.first_name}</td>
              <td><Json value={user} /></td>
            </tr>
          })
        }
      </tbody>
    </Table>
  </>
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

const theData = {
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
