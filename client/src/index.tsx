import * as React from "react";
import * as ReactDOM from "react-dom";
import * as EventEmitter from 'eventemitter3';

import {ProjectsList} from "./components/ProjectsList/ProjectsList";
import {Dashboard} from "./components/Dashboard/Dashboard";
import {ServersList} from "./components/ServersList";
import {ServersGraph} from "./components/ServersGraph";

export class App extends React.Component<{}, undefined> {
    events: any;

    constructor(props) {
        super(props);
        this.events = new EventEmitter();
    }

    render() {
        return <div>
            <ProjectsList appEvents={this.events}/>
            <hr/>
            <Dashboard appEvents={this.events}/>
            {/*<ServersList title="Servers List"/>*/}
            {/*<ServersGraph title="Mor graph" />*/}
        </div>
    };
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);