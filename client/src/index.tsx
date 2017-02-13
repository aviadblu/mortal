import * as React from "react";
import * as ReactDOM from "react-dom";


import {ProjectsList} from "./components/ProjectsList";
import {ServersList} from "./components/ServersList";
import {ServersGraph} from "./components/ServersGraph";

class Layout extends React.Component<{}, undefined> {
    render() {
        return <div>
            <ProjectsList/>
            <ServersList title="Servers List"/>
            <ServersGraph title="graph" />
        </div>
    };
}

ReactDOM.render(
    <Layout />,
    document.getElementById("root")
);