import * as React from "react";
import axios from 'axios';

interface IProjectsState {
    selected: number;
    projects: Object;
}

interface IProjectsTabsProps {
    projects: Array<string>;
    selected: number;
    onTabSelection: Function;
}

export class ProjectTabs extends React.Component<IProjectsTabsProps, {selected: number}> {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected
        };
    }

    handleTabClick(index) {
        this.setState({selected: index});
        this.props.onTabSelection(index);
    }

    render() {
        let projectsTabs = [];
        let selectedClass;
        let index = 0;
        this.props.projects.forEach((project) => {
            selectedClass = 'tabs__item';
            if (index == this.state.selected) {
                selectedClass = 'tabs__item active';
            }
            projectsTabs.push(<div key={project} className={selectedClass}
                                   onClick={this.handleTabClick.bind(this, index)}>{project}</div>);
            index++;
        });

        return <div className="tabs tabs--bottom-line border--b">
            {projectsTabs}
        </div>;
    }
}


export class ProjectsList extends React.Component<{}, IProjectsState> {

    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            projects: {}
        };
    }

    handleTabSelection(index) {
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
        Object.keys(this.state.projects).forEach((project) => {
            projectsTabsList.push(project);
        });

        return <div className="tabs tabs--bottom-line border--b">
            <ProjectTabs projects={projectsTabsList} selected={this.state.selected}
                         onTabSelection={this.handleTabSelection.bind(this)}/>

        </div>;
    }
}