"use strict";
/// <reference path="../../_all.d.ts" />
const express = require("express");
const index_1 = require('./index');
let _serversAPI = new index_1.ServersAPI();
class ServersRouter {
    constructor() {
        this.router = express.Router();
        this.router.get('/list', (req, res) => {
            res.send(_serversAPI.getServersList());
        });
    }
    getRouter() {
        return this.router;
    }
}
exports.ServersRouter = ServersRouter;
//# sourceMappingURL=router.js.map