/// <reference path="_all.d.ts" />
"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Router = require("./routes/index");
const router_1 = require("./api/servers/router");
// todo split for production
const dev_1 = require("./env/dev");
const production_1 = require("./env/production");
let envConf = dev_1.devConf;
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'dev') {
    envConf = production_1.prodConf;
}
/**
 * The server.
 *
 * @class Server
 */
class Server {
    static bootstrap() {
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
    config() {
        this.app.use(morgan(envConf.logger));
    }
    routes() {
        //get router
        let router;
        router = express.Router();
        this.app.use(bodyParser.urlencoded()); // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.json()); // parse application/json
        this.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
        //create routes
        this.app.use("/api/servers", new router_1.ServersRouter().getRouter());
        this.app.use("/", new Router.Home(this.app).getRouter());
        //use router middleware
        this.app.use(router);
    }
}
let server = Server.bootstrap();
server.app.listen(envConf.port, function () {
    console.log(`App listening on port ${envConf.port}`);
});
//# sourceMappingURL=app.js.map