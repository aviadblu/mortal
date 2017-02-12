/// <reference path="../_all.d.ts" />
"use strict";

import * as express from "express";
import * as path from "path";

module Route {

    export class Home {
        private router:any;

        constructor(app) {
            this.router = express.Router();

            let clientPath = path.resolve(__dirname, '../../public');
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
}

export = Route;