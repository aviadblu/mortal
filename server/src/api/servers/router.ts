/// <reference path="../../_all.d.ts" />
import * as express from "express";
import {ServersAPI} from './index';

let _serversAPI = new ServersAPI();

export class ServersRouter {
    private router: any;
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