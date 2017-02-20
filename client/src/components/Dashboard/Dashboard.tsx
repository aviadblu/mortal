import * as React from "react";
import axios from 'axios';

interface IDashboardProps {
    appEvents: any
}

export class Dashboard extends React.Component<IDashboardProps, {dashboardGridItems: any, data: any}> {

    dashboardGridItems = [];
    dashboardGridItemsMap = {};

    constructor(props) {
        super(props);

        this.state = {
            dashboardGridItems: this.dashboardGridItems,
            data: {}
        };

        this.registerToEvents();

    }

    getServersStatusData() {
        let self = this;
        axios.get('/api/servers/projects-metadata')
            .then(productsData => {
                let data = {};
                Object.keys(productsData.data).forEach((productKey) => {
                    productsData.data[productKey].forEach((env) => {
                        console.log(env);
                        data[env.environmentName.split(' ').join('__')] = env.hosts;
                    });

                });
                this.setState({data: data});

                console.log(data);
            });
    }


    private registerToEvents() {
        let self = this;
        this.props.appEvents.on('add:to:dashboard', (envData) => {
            //console.log(envData);
            const key = envData.environmentName.split(' ').join('__');
            if (!self.dashboardGridItemsMap[key]) {
                self.dashboardGridItems.push(key);
                self.setState({
                    dashboardGridItems: self.dashboardGridItems
                });
                self.dashboardGridItemsMap[key] = 1;
            }
        });
    }

    componentDidMount() {
        this.getServersStatusData();
    }

    render() {
        let gridItems = [];
        this.dashboardGridItems.forEach((item) => {

            let itemDataRows = [];
            if (this.state.data[item]) {
                let index = 0;
                this.state.data[item].forEach((host) => {
                    index++;
                    itemDataRows.push(<tr key={host.name + index}>
                        <td>{index}</td>
                        <td>{host.name}</td>
                        <td>{host.InstalledOS}</td>
                        <td>{host.Description}</td>
                    </tr>);
                });
            }


            gridItems.push(<div key={item} className="grid__item col--sm--6 *col--md--4">
                <div className="bg--aside padding--md border">
                    {item}
                    <table className="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>OS</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {itemDataRows}
                        </tbody>
                    </table>
                </div>
            </div>)

        });


        return <div className="shadow--xs rows bg--content margin-t--lg">

            <div className="padding--xl grid">
                {gridItems}
            </div>
        </div>;
    }
}


