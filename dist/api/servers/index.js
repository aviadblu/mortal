/// <reference path="../../_all.d.ts" />
"use strict";
class ServersAPI {
    constructor() {
        this.serversList = [
            {
                name: 'mock server1'
            },
            {
                name: 'mock server2'
            }
        ];
        console.log('hello from ServersAPI class');
    }
    getServersList() {
        return this.serversList;
    }
}
exports.ServersAPI = ServersAPI;
//# sourceMappingURL=index.js.map