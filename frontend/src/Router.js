import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import NotFound from "./components/404/NotFound.js";
import LayoutApp from "./components/LayoutApp";
import Signup from "./Pages/Signup";

const Login = () => <h1>Login</h1>;
const Scan = () => <h1>Scan</h1>;
const Settings = () => <h1>Settings</h1>;
const Collabs = () => <h1>Collabs</h1>;
const ShowPois = () => <h1>ShowPois</h1>;
const NewPoi = () => <h1>NewPoi</h1>;
const EditPoi = () => <h1>EditPoi</h1>;

const Router = () => (
  <BrowserRouter>
    <LayoutApp>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/scan" component={Scan} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/collabs" component={Collabs} />
        <Route exact path="/pois" component={ShowPois} />
        <Route exact path="/pois/new" component={NewPoi} />
        <Route exact path="/pois/:poiId" component={EditPoi} />
        <Route component={NotFound} />
      </Switch>
    </LayoutApp>
  </BrowserRouter>
);

export default Router;
