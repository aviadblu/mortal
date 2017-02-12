import * as React from "react";
import * as ReactDOM from "react-dom";

import {ServersList} from "./components/ServersList";
import {ServersGraph} from "./components/ServersGraph";

class Layout extends React.Component<{}, undefined> {
    render() {
        return <div>
            <ServersList title="Servers List"/>
            <ServersGraph title="graph" />
        </div>
    };
}

ReactDOM.render(
    <Layout />,
    document.getElementById("root")
);