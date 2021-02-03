import './App.css';
import Json from './components/Json'
import { Table, ListGroup, Alert } from 'react-bootstrap'
import _ from 'lodash'
import OrdersFetcher from './components/OrdersFetcher'
import OrderLanding from './components/OrderLanding'

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
          <OrdersFetcher linkUrl={url} />
        </Route>
        <Route path={`${path}/id/:orderId`}>
          <OrderLanding />
        </Route>
      </Switch>
    </div>
  );
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
