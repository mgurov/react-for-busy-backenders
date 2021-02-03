import './App.css';
import Json from './components/Json'
import { Table, ListGroup, Alert } from 'react-bootstrap'
import _ from 'lodash'
import OrdersFetcher from './components/OrdersFetcher'

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
                <Link to="/orders">Orders</Link>
              </li>
            </ul>

            <hr />
          </div>
        </header>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/orders">
            <OrdersLanding />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

function OrdersLanding() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <ListOrders linkUrl={url} />
        </Route>
        <Route path={`${path}/id/:orderId`}>
          <Order />
        </Route>
      </Switch>
    </div>
  );
}

function Order({users}) {
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

function ListOrders({ linkUrl }) {

  //TODO: better link url
  return <OrdersFetcher linkUrl={linkUrl} />
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
