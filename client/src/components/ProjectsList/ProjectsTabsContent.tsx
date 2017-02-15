import * as React from "react";

import {Environment} from './Environment';

interface IProjectsTabsProps {
    projects: Object;
    selected: number;
    events: any;
}

export class ProjectTabsContent extends React.Component<IProjectsTabsProps, {selected: number}> {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected
        };

        this.registerToEvents();
    }

    private registerToEvents() {
        let self = this;
        this.props.events.on('tab:selected', (index) => {
            self.setState({selected: index})
        });
    }

    render() {
        let projectsTabsContent = [];
        let containerClass;
        let index = 0;
        Object.keys(this.props.projects).forEach((projectKey) => {

            //console.log(this.props.projects[projectKey]);

            let envs = this.props.projects[projectKey];
            let envsComponents = [];
            let envIndex = 0;
            envs.forEach((env) => {
                envsComponents.push(<Environment key={env.environmentName} data={env}/>);
                envIndex++;
            });

            containerClass = 'hide';
            if (index == this.state.selected) {
                containerClass = 'grid grid--guttered';
            }

            projectsTabsContent.push(<div className={containerClass} key={projectKey}>{envsComponents}</div>);
            index++;
        });
        return <div className="margin-t--lg">
            {projectsTabsContent}
        </div>;
    }
}