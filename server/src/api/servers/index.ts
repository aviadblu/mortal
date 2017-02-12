/// <reference path="../../_all.d.ts" />
"use strict";

export class ServersAPI {
    serversList: Array<any> = [
        {
            name: 'mock server1'
        },
        {
            name: 'mock server2'
        }
    ];
    constructor() {
        console.log('hello from ServersAPI class');
    }

    getServersList() {
        return this.serversList;
    }

}

