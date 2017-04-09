/// <reference path="../../_all.d.ts" />
import * as express from "express";
import * as request from "request";
import {ServersAPI} from './index';

let _serversAPI = new ServersAPI();

export class ServersRouter {
    private router: any;
    constructor() {
        this.router = express.Router();
        this.router.get('/projects-metadata', (req, res) => {
            res.send(_serversAPI.projectsMetadata);
        });

        this.router.get('/servers-status', (req, res) => {
            res.send(_serversAPI.serversStatus);
        });
    }

    getRouter() {
        return this.router;
    }
}