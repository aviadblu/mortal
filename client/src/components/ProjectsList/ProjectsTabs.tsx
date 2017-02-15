import * as React from "react";

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
                selectedClass = 'tabs__item open';
            }
            projectsTabs.push(<div key={project} className={selectedClass}
                                   onClick={this.handleTabClick.bind(this, index)}>{project}</div>);
            index++;
        });

        return <div className="tabs tabs--integrated tabs--bottom-line tabs--md">
                    {projectsTabs}
                </div>;
    }
}