/// <reference path="../_all.d.ts" />
"use strict";
const express = require("express");
const path = require("path");
var Route;
(function (Route) {
    class Home {
        constructor(app) {
            this.router = express.Router();
            let clientPath = path.resolve(__dirname, '../../../client');
            console.log(clientPath);
            app.use(express.static(clientPath));
            this.router.get('/*', function (req, res) {
                res.sendFile(clientPath + '/index.html');
            });
        }
        getRouter() {
            return this.router;
        }
    }
    Route.Home = Home;
})(Route || (Route = {}));
module.exports = Route;
//# sourceMappingURL=index.js.map