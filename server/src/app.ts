/// <reference path="_all.d.ts" />
"use strict";

import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as path from "path";
import * as Router from "./routes/index";
import {ServersRouter} from './api/servers/router';
// todo split for production
import {devConf} from './env/dev';
import {prodConf} from './env/production';

let envConf = devConf;
if(process.env.NODE_ENV && process.env.NODE_ENV !== 'dev') {
    envConf = prodConf;
}
/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //configure routes
        this.routes();
    }

    private config() {
        this.app.use(morgan(envConf.logger));
    }

    private routes() {
        //get router
        let router: express.Router;
        router = express.Router();

        this.app.use(bodyParser.urlencoded()); 			// parse application/x-www-form-urlencoded
        this.app.use(bodyParser.json()); 									// parse application/json
        this.app.use(bodyParser.json({type: 'application/vnd.api+json'}));

        //create routes
        this.app.use("/api/servers", new ServersRouter().getRouter());
        this.app.use("/", new Router.Home(this.app).getRouter());

        //use router middleware
        this.app.use(router);
    }
}

let server = Server.bootstrap();
server.app.listen(envConf.port, function () {
    console.log(`App listening on port ${envConf.port}`)
});