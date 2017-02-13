import * as React from "react";
import axios from 'axios';

interface IProjects {
    projects: Object
}


export class ProjectTabs extends React.Component<{projects: Array<string>}, undefined> {
    render() {

        let projectsTabs = [];
        this.props.projects.forEach((project) => {
            projectsTabs.push(<div key={project} className="tabs__item">{project}</div>);
        });

        return <div className="tabs tabs--bottom-line border--b">
            {projectsTabs}
        </div>;
    }
}


export class ProjectsList extends React.Component<{}, IProjects> {

    constructor(props) {
        super(props);
        this.state = {
            projects: {}
        };
    }

    componentDidMount() {
        axios.get('/api/servers/projects-metadata')
            .then(res => {

                this.setState({projects: res.data});
            });
    }

    render() {
        let projectsTabsList = [];
        Object.keys(this.state.projects).forEach((project) => {
            projectsTabsList.push(project);
        });

        return <div className="tabs tabs--bottom-line border--b">
            <ProjectTabs projects={projectsTabsList} />
        </div>;
    }
}