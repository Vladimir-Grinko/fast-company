import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./layouts/users";
import NavBar from "./components/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";

const App = () => {
    // return <Users />;
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
            </Switch>
        </div>
    );
};

export default App;
