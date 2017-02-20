import * as React from "react";
import axios from 'axios';
import * as EventEmitter from 'eventemitter3';

import {App} from '../../index';
import {ProjectTabs} from './ProjectsTabs';
import {ProjectTabsContent} from './ProjectsTabsContent';

interface IProjectsState {
    selected: number;
    projects: Object;
}

export class ProjectsList extends React.Component<{appEvents: any}, IProjectsState> {
    events: any;

    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            projects: {}
        };
        this.events = new EventEmitter();
    }

    handleTabSelection(index) {
        this.events.emit('tab:selected', index);
        this.setState({selected: index});
    }

    componentDidMount() {
        axios.get('/api/servers/projects-metadata')
            .then(res => {
                this.setState({projects: res.data});
            });
    }

    render() {
        let projectsTabsList = [];
        let projectsTabsContent = this.state.projects;
        Object.keys(this.state.projects).forEach((project) => {
            projectsTabsList.push(project);
        });

        return <div className="rows margin-b--lg">
            <ProjectTabs projects={projectsTabsList} selected={this.state.selected}
                         onTabSelection={this.handleTabSelection.bind(this)}/>
            <ProjectTabsContent projects={projectsTabsContent} selected={this.state.selected} events={this.events} appEvents={this.props.appEvents}/>
        </div>;
    }
}