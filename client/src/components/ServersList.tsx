import * as React from "react";

export interface ServersListProps { title: string
}

export class ServersList extends React.Component<ServersListProps, undefined> {
    render() {
        return <div className="shadow--xs rows bg--content margin-b--lg">
            <div className="minor padding--md bg--primary">{this.props.title}</div>
            <div className="padding--xl">
                <table className="table table--tertiary">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Host</th>
                        <th>Data</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>;
    }
}