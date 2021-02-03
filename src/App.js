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
              <td><Link to={`${url}/id/${user.id}`}>{user.id}</Link></td>
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
      <Link to={`/users/id/1`}>Check, for example, this user!</Link>
    </div>
  );
}

export default App;
