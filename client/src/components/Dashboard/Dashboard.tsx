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

        // todo: 2) get item array from local storage, parse and init array with persistent values
        // let arra = localStorage.getItem(k);
        // let array = JSON.parse(arra);




        this.registerToEvents();
        this.arrangeMap();
    }


    getServersStatusData() {
        let self = this;
        axios.get('/api/servers/projects-metadata')
            .then(productsData => {
                let data = {};
                Object.keys(productsData.data).forEach((productKey) => {
                    productsData.data[productKey].forEach((env) => {
                        //console.log(env);
                        data[env.environmentName.split(' ').join('__')] = env.hosts;
                    });

                });
                this.setState({data: data});

                //console.log(data);
            });
    }

    private arrangeMap() {
        let self = this;
        self.dashboardGridItemsMap = {};
        self.dashboardGridItems.forEach((itemKey, index) => {
            //console.log(itemKey);
            self.dashboardGridItemsMap[itemKey] = index;
        });
        console.log(self.dashboardGridItems);
        console.log(JSON.stringify(self.dashboardGridItems));

        // todo: 1) push stringify array to local storage with some key
        // localStorage.setItem(k,v)



    }


    private registerToEvents() {
        let self = this;
        this.props.appEvents.on('add:to:dashboard', (envData) => {
            //console.log(envData);


            const key = envData.environmentName.split(' ').join('__');
            if (!self.dashboardGridItemsMap.hasOwnProperty(key)) {
                self.dashboardGridItems.push(key);
                self.setState({
                    dashboardGridItems: self.dashboardGridItems
                });
                //self.dashboardGridItemsMap[key] = self.dashboardGridItems.indexOf(key);
                self.arrangeMap();
            }
        });
    }

    componentDidMount() {
        this.getServersStatusData();
    }

    removeFromDashboard(item) {
        let self = this;
        //console.log(item);
        //console.log(self.dashboardGridItemsMap[item]);
        // console.log("BEFORE REMOVE:" + self.dashboardGridItems);
        // console.log(self.dashboardGridItemsMap);
        // //self.dashboardGridItemsMap[item]
        if (self.dashboardGridItems[self.dashboardGridItemsMap[item]]) {
            self.dashboardGridItems.splice(self.dashboardGridItemsMap[item], 1);
        }
        // console.log("ARRAY AFTER REMOVE:" + self.dashboardGridItems);
        // console.log(self.dashboardGridItemsMap);


        // console.log("MAP AFTER REMOVE:", self.dashboardGridItemsMap);
        // console.log(self.dashboardGridItems);
        this.setState({dashboardGridItems: self.dashboardGridItems});
        this.arrangeMap();

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
                    <div className="icon-plus-6 icon-size--24 hover--pointer"
                         onClick={this.removeFromDashboard.bind(this, item)}></div>
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


