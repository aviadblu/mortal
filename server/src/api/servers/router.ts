/// <reference path="../../_all.d.ts" />
import * as express from "express";
import * as request from "request";
import {ServersAPI} from './index';

let _serversAPI = new ServersAPI();

export class ServersRouter {
    private router: any;
    constructor() {
        this.router = express.Router();
        this.router.get('/xml-list', (req, res) => {
            _serversAPI.getXMLList()
                .then((response) => {
                    res.send(response);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });

        });


        this.router.get('/hosts-list/:xml', (req, res) => {
            let xml_url = "https://csvn1-pro.il.hpecorp.net:19181/svn/tsg-bto-apps-lt-ops/trunk/app/BuildManager/ALMToolsGlobal/Reports/Config/DevOps_PC_LR_Nightly_Sanity_14_0.xml";
           _serversAPI.getHostsListFromXML(xml_url)
               .then((response) => {
                   res.send(response);
               })
               .catch((err) => {
                   res.status(500).send(err);
               });
        });
    }

    getRouter() {
        return this.router;
    }
}