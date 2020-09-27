import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./components/404/NotFound.js";
import LayoutApp from "./components/LayoutApp";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Brief from "./Pages/Brief";
import ShowPoIs from "./Pages/ShowPoIs";

const Scan = () => <h1>Scan</h1>;
const Settings = () => <h1>Settings</h1>;
const Collabs = () => <h1>Collabs</h1>;
const Employers = () => <h1>Employers</h1>;
const NewPoi = () => <h1>NewPoi</h1>;
const PoiDetail = () => <h1>PoiDetail</h1>;

const Router = () => (
  <BrowserRouter>
    <LayoutApp>
      <Switch>
        <Route exact path="/" component={Brief} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/scan" component={Scan} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/collabs" component={Collabs} />
        <Route exact path="/employers" component={Employers} />
        <Route exact path="/pois" component={ShowPoIs} />
        <Route exact path="/pois/new" component={NewPoi} />
        <Route exact path="/pois/:poiId" component={PoiDetail} />
        <Route component={NotFound} />
      </Switch>
    </LayoutApp>
  </BrowserRouter>
);

export default Router;
