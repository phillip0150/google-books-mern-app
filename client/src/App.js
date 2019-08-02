import React from "react";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Saved from "./pages/Saved";
import {Nav, NavItem, NavLink} from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";



function App() {
  return (
    <Router>
    <div>
    <div>
        <Nav tabs>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/saved">Saved Books</NavLink>
          </NavItem>
        </Nav>
      </div>
      <Switch>
      <Route exact path="/" component={Books} />
      <Route exact path="/books" component={Books} />
      <Route exact path="/saved" component={Saved} />
      <Route exact path="/books/:id" component={Detail} />
      <Route component={NoMatch} />
      </Switch>
    </div>
    </Router>
  );
}



export default App;
