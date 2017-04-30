import * as React from "react";
import axios from 'axios';
import * as _ from 'lodash';

interface IDashboardProps {
    appEvents: any
}

export class Dashboard extends React.Component<IDashboardProps, {dashboardGridItems: any, data: any}> {

    dashboardGridItems = localStorage.getItem('grid-items') ? JSON.parse(localStorage.getItem('grid-items')) : [];
    dashboardGridItemsMap = {};

    constructor(props) {
        super(props);

        this.state = {
            dashboardGridItems: this.dashboardGridItems,
            data: {}
        };

        this.registerToEvents();
        this.arrangeMap();
    }


    getServersStatusMetaData() {
        let self = this;
        axios.get('/api/servers/projects-metadata')
            .then(productsData => {
                let data = {};
                Object.keys(productsData.data).forEach((productKey) => {
                    productsData.data[productKey].forEach((env) => {
                        console.log("getServersStatusMetaData()--- Object.keys(productsData.data)=" + Object.keys(productsData.data));
                        console.log("getServersStatusMetaData()--- env=" + env);
                        data[env.environmentName.split(' ').join('__')] = env.hosts;
                    });

                });
                console.log('getServersStatusMetaData: ' + data);
                self.setState({data: data});
                // to do start interval call to this function
                self.getServersStatusData();

                //console.log(data);
            });
    }

    getServersStatusData() {
        let self = this;
        axios.get('/api/servers/servers-status')
            .then(serversData => {
                let data = [{}];
                let xmlData = {};
                let xmlName;
                console.log(serversData);
                // console.log('getServersStatusData - res:');
                // console.log(serversData.data);
                // console.log('getServersStatusData - self.state.data:');
                // console.log(self.state.data);
                //console.log(Array.isArray(serversData.data));
                serversData.data.forEach((item) => {
                    //////console.log(serverKey.vmName,serverKey.xmlName);

                    let metaKey = _.find(Object.keys(self.state.data), (key) => {
                        return key === item.xmlName;
                    });
                    //let metaKey =Object.keys(self.state.data).find( key) => { return key === item.xmlName; });
                    // if(key === item.xmlName)
                    // {
                    //     console.log(key);
                    // }
                    console.log(metaKey)
                    if (metaKey) {
                        let hostIdx = _.findIndex(self.state.data[metaKey], (host) => {
                            return (host as any).name === item.vmName;
                        });
                        if (hostIdx > -1) {
                            self.state.data[metaKey][hostIdx].extraData = item;
                        }
                    }
                    // 1) todo: map host status data => this.state.data[job][hostIndex].status = "new data"
                    //this.state.data[job][hostIndex].status = "new data";
                    // set state
                    //////xmlName = serverKey.xmlName;
                    //////data[serverKey.vmName]=serverKey;
                    //this.state.data=data;
                    //////console.log(this.state.data);
                    // xmlData[xmlName][serverKey.vmName]=serverKey;


                });
                //console.log(data);
                this.setState({data: self.state.data});
            });


    }

    private arrangeMap() {
        let self = this;
        self.dashboardGridItemsMap = {};
        self.dashboardGridItems.forEach((itemKey, index) => {
            self.dashboardGridItemsMap[itemKey] = index;
        });
        localStorage.setItem('grid-items', JSON.stringify(self.dashboardGridItems))
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
        this.getServersStatusMetaData();
        //this.getServersStatusData()
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

    handleHostClick(job, hostIndex) {
        this.state.data[job][hostIndex].visible = !this.state.data[job][hostIndex].visible;
        this.setState({data: this.state.data});
    }

    render() {
        let gridItems = [];
        this.dashboardGridItems.forEach((item) => {

            let itemDataRows = [];
            if (this.state.data[item]) {
                let index = 0;
                this.state.data[item].forEach((host) => {
                    itemDataRows.push(<tr key={host.name + index}
                                          className="hostRow"
                                          title={host.name + index}
                                          onClick={this.handleHostClick.bind(this, item, index)}>
                        <td>{index}</td>
                        <td>{host.name}</td>
                        <td>{host.extraData ? host.extraData.productInstalled : 'N/A'}-{host.extraData ? host.extraData.BuildVersion : 'N/A'}</td>
                        <td>{host.InstalledOS}</td>
                        <td>{host.Description}</td>
                    </tr>);


                    let moreClass = 'hostRowMoreInfo bg--aside';
                    if (host.visible) {
                        moreClass += ' visible';
                    }

                    //console.log(host);
                    itemDataRows.push(<tr key={host.name + index + '_more'} className={moreClass}>
                        <td colSpan={1}>
                            Status:{host.extraData ? host.extraData.vmStatus : 'N/A'}
                        </td>
                        <td colSpan={1}>
                            IP:{host.extraData ? host.extraData.ipAddress : 'N/A'}
                        </td>
                        <td colSpan={1}>
                            Date:{host.extraData ? host.extraData.productLastUpdate : 'N/A'}
                        </td>
                        <td colSpan={1}>
                            LP:{host.extraData ? host.extraData.LanguagePackValue : 'N/A'}
                        </td>
                        <td colSpan={1}>
                            Connected:{host.extraData ? host.extraData.userConnected : 'N/A'}
                        </td>
                    </tr>);
                    index++;
                });
            }


            gridItems.push(
                <div key={item} className="grid__item col--sm--6 ">
                    <div className="shadow--xs bg--content">
                        <div className="title-bar title-bar--xl title-bar--primary">
                            <div className="title-bar__title">{item}</div>
                            <div className="title-bar__commands">
                                <div className="btn btn--integrated"
                                     onClick={this.removeFromDashboard.bind(this, item)}>Remove
                                </div>
                            </div>
                        </div>


                        <table className="table table--tertiary">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Machine Name</th>
                                <th>Product installed</th>
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


        return <div className="rows margin-t--lg">

            <div className="padding--xl grid grid--guttered--md">
                {gridItems}
            </div>
        </div>;
    }
}


