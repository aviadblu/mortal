import * as React from "react";
import * as d3 from 'd3';

export interface ServersGraphProps { title: string
}

export class ServersGraph extends React.Component<ServersGraphProps, undefined> {

    render() {
        return <div className="shadow--xs rows bg--content margin-b--lg">
            <div className="minor padding--md bg--primary">{this.props.title}</div>
            <div className="padding--xl">
                <svg width="960" height="500"></svg>
            </div>
        </div>;
    }
}