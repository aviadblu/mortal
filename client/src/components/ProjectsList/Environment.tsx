import * as React from "react";

interface IEnvironmentProps {
    data: any;
    appEvents: any;
}

export class Environment extends React.Component<IEnvironmentProps, {selected: number}> {
    constructor(props) {
        super(props);
        //console.log(this.props.data.hosts)
    }

    addToDashboard() {
        this.props.appEvents.emit('add:to:dashboard', this.props.data);
    }

    render() {
        return (<div className="envBlock grid__item col--sm--2 height--md padding--sm">
            <div className="bg--selected shadow--xs">
                <div className="height--sm">
                    <h2 className="text--lg text-block text--align-center padding-v--lg">{this.props.data.environmentName}</h2>
                </div>
                <div className="text-block bg--success">
                    <div className="font--semibold padding--md text--capitalize text-block__text ng-binding">
                        <div className="icon-plus-6 icon-size--24 hover--pointer"
                             onClick={this.addToDashboard.bind(this)}></div>
                    </div>
                </div>
            </div>
        </div>);
    }
}