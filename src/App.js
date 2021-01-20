import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  withRouter
} from "react-router-dom";

import _ from 'lodash';

const data = {
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

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/data">Data</Link>
            </li>
          </ul>

          <hr />

          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/data">
              <Data />
            </Route>
          </Switch>
        </div>
        <Route path="/about">
          And even more about about
        </Route>
      </Router>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Data() {

  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Dashboard</h2>

      <Switch>
        <Route exact path={path}>
          <DataListRouted data={data} url={url} />
          <Json value={data} />
        </Route>
        <Route path={`${path}/:itemId`}>
          <DataItem data={data} />
        </Route>
      </Switch>
    </div>
  );
}

function DataItem({data}) {
  let { itemId } = useParams();

  let item = _.find(data.data, {'id': parseInt(itemId, 10)})
  
  return <div>
    <span>will show item #{itemId}</span>
    <Json value={item} />
  </div>
}

const DataListRouted = withRouter(DataList);

function DataList({data, url, match, location, history}) {
  
  return <div>

    <div>
      match <Json value={match} />
    </div>
    
    <ul>
      {data.data.map(item => <li>
        <Link to={`${match.url}/${item.id}`}>{item.first_name} {item.last_name}</Link>
      </li>)}
    </ul>
  </div>
}


function Json({ value }) {
  return <pre>
    {JSON.stringify(value, null, 2)}
  </pre>
}

export default App;
